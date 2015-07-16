// Begin SendGrid code
var sendgrid  = require('sendgrid')('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');


/*
// Sending a test email
var payload   = {
  to      : 'phantom4d@gmail.com',
  from    : 'whyhellothere@conversewithothers.co',
  subject : 'Testing',
  text    : 'This is my first email through SendGrid. It will not work.'
}

sendgrid.send(payload, function(err, json) {
  if (err) { console.error(err); }
  console.log(json);
});
*/

// Require Firebase
var Firebase  = require('firebase');
// Firebase references
var ref = new Firebase("https://goconverse.firebaseio.com");
var conversationsRef = new Firebase("https://goconverse.firebaseio.com/conversations/");
var usersRef = new Firebase("https://goconverse.firebaseio.com/users/");

// conversationsRef.on('child_added')
