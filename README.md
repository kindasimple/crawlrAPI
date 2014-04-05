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

### Endpoings

**/process/:start_bar**

Input the starting bar, and pass it to the R script.

```
exec("rscript worker.R \"Pickles\"", puts);
```

the R script takes the command line argument, and runs the search. The ouput is then written to a file.

```
args <- commandArgs(trailingOnly = TRUE)
start <- args[1];

# calculate results
# but I am going to fake it
result <- c('Zeno', 'Pickles', 'Levels');

write(result, "result.log")
```

**/result**

This enpoint reads the result of the search from a file on the disk, and serves it up as json.


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
