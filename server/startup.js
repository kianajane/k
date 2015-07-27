Meteor.startup(function(){

	if (Phonetics.find({}).count()==0) {
		Phonetics.insert({sound: "L", words: new Array ("leaf", "lamp", "laugh", "leg", "lunch", "lips", "late", "lucky", "lion", "lock", "dollar", "olive", "belly", "float", "jelly", "elbow", "shoelace", 
										"violin", "envelope", "toilet", "bell", "whale", "owl", "wall", "glass", "sleep", "slide", "please", "flower", "cloud"), 
												story: new Array ("April the elephant lives in Brazil.",
														"Her friends Lucy the Lizard and Lexie the Owl like to be lazy.",
														"They play on the log in the lake, take extra long lunches, and dig holes.",
														"One day, they met Albert the Whale near a pool of water by the ocean.",
														"Albert told them that it is okay to laugh, be silly, and lazy sometimes, but it was dangerous to do in the jungle.",
														"Albert told them 11 ways that would help them be safer.",
														"April, Lucy, and Lexie listened and learned how to be more safe.",
														"After Albert finished talking, the three friends yelled, \"Thank you,\" to him as he swam away.")}),
		Phonetics.insert({sound: "R", words: new Array( "run", "rice", "rat", "red", "rose", "raccoon", "rose", "rain", "reach", "race", "bird", "carrot", "heart", "cherry", "first", "alarm", "start", "crayon",
										"drawer", "marathon", "car", "bear", "dinosaur", "bread", "dragon", "prince", "orange", "tornado", "forest", "friend"), 
												story: new Array ("Whenever I have free time, I race to my garage.", "I have all kinds of crazy experiments going on in there.", "I don't mean testing rats or anything.",
														"I mean really cool experiments.",
														"For example, right now I am experimenting to see if carrots can recharge batteries.",
														"I have had other experiments that have gone longer.",
														"My experiment to see if raisins will make the speakers in my radio louder has been going on for over a year now.", 
														"There are so many more ideas that I want to experiment with - making a fireproof door, testing to see what rainbows are made of, trying to see if I can teach rats to read.", 
														"If my brain was made of trees, it would be a forest of ideas.", "Science is radical!")}),
		Phonetics.insert({sound: "F", words: new Array("face", "feet", "elephant", "laughing", "cough", "elf", "favorite", "family", "breakfast", "giraffe"), 
												story: new Array ("Phillip lived on a farm.", "He loved to fish on Friday.", 
														"That Friday after breakfast, Philip was walking through the forest to his favorite fishing hole when he heard a saxophone.",
														"Philip put his finger to his mouth fast and said, \"Shhhhh, you'll scare the fish away!\"",
														"\"Fish can hear a leaf fall off of a tree,\" he said.", 
														"The little girl playing the saxophone said, \"I'm Fay, and the fish like my music.\"", 
														"Philip looked into the water and saw five fish swimming.", 
														"He began to laugh and said, \"Will you meet me here every Friday?\"")}),
		Phonetics.insert({sound: "K", words: new Array("can", "coin", "cold", "key", "cold", "cool", "car", "cat", "kid", "color", "because", "soccer", "bike",  "bacon", "baker", 
									"looking", "pumpkin", "weekend", "chocolate", "jacket", "music", "awake", "cupcake", "duck", "cheek", "hawk", "lick", "kindergarten", "computer", "stomach"), 
												story: new Array ("Katie is careful with her candy.", "She loves it.", 
														"She doesn't like cookies, crackers, or cupcakes - just candy.", 
														"She likes her candy so much, she puts a lock on her candy box whenever she goes to sleep.", 
														"She wears the key around her neck.",
														"All of that changed after Katie got a sick stomach from eating too much candy.", 
														"Now she eats healthy food like carrots, corn, and turkey.", "She hopes she won't get sick like that again.")}),
		Phonetics.insert({sound: "B", words: new Array ("baby", "bakery", "banana", "becoming", "bedtime", "bedroom", "buddy", "bug", "bee", "bunny", "about", "alphabet", "blueberry", "cowboy", "ladybug", "neighbor", "October", 
									"rabbit", "marbles", "basketball", "crab", "web", "rub", "club", "bathtub", "cube", "prescribe", "subscribe", "doorknob", "wardrobe"), 
												story: new Array ("When it was bedtime I put my book back on the shelf.", "I went into the kitchen and made myself a banana and bologna sandwich for school.", 
														"Then I helped take the bib off of my baby sister.", "I would need my energy for the kickball game in the morning.",
														"I was about to fall asleep when I remembered that I still needed to rub my lucky rabbit foot.", "I laid in bed wishing that kickball could be my job.", 
														"\"Until somebody makes it popular, nobody will be able to make kickball their job,\" I thought.",
														"I was so busy thinking that I fell asleep.")}),
		Phonetics.insert({sound: "H", words: new Array ("hall","hand", "happy", "beehive", "playhouse", "horse", "house", "hair", "helicopter", "history", "hero", "honeybee", "helmet", "hippopotamus"), 
												story: new Array ("Homer was a happy hamster who lived in a heart shaped house.", "His owner, Hazel, was a redhead. Homer had the best cage.", 
														"It was almost the size of a doghouse.", "His favorite toy was his hamster wheel.",
														"It was behind his water dish.", "Homer always wore his hamster helmet when he ran on his hamster wheel.", 
														"After running he would eat a hot dog and honey.", "He was happy with his life and hoped it would never change.")}),
		Phonetics.insert({sound: "M", words: new Array ("man", "map", "march", "mall", "meet", "miss", "milk", "mine", "moose", "mom", "timer", "human", "numbers", "family", 
										"famous", "palm", "gum", "blossom", "time", "daydream", "extreme", "wisdom", "tomato", "maybe", "machine", "marshmallow", "magnificent", "macaroni", "memorization", "chameleon"), 
												story: new Array ("Mindy wanted to travel more.", "She watched a movie about someone who traveled the world and that is what she was going to do.",
														"She told her family and left home with her camera, comb, a map, and some other belongings.", 
														"There were so many things she wanted to do and see.",
														"She wanted to see a flamingo, a moose, masks from other countries, a camel, and a tomato the size of a watermelon.", 
														"She wanted to climb the highest mountain, swim in the ocean, and see the bathroom in a king's palace.", "She would have so many stories to tell.",
														"When she got to the bus station and was ready to buy a ticket, she realized...she didn't have any money.",
														 "\"They didn't show that in the movie,\" she thought as she walked home, \"I'm sure I can solve this problem.\"")})
		Phonetics.insert({sound: "Z", words: new Array ("zipper","zoo", "zero", "zebra", "zigzag", "zombie", "zillion", "zap", "present", "puzzle", "dessert", "busy", "lizard", "musical", "blizzard", "raisin", 
										"easily", "amaze", "horizon", "closet", "dozen", "cheese", "knees", "cookies", "fingers", "sunrise", "sneeze", "fingers", "bees", "bananas", "raspberry"), 
													story: new Array ("Zach went over to Zoe's house on Thursday.", "She was outside with the hose.", "Her house had tons of flowers around it.",
														 "There must have been a zillion.",
														"It was so beautiful that Zach thought she deserved a prize for the most beautiful flower garden ever!", "His favorite flowers were the zinnias.", 
														"Zoe asked him if we wanted to help water the flowers.", 
														"He took the hose and began watering.", "When he got over to the zinnias they were surrounded by bees.", 
														"Zach had zero love for bees, so he dropped the hose and ran as fast as he could.",
														"He zigged and zagged, but there was still one bee zooming after him.", 
														"Zach yelled, \"Please, please, please don't sting me!\"", " Just in time, Zoe zoomed in with her fly swatter and zapped that bee to the ground.",
														"Zoe shrugged her shoulders and said, \"You want to go in and have some cookies?\"", 
														"Zach nodded and said, \"Yes please!\"")})
	}


	return Meteor.methods({

		removeUserHistory: function() {
			return History.remove({userId: Meteor.userId()});
			}

	});

});
