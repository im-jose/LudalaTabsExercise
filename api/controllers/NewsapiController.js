/**
 * NewsapiController
 *
 * @description :: Server-side logic for managing newsapis
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  getTechNews: function (req, res) {

    var data = RssFeedParserService.parseFeed('http://news.yahoo.com/rss/tech', function(err, result){
      return res.json(result);
    });
    
  },


  getSportNews: function (req, res) {

    var data = RssFeedParserService.parseFeed('http://news.yahoo.com/rss/sports', function(err, result){
      return res.json(result);
    });

  },


  getEntertainmentNews: function (req, res) {

    var data = RssFeedParserService.parseFeed('http://news.yahoo.com/rss/entertainment', function(err, result){
      return res.json(result);
    });

  }
};

