crawlrAPI
=========

cloud data store for crawler application

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
