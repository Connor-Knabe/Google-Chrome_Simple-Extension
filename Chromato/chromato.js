var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var url = require('url');
var request = require('request');
var app = express.createServer();
app.use(bodyParser());
//app.use(bodyParser.urlencoded());
//app.use(bodyParser.json());

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
});

app.get('/', function(req, res){
    /*var html = '<form action="/" method="post">' +
               'Welcome to Chromato:' +
			   '<br>' +
               '<input type="text" name="movieTitle" placeholder="Movie Title" />' +
 			   '<br>' +
			   '<input type="text" name="apiKey" placeholder="Api Key" />' +
			   '<br>' +
			   '<input type="text" name="page_limit" placeholder="page limit" />'+
               '<br>' +
               '<button type="submit">Submit</button>' +
            '</form>';*/

    console.log("/");
    res.render('submit');
});

app.get('/submit', function(req, res){
    /*var html = '<form action="/" method="post">' +
               'Welcome to Chromato:' +
               '<br>' +
               '<input type="text" name="movieTitle" placeholder="Movie Title" />' +
                '<br>' +
               '<input type="text" name="apiKey" placeholder="Api Key" />' +
               '<br>' +
               '<input type="text" name="page_limit" placeholder="page limit" />'+
               '<br>' +
               '<button type="submit">Submit</button>' +
            '</form>';*/

    console.log("/submit");

    res.redirect('/login');
//    res.render('submit', {user: "Connor"});
});

app.get('/login', function(req, res){

    console.log("/login");

});


app.post('/', function(req, res){
    var movieTitle = req.body.movieTitle;
	var apiKey = req.body.apiKey;
    var pageLimit = req.body.page_limit;
 	options = {
		protocol: "http:",
		host: 'api.rottentomatoes.com',
		pathname: '/api/public/v1.0/movies.json',
		query: { apikey:apiKey, q:movieTitle, page_limit:pageLimit }
	}
	var rottenUrl = url.format(options);
	console.log(rottenUrl);
	request(rottenUrl).pipe(res);

	request(rottenUrl, function(error, response, body){
		if (!error && response.statusCode == 200) {
			console.log(body);
			var parsedData = JSON.parse(body);
			console.log(parsedData['movies'][0]['title']);
		}

	});

   // var html = 'Movie Title is: ' + movieTitle + '.<br>' +
    //         '<a href="/">Try again.</a>';
    //res.send(html);
});
app.listen(80);
