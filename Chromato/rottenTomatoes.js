// Usage:
//url:port/apikey/(insert key)/q/(insert movie)/page_limit/(insert page limit)
var express = require('express');
var http = require('http');
var app = express.createServer();
var url = require('url');
var request = require('request');
app.get('/apikey/:api/q/:query/page_limit/:limit', function(req, response){
	var api = req.params.api;
	var query = req.params.query;
	var limit = req.params.limit;

	options = {
		protocol: "http:",
		host: 'api.rottentomatoes.com',
		pathname: '/api/public/v1.0/movies.json',
		query: { apikey: api, q:query, page_limit:limit}
	}
	var rottenUrl = url.format(options);
	console.log(rottenUrl);
	request(rottenUrl).pipe(response);
});
app.listen(1337);
