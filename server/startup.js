Meteor.startup(function(){
	s = new Date();
	if (History.find({userId:"LMaK5xY7zSo7XMskE"}).count() == 0) {
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "L" , word: "ball", correct: true , time: new Date(s.getFullYear(), s.getMonth(), s.getDate() - 15)})
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "L" , word: "envelope", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 15) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "L" , word: "glove", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 14) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "L" , word: "belly", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 13) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "L" , word: "lamp", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 17) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "L" , word: "leaf", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 15) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "L" , word: "leaf", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 13) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "R" , word: "run", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 14) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "R" , word: "bird", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 13) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "R" , word: "rice", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 13) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "R" , word: "rice", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 12) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "M" , word: "march", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 15) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "M" , word: "mall", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 14) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "M" , word: "miss", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 13) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "M" , word: "milk", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 12) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "M" , word: "moose", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 12) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "M" , word: "timer", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 11) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "M" , word: "image", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 11) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "M" , word: "dream", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 11) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "M" , word: "mall", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 15) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "M" , word: "made", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 14) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "M" , word: "mouth", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 14) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "M" , word: "milk", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 13) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "M" , word: "milk", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 12) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "K" , word: "car", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 16) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "K" , word: "can", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 16) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "K" , word: "cold", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 16) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "K" , word: "cookies", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 14) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "K" , word: "cookies", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 14) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "K" , word: "coin", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 11) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "F" , word: "elephant", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 16) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "F" , word: "giraffe", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 16) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "F" , word: "cough", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 14) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "F" , word: "elf", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 14) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "F" , word: "feet", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 14) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "F" , word: "laughing", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 13) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "F" , word: "favorite", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 13) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "F" , word: "family", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 12) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "F" , word: "elephant", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 15) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "F" , word: "elephant", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 13) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "game" , sound: "F" , word: "giraffe", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 12) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "L" , word: "lunch", correct: true , time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 17) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "L" , word: "leg", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 17) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "L" , word: "violin", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 15) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "L" , word: "belly", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 12) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "L" , word: "lamp", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 18) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "L" , word: "leaf", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 14) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "L" , word: "leaf", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 11) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "R" , word: "rat", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 15) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "R" , word: "rose", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 12) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "R" , word: "rain", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 13) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "R" , word: "rain", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 11) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "mammal", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 15) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "memorization", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 17) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "magnificent", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 12) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "pulm", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 13) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "moose", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 12) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "man", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 11) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "march", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 10) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "mall", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 11) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "meet", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 11) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "milk", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 11) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "mine", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 10) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "timer", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 9) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "image", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 9) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "human", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 9) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "dream", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 9) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "palm", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 10) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "tomato", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 10) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "maybe", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 10) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "machine", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 10) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "marshmallow", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 10) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "macaroni", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 12) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "made", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 14) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "mouth", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 16) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "mammal", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 13) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "M" , word: "mammal", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 14) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "K" , word: "cool", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 18) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "K" , word: "kid", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 18) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "K" , word: "color", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 16) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "K" , word: "cookies", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 15) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "K" , word: "cookies", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 15) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "K" , word: "coin", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 11) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "F" , word: "face", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 16) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "F" , word: "giraffe", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 16) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "F" , word: "cough", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 13) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "F" , word: "elf", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 13) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "F" , word: "feet", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 14) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "F" , word: "laughing", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 11) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "F" , word: "favorite", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 11) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "F" , word: "feet", correct: true, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 10) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "F" , word: "elephant", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 15) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "F" , word: "elephant", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 12) })
		History.insert({userId:"LMaK5xY7zSo7XMskE", mode: "workshop" , sound: "F" , word: "giraffe", correct: false, time: new Date(s.getFullYear(), s.getMonth(),s.getDate() - 11) })
	}


	if (Phonetics.find({}).count()==0) {
		Phonetics.insert({
			sound: "L",
			words: new Array ("leaf", "lamp", "laugh", "leg", "lunch", "lips", "late", "lucky", "lion", "lock", "dollar", "olive",
							  "belly", "float", "jelly", "elbow", "shoelace","violin", "envelope", "toilet", "bell", "whale", "owl",
							  "wall", "glass", "sleep", "slide", "please", "flower", "cloud"), 
			story: new Array ("April the elephant lives in Brazil.",
							  "Her friends Lucy the Lizard and Lexie the Owl like to be lazy.",
							  "They play on the log in the lake, take extra long lunches, and dig holes.",
							  "One day, they met Albert the Whale near a pool of water by the ocean.",
							  "Albert told them that it is okay to laugh, be silly, and lazy sometimes, but it was dangerous to do in the jungle.",
							  "Albert told them 11 ways that would help them be safer.",
							  "April, Lucy, and Lexie listened and learned how to be more safe.",
							  "After Albert finished talking, the three friends yelled, \"Thank you,\" to him as he swam away.")}),
		Phonetics.insert({
			sound: "R",
			words: new Array("run", "rat", "red", "rose", "raccoon", "rose", "rain", "race", "fruit", "bird", "carrot", "bear",
							 "cherry", "ready", "store", "first", "every", "start", "crayon", "drawer", "friend", "dinosaur",
							 "morning", "journey", "discover", "return", "orange", "realize", "forest", "borrow"), 
			story: new Array ("Rosa likes to draw every day.",
							  "After her alarm goes off in the morning, she grabs her crayons and draws a picture.",
							  "She has a collection of fourteen crayons.",
							  "They are all stored in her drawer.",
							  "One day, she went on a journey to the forest with her friend Rachel.",
							  "She wanted to draw every animal she could see: raccoons, birds, bears, and rats.",
							  "As she was getting ready to leave, she discovered a pretty red bird and wanted to draw it.",
							  "She realized that she forgot her red crayon, so she borrowed one from Rachel.",
							  "She drew the bird before returning home.")}),
		Phonetics.insert({
			sound: "F",
			words: new Array("face", "phone", "food", "fish", "feet", "fingers", "elephant", "muffin", "laughing", "unfold", "traffic", "alphabet",
							  "waffle", "off", "cough", "elf", "favorite", "family", "breakfast", "giraffe"), 
			story: new Array ("Phillip lived on a farm.",
							  "He loved to fish on Friday.",
							  "That Friday after breakfast, Philip was walking through the forest to his favorite fishing hole when he heard a saxophone.",
							  "Philip put his finger to his mouth fast and said, \"Shhhhh, you'll scare the fish away!\"",
							  "\"Fish can hear a leaf fall off of a tree,\" he said.", 
							  "The little girl playing the saxophone said, \"I'm Fay, and the fish like my music.\"", 
							  "Philip looked into the water and saw five fish swimming.", 
							  "He began to laugh and said, \"Will you meet me here every Friday?\"")}),
		Phonetics.insert({
			sound: "K",
			words: new Array("can", "coin", "cold", "key", "cold", "cool", "car", "cat", "kid", "color", "because", "soccer", "bike",
							 "bacon", "baker", "looking", "pumpkin", "weekend", "chocolate", "jacket", "music", "awake", "cupcake",
							 "duck", "cheek", "hawk", "lick", "kindergarten", "computer", "stomach"), 
			story: new Array ("Katie is careful with her candy.",
							  "She loves it.", 
							  "She doesn't like cookies, crackers, or cupcakes - just candy.", 
							  "She likes her candy so much, she puts a lock on her candy box whenever she goes to sleep.", 
							  "She wears the key around her neck.",
							  "All of that changed after Katie got a sick stomach from eating too much candy.", 
							  "Now she eats healthy food like carrots, corn, and turkey.",
							  "She hopes she won't get sick like that again.")}),
		Phonetics.insert({
			sound: "B",
			words: new Array ("baby", "bakery", "banana", "becoming", "bedtime", "bedroom", "buddy", "bug", "bee", "bunny", "about",
							  "alphabet", "blueberry", "cowboy", "ladybug", "neighbor", "October", "rabbit", "marbles", "basketball",
							  "crab", "web", "rub", "club", "bathtub", "cube", "prescribe", "subscribe", "doorknob", "wardrobe"), 
			story: new Array ("When it was bedtime I put my book back on the shelf.",
							  "I went into the kitchen and made myself a banana and bologna sandwich for school.",
							  "Then I helped take the bib off of my baby sister.",
							  "I would need my energy for the kickball game in the morning.",
							  "I was about to fall asleep when I remembered that I still needed to rub my lucky rabbit foot.",
							  "I laid in bed wishing that kickball could be my job.", 
							  "\"Until somebody makes it popular, nobody will be able to make kickball their job,\" I thought.",
							  "I was so busy thinking that I fell asleep.")}),
		Phonetics.insert({
			sound: "H",
			words: new Array ("hall", "hand", "hero", "happy", "hoop", "helmet", "hair", "horse", "house", "beehive", "behind", "unhappy",
							  "playhouse", "lighthouse", "groundhog", "downhill", "helicopter", "history", "honeybee", "hippopotamus"), 
			story: new Array ("Homer was a happy hamster who lived in a heart shaped house.",
							  "His owner, Hazel, was a redhead. Homer had the best cage.", 
							  "It was almost the size of a doghouse.",
							  "His favorite toy was his hamster wheel.",
							  "It was behind his water dish.",
							  "Homer always wore his hamster helmet when he ran on his hamster wheel.", 
							  "After running he would eat a hot dog and honey.", 
							  "He was happy with his life and hoped it would never change.")}),
		Phonetics.insert({
			sound: "M",
			words: new Array ("man", "map", "march", "mall", "meet", "miss", "milk", "mine", "moose", "mom", "timer", "human", "numbers",
							  "family", "famous", "palm", "gum", "blossom", "time", "daydream", "extreme", "wisdom", "tomato", "maybe",
							  "machine", "marshmallow", "magnificent", "macaroni", "memorization", "chameleon"), 
			story: new Array ("Mindy wanted to travel more.",
							  "She watched a movie about someone who traveled the world and that is what she was going to do.",
							  "She told her family and left home with her camera, comb, a map, and some other belongings.", 
							  "There were so many things she wanted to do and see.",
							  "She wanted to see a flamingo, a moose, masks from other countries, a camel, and a tomato the size of a watermelon.", 
							  "She wanted to climb the highest mountain, swim in the ocean, and see the bathroom in a king's palace.", "She would have so many stories to tell.",
							  "When she got to the bus station and was ready to buy a ticket, she realized...she didn't have any money.",
							  "\"They didn't show that in the movie,\" she thought as she walked home, \"I'm sure I can solve this problem.\"")}),
		Phonetics.insert({
			sound: "Z",
			words: new Array ("zipper","zoo", "zero", "zebra", "zigzag", "zombie", "zillion", "zap", "present", "puzzle", "dessert",
							  "busy", "lizard", "musical", "blizzard", "raisin","easily", "amaze", "horizon", "closet", "dozen",
							  "cheese", "knees","cookies", "fingers", "sunrise", "sneeze", "visit", "bees", "bananas", "raspberry"), 
			story: new Array ("<INSERT Z STORY FROM FORM>")}),
		Phonetics.insert({
			sound: "S",
			words: new Array ("sit","soup","salt","seal","sick","sing","sun","save","seed","seat","baseball","dancer","gasoline",
							  "grasshopper","motorcycle","fossil","pencil","muscle","beside","racing","bus","face","ice","grass",
							  "horse","yes","address","office","purse","glass"),
			story: new Array ("")})
		Phonetics.insert({
			sound: "D",
			words: new Array ("day", "dad", "dive", "end", "duck", "dentist", "dinner", "birthday", "good", "hide", "head", "medicine",
							  "spider", "calendar",  "played", "wood", "ahead","salad", "outside", "daisy", "somebody", "video",
							   "lemonade", "doughnut","attitude", "medicine", "afraid", "expected", "decide", "decade"),
			story: new Array ("")})
	}


	return Meteor.methods({

		removeUserHistory: function() {
			return History.remove({userId: Meteor.userId()});
			}

	});

});
