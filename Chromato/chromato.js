var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var url = require('url');
var request = require('request');
var app = express();

app.use(bodyParser());
//app.use(bodyParser.urlencoded());
//app.use(bodyParser.json());

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
});

app.get('/', function(req, res){
    console.log("/");
    res.render('index',{submit: true});
});


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
	var rottenUrl = url.format(options);
	console.log(rottenUrl);
	//request(rottenUrl).pipe(res);

	request(rottenUrl, function(error, response, body){
		if (!error && response.statusCode == 200) {
			console.log(body);
			var parsedData = JSON.parse(body);
			console.log(parsedData['movies'][0]);
            res.render('movieResults',{movieTitle: parsedData['movies'][0]})
		}

	});

});
app.listen(80);
