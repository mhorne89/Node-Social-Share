// Node modules
var nodemailer = require('nodemailer');


module.exports = function(message, error) {
  var transporter = nodemailer.createTransport('smtps://' + process.env.EMAIL_ADDRESS + ':' + process.env.EMAIL_PASS + '@' + process.env.EMAIL_HOST);

  var emailTemplate = {
    from: 'Node Social Share',
    to: process.env.EMAIL_ADDRESS,
    subject: 'Error!!',
    text: message + ' ' + error,
    html: message + '<br><br>' + error
  };
  
  transporter.sendMail(emailTemplate, function(error, info){
    if(error){ return console.log(error); }
    console.log('Sent error mail');
  });
};