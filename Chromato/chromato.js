var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var url = require('url');
var request = require('request');
var app = express();
var apikey = require('./api.js');

//app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//using ejs templates
app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
});

app.get('/', function(req, res){
    res.render('index',{submit: true});
});


//When the user submits the form the first time they are taken to this new movieResults.ejs page
app.post('/submitMovie', function(req, res){
    var movieTitle = req.body.movieTitle;
	var apiKey = req.body.apiKey;
    var pageLimit = req.body.page_limit;
 	options = {
		protocol: "http:",
		host: 'api.rottentomatoes.com',
		pathname: '/api/public/v1.0/movies.json',
		query: { apikey:apiKey, q:movieTitle, page_limit:pageLimit }
	}
    //creates a url to be sent to rotten tomatoes API
	var rottenUrl = url.format(options);
	request(rottenUrl, function(error, response, body){
		if (!error && response.statusCode == 200) {
            //Sends the parsed data from rotten tomatoes to ejs template
			var parsedData = JSON.parse(body);
            res.render('movieResults',{movieTitle: parsedData['movies'][0]})
		}

	});

});
app.listen(1337);
