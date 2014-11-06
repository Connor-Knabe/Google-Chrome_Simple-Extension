var static = require('node-static');

var file = new(static.Server)();

var http = require('http');
var querystring = require('querystring');


var static = require('node-static');
var http = require('http');

var file = new(static.Server)();

function processPost(request, response, callback) {
    var queryData = "";
    if(typeof callback !== 'function') return null;

    if(request.method == 'POST') {
        request.on('data', function(data) {
            queryData += data;
            if(queryData.length > 1e6) {
                queryData = "";
                response.writeHead(413, {'Content-Type': 'text/plain'}).end();
                request.connection.destroy();
            }
        });

        request.on('end', function() {
            request.post = querystring.parse(queryData);
            callback();
        });

    } 
}



http.createServer(function (request, response) {
  file.serve(request, response);
	
	if(request.method == 'POST') {
        processPost(request, response, function() {
            console.log(request.post);
            // Use request.post here

        });
    } 


}).listen(8080);




