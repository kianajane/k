Meteor.startup(function(){
	if (Phonetics.find({}).count()==0) {
		Phonetics.insert({sound: "L", words: "", story: new Array ("I like cheese.","April the elephant lived in Brazil.",
														"Her friends Lucy the Lizard and Lexie the Owl liked to be lazy.",
														"They would play on the log in the lake, take extra long lunches, and dig holes.",
														"Then they met Albert the Whale, near a pool of water, by the ocean.",
														"Albert told them that it is okay to laugh, be silly, and lazy sometimes, but it was dangerous to do in the jungle.",
														"Albert told them eleven ways that would help them be safer. April, Lucy, and Lexie listened and learned how to be more safe.",
														"After Albert finished talking, the three friends yelled, \"Thank you,\" to him as he swam away.")}),
		Phonetics.insert({sound: "R", words: "", story: new Array ("Whenever I have free time, I race to my garage.", "I have all kinds of crazy experiments going on in there.", "I don't mean testing rats or anything.",
														"I mean really cool experiments.",
														"For example, right now I am experimenting to see if carrots can recharge batteries.",
														"I have had other experiments that have gone longer.",
														"My experiment to see if raisins will make the speakers in my radio louder has been going on for over a year now.", 
														"There are so many more ideas that I want to experiment with - making a fireproof door, testing to see what rainbows are made of, trying to see if I can teach rats to read.", 
														"If my brain was made of trees, it would be a forest of ideas. Science is radical!")}),
		Phonetics.insert({sound: "F", words: "", story: new Array ("Philip lived on a farm.", "He loved to fish on Friday.", 
														"That Friday after breakfast, Philip was walking through the forest to his favorite fishing hole when he heard a saxophone.",
														"Philip put his finger to his mouth fast and said, \"Shhhhh, you'll scare the fish away!\"",
														"\"Fish can hear a leaf fall off of a tree,\" he said.", 
														"The little girl playing the saxophone said, \"I'm Fay, and the fish like my music.\"", 
														"Philip looked into the water and saw five fish swimming.", 
														"He began to laugh and said, \"Will you meet me here every Friday?\"")})

	}
});
