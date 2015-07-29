Profiles = new Meteor.Collection('profiles');
Phonetics = new Meteor.Collection('phonetics');
History = new Meteor.Collection('history');

History.allow({  
	insert: function (userId, doc) {
		return userId;
	},
	update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return doc.userId === userId;
	},
	remove: function (userId, doc) {
    // can only remove your own documents
    return doc.userId === userId;
	}
});

History.deny({  
    update: function (userId, docs, fields, modifier) {
    // can't change owners
    return _.contains(fields, 'userId');
  }
});

Phonetics.deny({  
	update: function (userId, docs, fields, modifier) {
		return true;
	},
	insert: function (userId, docs, fields, modifier) {
		return true;
	},
	remove: function (userId, docs, fields, modifier) {
		return true;
	}

});