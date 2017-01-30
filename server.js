// Node modules
var express = require('express');
var cron = require('node-cron');
var feed = require("feed-read");

var app = express();

// Modules
var feeds = require("./modules/feeds");
var keywords = require("./modules/keywords");
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
    
    // Add hastags to title
    body.title = addHashes(body.title);
    
    console.log(body);
    
    postToFacebook.post(body);
    postToTwitter.post(body);
  });
};


// Function to generate random number
function getRandomNumber(max) {
  var rand = Math.random() * (feeds.length - 0);
  return Math.floor(rand);
}


// Function to add hashtags to list of keywords
function addHashes(title) {
  var wordArray = title.split(' ');
  
  for (i = 0; i < wordArray.length; ++i) {
    if (keywords.indexOf(wordArray[i].toLowerCase()) > -1) {
      wordArray[i] = '#' + wordArray[i];
    }
  }
  
  return wordArray.join(" ");
}


// Give response to incoming requests
app.get('/*', function(req,res){ res.status(200).send('Welcome to Socialis') });

app.listen(process.env.PORT || 5000);

