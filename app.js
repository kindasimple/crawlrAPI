
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var sys = require('sys')
var exec = require('child_process').exec;
var fs = require('fs');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var toJson = function (data) {
	return { 
		bars: data.split('\n') 
	};
}

//http://crawlr.ngrok.com/route/bar%20blue/result
app.get('/route/result/:bar', function(req, res){

	var bar = req.param("bar");

	fs.readFile('./public/' + bar + '.log', 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}

		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(data);
		res.end();
	});


});

// //http://crawlr.ngrok.com/route/bar%20blue
app.get('/route/:bar', function(req, res){

	var bar = req.param("bar");
	function puts(error, stdout, stderr) { sys.puts(stdout) }
	exec("rscript sample.R \"" + bar + "\"", puts);

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Processing')
    res.end();
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
