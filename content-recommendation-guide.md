---
layout: default
title: Content Recommendation Guide
---

# Content Recommendation 
This guide takes you through the detailed steps to set up Seldon to serve content recommendations. 

 * [Overview](#overview)
 * [Create client and meta-data schema](#client)
 * [Import historical data](#historical)
 * [Ingest activity via API](#api)
 * [Create a recommendation model](#model)
 * [Configure runtime recommendation scoring](#runtime)
 * [Server recommendations](#recommendations)
 * [Worked example](#example)
 * [Advanced settings](#advanced)

A worked step-by-step example using the [Movielens 100K](ml100k.html) dataset is provided.

# **Overview**<a name="overview"></a>
The process of creating and serving content recommendation models is summarized in the diagram below:

![Content Recommendation](/img/contentRecommendation.png)

Live activity is sent to Seldon via the [Seldon API](api.html). This will include user activity (e.g. which pages they viewed on a website) as well as item data (e.g. details about new articles published on a website with their metadata). Offline content recommendation models will be created. Presently Seldon provides several [Spark](http://spark.apache.org/)  based models as well as some examples in python using libraries such as [gensim](https://radimrehurek.com/gensim/)  and [scikit-learn](http://scikit-learn.org/stable/). For runtime content prediction we need a runtime scorer to take the models created and use them to provide recommendations in real time. Seldon provides several builtin runtime scorers for the various Spark based models. Optionally, a microservice can be deployed to do the runtime scoring. An example microservice deployment is shown [here](content-recommendation-example.html).


# **Create client and meta-data schema**<a name="client"></a>
To serve content recommendation you first need to create a client which will have an associated consumer key.

You can create this via with [```seldon-cli client```](seldon-cli#client).

Next you will need to define the item meta-data schema. Here is an example schema for an item representing a music album:

{% highlight javascript %}
	{
    "types": [{
            "type_id": 1,
            "type_name": "music",
            "type_attrs": [
                {"name":"title","value_type":"string"},
                {"name":"artist","value_type":"string"},
                {"name":"genre","value_type":["pop","rock","rap"]},
                {"name":"price","value_type":"double"},
                {"name":"is_compilation","value_type":"boolean"},
                {"name":"sales_count", "value_type":"int"}
                ]
            }
            ]
	}
{% endhighlight %}

Let's go though these fields one by one

 1. type_id: Distinguishes between different types of items for example movies and music. For now, Seldon only allows one item type so this must always be 1
 1. type_name: unique name for this type of item
 1. type_attrs: a list of attributes that can be associated with this item type
 1. type_attrs -> name: the name of the attribute in question
 1. type_attrs -> value_type: what type of data to expect for this attribute. Valid values are 'string', 'text', 'double', 'datetime', 'boolean', 'int' and a list. The list is a special case where the data can be one of a restricted list (an enum essentially)

One you have created the attributes JSON file you can associate it to your client using [```seldon-cli attr```](seldon-cli.html#attr).

# **Import historical Data**<a name="historical"></a>

If you have historical data you will to use with the built in Seldon Spark jobs then you need to convert it into JSON format with references to the internal IDs used by seldon for the users and items. This can be done using the Seldon CLI as described below..

## Add historical items

Items must be provided as a CSV and conform to the schema with 1 or two extra fields. An example for the schema above is

{% highlight bash %}
id,name,title,artist,genre,price,is_compilation,sales_count
1,"tune1","tune1","artist1","pop",0,1
2,"tune2","tune2","artist2","rock",1,20
3,"tune3","tune3","artist1","rock",1,30
{% endhighlight %}

Note that we have '**id**' and '**name**' that were not mentioned in the schema. 'id' is a required field for all items in all schemas. It can be any unique string and is your identifier for the item. 'name' is optional and should be a string that you might use to search for the item. A few other things to mention here are

 1. Boolean fields (is_compilation for example) can be 0 or 1, 0 meaning false and 1 meaning true.
 1. Enum fields (genre for example) must be one of the values you defined in the schema
 1. You must provide a header line
 1. There is an example in /your_data/items_data/example_items.csv

Load the CSV into Seldon using [```seldon-cli import```](/seldon-cli.html#import).

## Add historical users

Users are much easier as currently it is not presently possible to specify a schema. So we just need an **id** and optionally a username:

{% highlight bash %}
id,username
1,John
2,Jane
3,Sarah
4,Jim
{% endhighlight %}

Load the CSV into Seldon using [```seldon-cli import```](/seldon-cli.html#import).

## Add historical actions
If you have existing historical activity data you can import these "actions" into seldon if they can be provided as a CSV file.

Actions again have no schema to contend with but we need a few extra fields:

{% highlight bash %}
user_id,item_id,value,time
1,2,1,1422128735
2,2,1,1422752450
3,3,1,1422735290
4,1,1,1422792312
5,1,1,1422795111
5,3,1,1422754829
{% endhighlight %}

The first two columns should be obvious. 'value' is a field that represents the magnitude of the action. If all actions are created equal, then you should just set this to one. 'time' is the unixtimestamp of the action.

The actions are not added to the DB, but they require transformation so that the Spark jobs can consume them.

Use [```seldon-cli import```](/seldon-cli.html#import) to ingest the actions data.

# **Ingest activity via API**<a name="api"></a>

In production (or if you have no historical data) you would send new user activity and item meta data to Seldon via its [REST and JS API](api.html).

This activity (actions) data - is then transformed and re-located to a central location by Fluentd.  
The actions data can be for multiple clients if necessary.

The Seldon CLI tool can then be used to process this data to separate it for each client via a spark job, see example [```seldon-cli client --action processactions```](/seldon-cli.html#client).

# **Create a recommendation model**<a name="model"></a>
Recommendation models can be built using any available technology that can be Dockerized and run inside Kubernetes. However, we provide some pre-packaged Spark based models and associated runtime scorers for those models. We also provide a python library which allows you to build and create models and runtime scorers exposed as microservices.

We use [luigi](https://github.com/spotify/luigi) to package the offline model creation process. The luigi task can be run as a Kubernetes Job. In production you might run the modelling process each day to update your models with newly ingested data. We provide Make process to create Kubernetes Jobs in ```kubernetes/conf/models```. Call the Makefile with client and start day variables to create a Kubernetes job. Som examples are shown below.

You can create a matrix factorization Kubernetes job for client "test" starting at unix-day 16907 (17th April 2016) as follows:
{% highlight bash %}
cd kubernetes/conf/models
make matrix-factorization DAY=16907 CLIENT=test
{% endhighlight %}

This will create a Kubernetes Job file in the ```jobs``` folder called matrix-factorization-test-16907.json. Looking  inside this JSON you will find a definiton of an image which calls the luigi command to run the matrix factorization job:

{% highlight json %}
{

"name": "matrix-factorization",
"image": "seldonio/seldon-control:1.3_v4",
"command": ["luigi","--module","seldon.luigi.spark","SeldonMatrixFactorization","--local-schedule","--client","test","--startDay","16907"],

}
{% endhighlight %}

The luigi Task definition can be found in our [pyseldon](python-package.html) library in ```seldon.luigi.spark.SeldonMatrixFactorization```. In this case it simply calls the seldon-cli to run a matrix factorization job. Other cases might have more complex luigi jobs.

You can provide your own custom configuration either by changing the luigi.cfg or supplying further parameters to the call to luigi.

## Built-in Spark models
We provide several Spark based models. At present only a few are fully exposed via the Seldon CLI and luigi.

 * **Matrix Factorization** : An algorithm made popular due to its sucess in the Netflix competition. It tries to find a small set of latent user and item factors that explain the user-item interaction data. We use a wrapper around the [Apache Spark ALS](https://spark.apache.org/docs/latest/mllib-collaborative-filtering.html) implementation.  Note, however, for this release we only provide implicit matrix factorization.

You can create a matrix factorization Kubernetes job for client "test" starting at unix-day 16907 (17th April 2016) as follows:

{% highlight bash %}
cd kubernetes/conf/models
make matrix-factorization DAY=16907 CLIENT=test
{% endhighlight %}

 * **Item Similarity** : Item similarity models find correlations in the user-item interactions to find pairs of items that have consistently been viewed together. The underlying algorithm is the [DIMSUM algorithm in Apache Spark 1.2](https://blog.twitter.com/2014/all-pairs-similarity-via-dimsum).

You can create an item similarity modelling job for client "test" starting at unix-day 16907 (17th April 2016) as follows:

{% highlight bash %}
cd kubernetes/conf/models
make item-similarity DAY=16907 CLIENT=test
{% endhighlight %}


## Python based models

Models can also be built and packaged via our python library. At present we provide an wrapper for gensim document similarity models. An example using this is described [here](content-recommendation-example.html) which has an associated [Jupyter notebook](https://github.com/SeldonIO/seldon-server/blob/master/python/examples/doc_similarity_reuters.ipynb). The docsim class used is detailed [here](python/seldon.text.html#module-seldon.text.docsim).

# **Configure runtime recommendation scoring**<a name="runtime"></a>

Once a model is built the final step is to provide a runtime scorer for the model. You should choose an associated runtime scorer for your particular model as outlined, so for example if you built a Matrix Factorization model you should use an associated scorer, e.g. recentMfRecommender or mfRecommender. 

  * The runtime scoring configuration can be found [here](runtime-recommendation.html).
  * Runtime scoring can be set with [```seldon-cli rec_alg```](seldon-cli.html#rec_alg).

## Microservices

If your runtime scrorer will be exposed as an internal microservice you need to package it as a Docker container that exposes the [microservice recommendation API](api-microservices.html). Once done you can start it using the command line script [start-microservice](scripts.html/#start-microservice).

The script create a Kubernetes deployment for the microservice in ```kubernetes/conf/microservices```. If the microserice is already running Kubernetes will roll-down the previous version and roll-up the new version.


# **Serve recommendations**<a name="recommendations"></a>
Recommendations can be accessed via the [Seldon API](api.html). For initial testing you can use [```seldon-cli api```](seldon-cli.html#api)

# **Worked example**<a name="example"></a>

A worked step-by-step example using the [Movielens 100K](ml100k.html) dataset is provided.


# **Advanced Settings**<a name="advanced"></a>


##  Run A/B Tests
When running multiple recommendation models in production you will want to A/B new models to check they perform better than existing models with live clients before you place them fully into production for all users.

The ability to run A/B and multivariant tests is available within Seldon. You can find the details [here](advanced-recommender-config.html#multivariate-tests)

## Combine Multiple Algorithms

In some setting you may wish to combine multipe algorithms together to get a combined result. You can find the details [here](advanced-recommender-config.html#cascading-algorithms)

## API Controlled Variants

In some more complex content recommendation installation you may want to control for a particualar single client (single API key) various different algorithms for different settings, e.g. provide in-section Sport content recommendations and cross-site general content recommendations in different parts of a web page. The changes need to implement this are discussed [here](advanced-recommender-config.html#recommendation-variants)




