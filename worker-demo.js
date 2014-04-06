var sys = require('sys')
var exec = require('child_process').exec;


var http = require("http");
http.createServer(function (request, response) {
	function puts(error, stdout, stderr) { sys.puts(stdout) }
	exec("rscript sample.R \"Hi\"", puts);

        response.writeHead(200, {
	           'Content-Type': 'text/plain'
	        });
	      response.write('Processing')
        response.end();
}).listen(5002);
