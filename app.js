var http = require('http');
var usergrid = require('usergrid');
var client = new usergrid.client({
      orgName:'kindasimple',
        appName:'test',
        authType:usergrid.AUTH_CLIENT_ID,
        clientId:'YXA683_ECmEOEeO9RyltH18s1A',
        clientSecret:'YXA6S3noKEhvSK65VGNmeCWXFn6UmjQ',
        logging: false, //optional - turn on logging, off by default
        buildCurl: false //optional - turn on curl commands, off by default
});
console.log('node.js application starting...');

var svr = http.createServer(function(req, resp) {
	var options = {
	    type:'crawlers',
	}
	client.getEntity(options, function(err, crawler){
	    if (err){
	        //error - existing user not retrieved
	        console.log('error getting entity: ' + err)
	    } else {
	        //success - existing user was retrieved
			console.log('success executing query')
	        var email = crawler.get('email');
	        resp.end(email);
	    }
	});
      
});

svr.listen(9000, function() {
      console.log('Node HTTP server is listening');
});
