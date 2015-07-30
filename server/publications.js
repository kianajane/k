Meteor.publish("thePhonetics",function(){return Phonetics.find();}); // All of the phonetics data, including words and the story.
Meteor.publish("theHistory",function(){
    return History.find({userId: this.userId});
	this.ready();
}); // Only that user's history. // Adding only that user's history didn't work....??

Meteor.publish("theProfiles",function(){return Profiles.find();}); // Stores the data for each login.

Meteor.publish("userData", function () {
  if (this.userId) {
	  return Meteor.users.find({_id: this.userId}); //, //{_id: this.userId},
                             //{fields: {'profile': 1, 'things': 1}});
  } else {
    this.ready();
  }
});
