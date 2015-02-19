// RssFeedParserService.js - in api/services

var FeedParser = require('feedparser');
var http = require('http');

module.exports = {
	parseFeed: function(feedUrl, callback) {
		
		var news = [];
		http.get(feedUrl, function(res) {

			res.pipe(new FeedParser({}))
				.on('error', function(error){
					sails.log.error(error);
					var result = {
						'url': feedUrl,
						'data': null
					}
					callback(true, result);
				})
				.on('readable', function(){
					var stream = this, item;
					while(item = stream.read()){
						var newsline = {
							'title': item.title,
							'link': item.link
						};
						news.push(newsline);
					}
				})
				.on('end', function(){
					var result = {
						'url': feedUrl,
						'data': news
					}
					callback(null, result);
				});
		});
	}
};