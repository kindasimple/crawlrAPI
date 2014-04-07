crawlrAPI
=========
[![Build Status](https://travis-ci.org/kindasimple/crawlrAPI.svg?branch=master)](https://travis-ci.org/kindasimple/crawlrAPI)

API for crawlr application. Its primary functions are to

* Create web queries to generate crawlR routes, and 
* make generated routes available

### Dependencies

- [R](http://www.r-project.org/)
- [Node.js](http://nodejs.org/)

### Installation

1. Install R and Node.js using instructions on their project websites.

2. Make sure all dependent node packages are installed

```
# run in root directory
npm install
```

3. Create an .env file with the following content

```
PORT=5001
NGROK_TOKEN=hdqL9zl1QZrLl8c84HzX
```

4. Install R packages

```
#Packages installer
ipak <- function(pkg){
    new.pkg <- pkg[!(pkg %in% installed.packages()[, "Package"])]

    if (length(new.pkg)) 
        install.packages(new.pkg, dependencies = TRUE)
    sapply(pkg, require, character.only = TRUE)
}
 
# usage
packages <- c("calibrate")
ipak(packages)
```



Execute `foreman start` to start the worker website, and expose it using ngrok. 

```
$ foreman start
17:11:07 web.1  | started with pid 1945
17:11:07 web.1  | Express server listening on port 5001
17:11:07 web.1  | public url: https://crawlrapi.ngrok.com
```


### API Documentation

Documentation can be found on the site index page. [crawlrapi.ngrok.com](http://crawlrapi.ngrok.com)

**/route/:start_bar**

Input the starting bar, and pass it to the R script. It creates and returns a guid used to name the file.

```
exec("rscript scripts/branchandboundproto.R ./public/ " + uuid + " \"" + bar + "\"", puts);
```

the R script takes the command line argument runs the search. The ouput is then written to a file.


**/result/:guid**

This endpoint reads the result of the search from a file on the disk, and serves it up as json. The guid is returned from a request to the /route endpoint.

**Network Graph**

An image is generated as a png in the public folder, and can be accessed as http://crawlrAPI.ngrok.com/[guid].png 

![Network Graph](http://crawlr.ngrok.com/images/network-graph.png)
