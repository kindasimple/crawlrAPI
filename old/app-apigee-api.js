var http = require('http');
var usergrid = require('usergrid');

console.log('node.js application starting...');


var svr = http.createServer(function(req, resp) {

	var client = new usergrid.client({
      orgName:'kindasimple',
        appName:'crawlr',
        authType:usergrid.AUTH_CLIENT_ID,
        clientId:'YXA6HcF4ELx5EeOsOJX970-5zQ',
        clientSecret:'YXA6-Z3TRZKUcF7AJxAEtYGUryaX0e8',
        logging: true, //optional - turn on logging, off by default
        buildCurl: false //optional - turn on curl commands, off by default
	});

	var options = {
	    type:'crawler',
	}

	client.getEntity(options, function(err, crawler){
	    if (err){
	        //error - existing user not retrieved
	        console.log('error getting entity: ' + err)
	        resp.end('Error occurred')
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
