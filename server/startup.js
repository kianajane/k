Meteor.startup(function(){
	if (Words.find({}).count()==0){		// create some initial data for the collection...
		Words.insert({theWord:"the"});
		Words.insert({theColor:"dog"});
		Words.insert({theColor:"sat"});
		Words.insert({theColor:"on"});
		Words.insert({theColor:"the"});
		Words.insert({theColor:"cat"});
	}

});
