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

// Firebase references
var Firebase  = require('firebase');
var ref = new Firebase("https://goconverse.firebaseio.com");
var conversationsRef = new Firebase("https://goconverse.firebaseio.com/conversations/");
var usersRef = new Firebase("https://goconverse.firebaseio.com/users/");

conversationsRef.on('child_changed', function(snapshot, useless) {
  var snapshotVal = snapshot.val();
  var mostRecentVal = snapshotVal.mostRecent;
  var participantsVal = snapshotVal.participants;
  var participantOneId = participantsVal.userOne;
  var participantTwoId = participantsVal.userTwo;
  var userOneRef = new Firebase("https://goconverse.firebaseio.com/users/" + participantOneId);
  var userTwoRef = new Firebase("https://goconverse.firebaseio.com/users/" + participantTwoId);


  // Send email to user two
  userTwoRef.once('value', function(snapshot2, useless) {
    var userTwoSnapshotVal = snapshot2.val();
    var userTwoEmail = userTwoSnapshotVal.email;

    userOneRef.once('value', function(snapshot3, useless) {
      var userOneSnapshotVal = snapshot3.val();
      var userOneFirstName = userOneSnapshotVal.firstname;

      var emailSubject;
      var emailType;
      if (mostRecentVal.message == "You have not sent any messages yet.") {
        emailSubject = userOneFirstName + " has started a conversation with you!";
        emailType = "newConvo";
      } else {
        emailSubject = userOneFirstName + " has sent you a new message!";
        emailType = "newMessage";
      }

      // Send email
      var payload   = {
        to      : userTwoEmail,
        from    : 'donotreply@conversewithothers.co',
        subject : emailSubject,
        text    : "Find it here: http://conversewithothers.co/messaging.html?conversationId=" + snapshotVal.conversationId
      }

      if (userTwoSnapshotVal.isOnline != 1 || emailType == "newConvo") {
        sendgrid.send(payload, function(err, json) {
          if (err) { console.error(err); }
          console.log(json);
        });
      } else {
        console.log("Will not send an email notification.");
      }
    });
  });
});
