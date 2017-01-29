// Node modules
var FB = require('fb');
var fb = new FB.Facebook();

// Modules
var mailError = require('./emailAlerts');

// Config
require('dotenv').config();

// Facebook access token
FB.setAccessToken(process.env.FACEBOOK_ACCESS_TOKEN);


exports.post = function(body) {
  FB.api(process.env.FACEBOOK_ID + '/feed', 'post', { message: body.title, link: body.link }, function (res) {
    if(!res || res.error) {
      console.log(!res ? 'error occurred' : res.error);
      mailError('Error posting to Facebook', res.error);
      return;
    }
    console.log('Facebook: ', res);
  });
};