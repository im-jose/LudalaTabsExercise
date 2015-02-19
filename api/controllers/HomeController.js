/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
  index: function (req, res) {
    
    var data = RssFeedParserService.parseFeed('http://news.yahoo.com/rss/sports', function(err, result){
    	if(!err){
		    res.view({
		    	news: result.data
	        });
    	}
    	else{
    		res.view({
		    	news: []
	        });
    	}
    });
  }
};

