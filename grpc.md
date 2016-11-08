---
layout: default
title: gRPC
---

# RPC based services
Seldon provides an RPC (Remote Procedure Call) interface using [gRPC](http://www.grpc.io/) with [protocol buffers](https://developers.google.com/protocol-buffers/). The following docs require a knowkedge of gRPC. 

# Seldon gRPC
The proto file for the Seldon gRPC services is shown below. It contains a single service Classifier for classification prediction calls that takes a Classificationrequest and returns a Classification Reply.

A *ClassificationRequest* has two parts
  
 * *meta* : metadata associated with the request, presently an optional prediction-id the client wishes to associate with the request.
 * *data* : A custom entry to hold the features needs for the prediction request defined by the user. 

A *ClassificationReply* has three parts

 * *meta* : metadata associated with the prediction
   * *puid* : prediction unique id either supplied by client in request or created by Seldon
   * *modelName* : the name of the model that satisfied the request
   * *variation* : the AB test variation used in satisfying the request (will be "default" if a single variation).
 * *predictions* : the predictions for each class
 * *custom* : optional custom additonal data that is defined the user

{% highlight proto %}
syntax = "proto3";

import "google/protobuf/any.proto";

option java_multiple_files = true;
option java_package = "io.seldon.api.rpc";
option java_outer_classname = "PredictionAPI";

package io.seldon.api.rpc;

service Classifier {
  rpc Predict (ClassificationRequest) returns (ClassificationReply) {}
}

//Classification Request

message ClassificationRequest {
 ClassificationRequestMeta meta = 1;
 google.protobuf.Any data = 2;
}

message ClassificationRequestMeta {
  string puid = 1;
}

// Classification Reply

message ClassificationReply {
 ClassificationReplyMeta meta = 1;
 repeated ClassificationResult predictions = 2;
 google.protobuf.Any custom = 3;
}

message ClassificationReplyMeta {
  string puid = 1;
  string modelName = 2;
  string variation = 3;
}

message ClassificationResult {
  double prediction  = 1;
  string predictedClass = 2;
  double confidence = 3;
}
{% endhighlight %}


# Deploying a gRPC Prediction Service 
The stages to deploy a gRPC service are shown below.

 1. Create custom proto buffer file
 1. Build model and package microservice using gRPC
 1. Inform Seldon of Java custom protocol buffers
 1. Launch gRPC microservice
 1. Test via REST or gRPC clients

We will work through these stages using the simple [Iris prediction dataset](http://archive.ics.uci.edu/ml/datasets/Iris) as an example. The code can be found at [docker/examples/iris/xgboost_rpc](https://github.com/SeldonIO/seldon-server/tree/master/docker/examples/iris/xgboost_rpc).

## Create Custom Proto Buffer
To hold the features required for a prediction request we will create the following proto buffer file:
{% highlight proto %}
syntax = "proto3";

option java_multiple_files = true;
option java_package = "io.seldon.microservice.iris";
option java_outer_classname = "IrisClassifier";

package io.seldon.microservice.iris;

message IrisPredictRequest {
  float f1 = 1;
  float f2 = 2;
  float f3 = 3;
  float f4 = 4;
}
{% endhighlight %}

## Build model and package as microservice
To build the model we will use XGBoost and its wrapper provided in the pyseldon python library. The model is the same as shown in the [Iris demo](prediction-example.html) so won't be discussed further here. We create python implementations of our protocol buffer and create a microservice wrapper to our built python pipeline model using the Microservice package as shown below. For this we need to create a custom data handler which will be call to extract a Pandas Dataframe from the RPC call data. The data will contain out custom IrisPredictRequest class which we need to unpack and translate into a Dataframe. The created Dataframe must match what is expected as input to your pipeline model.

{% highlight python %}
from concurrent import futures
import time
import sys, getopt, argparse
import seldon.pipeline.util as sutl
import random
import iris_pb2
import grpc
import google.protobuf
from google.protobuf import any_pb2
import pandas as pd 
from seldon.microservice.rpc import CustomDataHandler
from seldon.microservice import Microservices

class BadDataError(Exception):
    def __init__(self, value):
        self.value = value
    def __str__(self):
        return repr(self.value)

class IrisCustomDataHandler(CustomDataHandler):

    def getData(self, request):
        anyMsg = request.data
        dc = iris_pb2.IrisPredictRequest()
        success = anyMsg.Unpack(dc)
        if success:
            df = pd.DataFrame([{"f1":dc.f1,"f2":dc.f2,"f3":dc.f3,"f4":dc.f4}])
            return df
        else:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details('Invalid data')
            raise BadDataError('Invalid data')


if __name__ == "__main__":
    import logging
    logger = logging.getLogger()
    logging.basicConfig(format='%(asctime)s : %(levelname)s : %(name)s : %(message)s', level=logging.DEBUG)
    logger.setLevel(logging.INFO)


    parser = argparse.ArgumentParser(prog='microservice')
    parser.add_argument('--model-name', help='name of model', required=True)
    parser.add_argument('--pipeline', help='location of prediction pipeline', required=True)
    parser.add_argument('--aws-key', help='aws key', required=False)
    parser.add_argument('--aws-secret', help='aws secret', required=False)

    args = parser.parse_args()
    opts = vars(args)

    m = Microservices(aws_key=args.aws_key,aws_secret=args.aws_secret)
    cd = IrisCustomDataHandler()
    m.create_prediction_rpc_microservice(args.pipeline,args.model_name,cd)
{% endhighlight %}

The above model and resulting microservice has been packaged as a Docker container seldonio/iris_xgboost_rpc.

## Inform Seldon of Java custom protocol buffers
The front end server for Seldon is a Java server. In order to process the gRPC calls for a client prediction endpoint correctly it needs to know the custom request and optional reply proto buffer implementations. To do this you need to do two things:
 
 1. Create Java versions of your proto buffers
 1. Tell Seldon of a jar file containing the Java classes and the names of those classes

For the first step you can follow the protocol buffer docs and package the result. However, we also provide a simple script to do this for you [create-proto-jar](scripts.html#create-proto-jar)

Assuming you have placed the iris.proto above on the Seldon shared volume at /seldon-data/rpc/proto/iris.proto and want to output the jar at /seldon-data/rpc/jar/iris.jar you can run:

{% highlight bash %}
create-proto-jar /seldon-data/rpc/proto/iris.proto /seldon-data/rpc/jar/iris.jar
{% endhighlight %}

The second step to inform Seldon of this can be carried out via the seldon-cli with the following command where we pass the jar location and the class name.

{% highlight bash %}
seldon-cli rpc --action set --client-name test --jar /seldon-data/rpc/jar/iris.jar --request-class io.seldon.microservice.iris.IrisPredictRequest
{% endhighlight %}


## Launch gRPC microservice
We can now launch our microservice using the script [start-microservice](scripts.html#start-microservice)
{% highlight bash %}
start-microservice --type prediction --client test -i xgboostrpc seldonio/iris_xgboost_rpc:2.1 rpc 1.0
{% endhighlight %}

This will deploy our RPC microservice and inform Seldon of where it is running so requests can be sent to it.

## Test via REST or gRPC clients
We can test our microservice via either the REST or gRPC endpoints of Seldon. 

### Test via JS REST API
To test the REST endpoint we can use the seldon-cli

{% highlight bash %}
seldon-cli --quiet api --client-name test --endpoint /js/predict --json '{"data":{"f1":1,"f2":2.7,"f3":5.3,"f4":1.9}}'
{% endhighlight %}

This should produce a result like:

{% highlight json %}
{
  "meta": {
    "puid": "f91b158ba046d438cfea82aff4c382f996f5bf51",
    "modelName": "model_xgb",
    "variation": "xgboostrpc"
  },
  "predictions": [
    {
      "prediction": 0.0025230366736650467,
      "predictedClass": "Iris-setosa",
      "confidence": 0.0025230366736650467
    },
    {
      "prediction": 0.0035000948701053858,
      "predictedClass": "Iris-versicolor",
      "confidence": 0.0035000948701053858
    },
    {
      "prediction": 0.9939768314361572,
      "predictedClass": "Iris-virginica",
      "confidence": 0.9939768314361572
    }
  ],
  "custom": null
}
{% endhighlight %}

### Test via gRPC client

To test the external gRPC endpoint we will need to create a gRPC client. To authenticate we will need to get an Oauth token using the Seldon REST endpoint. It needs to be passed in the header of the gRPC call with key "oauth_token".

There is an example client for the Iris prediction in [docker/examples/iris/xgboost_rpc/python/iris_rpc_client.py](https://github.com/SeldonIO/seldon-server/tree/master/docker/examples/iris/xgboost_rpc/python/iris_rpc_client.py).

The script:

  1. Gets an Oauth token
  2. Calls the grpc endpoint

It uses compiled python versions of the custom proto buffer and seldon gRPC files located in the same folder.

You will need the seldon host and ports for the http and grpc endpoints and the key and secret for your client.
To get the key and secret for client "test" run:

{% highlight bash %}
seldon-cli keys --action list --client-name test
{% endhighlight %}

An example call for this client might be:

{% highlight bash %}
python iris_rpc_client.py --host localhost --http-port 30015 --rpc-port 30017 --key B3ZH3AFANDMX65VX6YPS --secret LGD1K4D7TN07H0OLQT4B --features-json '{"f1":1,"f2":2.7,"f3":5.3,"f4":1.9}'
{% endhighlight %}

which should produce a similar result to the REST call above.

{% highlight bash %}
meta {
  modelName: "model_xgb"
  variation: "xgboostrpc"
}
predictions {
  prediction: 0.00252303667367
  predictedClass: "Iris-setosa"
  confidence: 0.00252303667367
}
predictions {
  prediction: 0.00350009487011
  predictedClass: "Iris-versicolor"
  confidence: 0.00350009487011
}
predictions {
  prediction: 0.993976831436
  predictedClass: "Iris-virginica"
  confidence: 0.993976831436
}
custom {
}
{% endhighlight %}





 