Meteor.publish("theWords",function(){return Words.find();});
Meteor.publish("theProfiles",function(){return Profiles.find();});
Meteor.publish("thePhonetics",function(){return Phonetics.find();});


// Do we use this collection?
Meteor.publish("userData", function () {
  if (this.userId) {
	  return Meteor.users.find({}); //, //{_id: this.userId},
                             //{fields: {'profile': 1, 'things': 1}});
  } else {
    this.ready();
  }
});
