Meteor.startup(function(){
	if (Words.find({}).count()==0){		// create some initial data for the collection...
		Words.insert({theWord:"the"});
		Words.insert({theWord:"dog"});
		Words.insert({theWord:"sat"});
		Words.insert({theWord:"on"});
		Words.insert({theWord:"the"});
		Words.insert({theWord:"cat"});
	}
});
