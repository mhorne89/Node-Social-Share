// Node modules
var cron = require('node-cron');
var feed = require("feed-read");


// Modules
var feeds = require("./modules/feeds");
var postToFacebook = require("./modules/postToFacebook");
var postToTwitter = require("./modules/postToTwitter");


// Cron job
cron.schedule('* * * * *', function(){
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
