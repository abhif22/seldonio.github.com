---
layout: default
title: Seldon Server Setup
---
##### Content Recommendation Steps

[concepts](/concepts.html) --> **setup server** --> [logging](/seldon-logging.html) --> [configure data](/item-recommendation-data.html) --> [realtime activity](/realtime-activity-data.html) --> [offline model](/offline-models.html) --> [runtime configuration](/runtime-recommendation.html) --> [microservices](pluggable-recommendation-algorithms.html) --> [recommendations](api.html)

##### General Prediction Steps 

 **setup server** --> [events](prediction-api.html) --> [feature extraction pipeline](feature-pipeline.html) --> [runtime scorer](/runtime-prediction.html) --> [microservice scorer](/pluggable-prediction-algorithms.html) --> [predictions](prediction-api.html)


# Deploy Seldon Server<a name="deploy-server"></a>

## Prerequisites

To run the Seldon Server, we need a number of things present on the machine it is running on.

* Java (v >= 7)
* Tomcat (v >= 7)
* Maven (v >=3)
* [td-agent](http://www.fluentd.org/download) (latest)

There also needs to be a ZooKeeper server running along with Memcached and a MySQL server. It's up to you where you place these, but they should be accessible from the server on which you are running Seldon Server.

## The main project

Clone the project [seldon-server](https://github.com/SeldonIO/seldon-server).

## Configure

The repository for Seldon Server settings is ZooKeeper. The [Seldon Shell](/seldon-shell.html) can be used to set/update these settings.
Use the "Seldon Shell" tool to create settings for memcached and manage the datasources in MySQL. Also create a client to use one of these datasources.
The settings stored in zookeeper can also be viewed/modified directly. For the full set of available configuration options see [here](configuration.html).

## Run

Change directory to `seldon-server/server`.
Run `mvn clean package`.
This will create a war file in the target directory. You can now deploy this to an application server. At startup the seldon-server searches for the enviroment variable `SELDON_ZKSERVERS` to find the location of zookeeper. For Apache Tomcat you an achieve this by placing a file `setenv.sh` in the `/bin` folder of tomcat containing:

```
export SELDON_ZKSERVERS=<zookeeper hosts>
```

for example:

```
export SELDON_ZKSERVERS=localhost
```

You should now have a running Seldon Server instance!





