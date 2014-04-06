
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
var util = require('util')
var app = express();

// all environments
app.set('port', process.env.PORT || 5002);
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

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
         s4() + '-' + s4() + s4() + s4();
}

//http://crawlr.ngrok.com/route/bar%20blue/result
app.get('/result/:guid', function(req, res){

	var id = req.param("guid");
	var filePath = './public/' + id + '.log';
	fs.exists(filePath, function(exists) {

	  if (exists) {
		fs.readFile(filePath, 'utf8', function (err,data) {
			if (err) {
			  res.status(500).send('Server Error. Unable to read result.')
			  return console.log(err);
		    }

		      res.writeHead(200, {'Content-Type': 'application/json'});
		      res.write(data);
		      res.end();
	      });
	  } else { //file doesn't exist
	    res.status(404).send('Result not found. Your request is still processing.');
	  }
	}); //fs.exists
});

// //http://crawlr.ngrok.com/route/bar%20blue
app.get('/route/:bar', function(req, res){

	var bar = req.param("bar");

	var uuid = guid();
	function puts(error, stdout, stderr) { sys.puts(stdout) }
	exec("rscript branchandboundproto.R \"" + bar + "\" " + uuid, puts);

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(uuid)
    res.end();
});

app.post('/route/:bar', function(req, res){
	var survey = {};
	survey.cost = parseInt(req.body.cost);
	survey.alcohol = parseInt(req.body.alcohol);
	survey.distance = parseInt(req.body.distance);

	console.log(survey);

	var bar = req.param("bar");
	var uuid = guid();

	var command = util.format("rscript branchandboundproto.R \"{0}\" \"{1}\" \"{2}\" \"{3}\" \"{4}\"", bar, survey.cost, survey.alcohol, survey.distance, uuid)


	function puts(error, stdout, stderr) { sys.puts(stdout) }
	exec(command, puts);

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(uuid)
    res.end();
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
