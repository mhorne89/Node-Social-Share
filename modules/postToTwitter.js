// Node modules
var Twitter = require('twitter');


// Config
require('dotenv').config();


exports.post = function(body) {
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET
  });

  client.post('statuses/update', { status: body.title + ': ' + body.link },  function(error, tweet, response) {
    if(error) { console.log(error); }
    console.log('Twitter: ', response.statusMessage);
  });
};