crawlrAPI
=========

cloud data store for crawler application

##Node Worker Role

We can create a website with a few endpoints that initiates our processing and retrieves the result. The R script and data sources (.csv) will live in the web root.

### Usage

Have the following installed

- R
- ngrok (for your OS)
- Node


run `npm install` to update all node dependencies. Then get all R dependencies with

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



Execute `./run.sh` to start the worker website, and expose it using ngrok. 

```
ngrok                                                       (Ctrl+C to quit)
                                                                            
Tunnel Status                 online                                        
Version                       1.6/1.5                                       
Forwarding                    http://ee37673.ngrok.com -> 127.0.0.1:5002    
Forwarding                    https://ee37673.ngrok.com -> 127.0.0.1:5002   
Web Interface                 127.0.0.1:4040                                
# Conn                        0                                             
Avg Conn Time                 0.00ms
```
The run script does two things. It runs a local website that serves the Solver API at localhost:5002 

```
node worker.js &
```
and it exposes this server to the internet via ngrok at http://crawlrAPI.ngrok.com

```
./ngrok -subdomain=crawlrAPI -authtoken hdqL9zl1QZrLl8c84HzX 5002
```

### Endpoings

**/route/:start_bar**

Input the starting bar, and pass it to the R script. It creates and returns a guid used to name the file.

```
exec("rscript worker.R \"Pickles\"" + id, puts);
```

the R script takes the command line argument, runs the search, and creates . The ouput is then written to a file.

```
args <- commandArgs(trailingOnly = TRUE)
start <- args[1];

# calculate results
# but I am going to fake it
result <- c('Zeno', 'Pickles', 'Levels');

write(result, "result.log")
```

**/result/:guid**

This endpoint reads the result of the search from a file on the disk, and serves it up as json. The guid is returned from a request to the /route endpoint.

**Network Graph**

An image is generated as a png in the public folder, and can be accessed as `http://crawlrAPI.ngrok.com/<< guid >>.png (e.g. http://crawlr.ngrok.com/8cb387f6-2fec-92f8-172e-ef1e20fb4cf0.png)

##UserGrid BaaS

UserGrid is an open source web API builder that sits on top of mongodb and serves JSON. You can perform basic CRUD operations. Apigee hosts UserGrid for free. There is a library for interfacing with the data store that we can use in our projects.

### API

https://api.usergrid.com/kindasimple/test/  
https://api.usergrid.com/kindasimple/test/crawlers  
https://api.usergrid.com/kindasimple/test/surveys  


### Authentication
For now, I will put the keys here. But, they should be shared privately.

orgName:'kindasimple',  
appName:'test',  
clientId:'YXA683_ECmEOEeO9RyltH18s1A',  
clientSecret:'YXA6S3noKEhvSK65VGNmeCWXFn6UmjQ'

### Node Website

I am creating a demo site in Node.js that can be used as an alternative UI to the Android app.  It currently only attempts to connect and retrieve a users email as a POC.

**Instructions**

Install node, and serve the website. 

```
node app.js
```

go to http://localhost:9000 in the browser, and see that it doesn't work.
