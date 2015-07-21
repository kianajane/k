Meteor.publish("thePhonetics",function(){return Phonetics.find();}); // All of the phonetics data, including words and the story.
Meteor.publish("theHistory",function(){return History.find();}); // All of the history, used in profiles. Really should only publish that user's history
Meteor.publish("theProfiles",function(){return Profiles.find();});
//Meteor.publish("theWords",function(){return Words.find();}); // I think this was the old words collection. Delete after July 20th if still unused.

// What is this collection?
Meteor.publish("userData", function () {
  if (this.userId) {
	  return Meteor.users.find({}); //, //{_id: this.userId},
                             //{fields: {'profile': 1, 'things': 1}});
  } else {
    this.ready();
  }
});
