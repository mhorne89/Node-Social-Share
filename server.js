// Node modules
var express = require('express');
var cron = require('node-cron');
var feed = require("feed-read");

var app = express();

// Modules
var feeds = require("./modules/feeds");
var postToFacebook = require("./modules/postToFacebook");
var postToTwitter = require("./modules/postToTwitter");


// Cron job
cron.schedule('0 */2 * * *', function(){
  readFeed();
});


// Function to read feed
function readFeed() {  
  var randFeed = getRandomNumber(feeds.length);

  feed(feeds[randFeed], function(err, articles) {
    if (err) { console.log(err); }
    
    var randArticle = getRandomNumber(articles.length);
    
    var body = {
      'title': articles[randArticle].title,
      'link': articles[randArticle].link
    }
    
    console.log(body);
    
    postToFacebook.post(body);
    postToTwitter.post(body);
  });
};

function getRandomNumber(max) {
  var rand = Math.random() * (feeds.length - 0);
  return Math.floor(rand);
}

app.listen(process.env.PORT || 5000);
