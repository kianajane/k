/*
This code comes from this blog post by Amit Agarwal
http://ctrlq.org/code/19680-html5-web-speech-api
  
Random math function taken from the Mozilla Developer Network
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/

// Chooses an intial sound
Template.workshop.rendered = function() {
	if (recognizing) recognition.stop();
	// Reset
	wordCounter=0;
	correctCounter=0;
	completedWords='';
	// Show a word
	if (lastSound!=Session.get("sound")) resetIndex = true;
	wordList = Phonetics.findOne({sound: Session.get("sound")}).words;
	console.log("current sound = '"+Session.get("sound")+"'");
	theWord = getWord();
	Session.set("workshopWord",theWord);
	$("#word").html(Session.get("workshopWord"));
}

//Sound effects
corrSfx = new buzz.sound( "/sounds/dingsound", {
    formats: ["mp3"]
});
incorrSfx = new buzz.sound( "/sounds/wrongsound", {
    formats: ["mp3"]
});

// Recognizer
var final_transcript = '';
var confidence = null;
var recognizing = false;

// Word list
var wordList = [];
var wordChanged=false;
var theWord;
var resetIndex = false;
var attemptedWords = [];

// Counters
var correct=false;
var correctCounter = 0;
var wordCounter = 0;
var attempts = 0;
var n = '';
var completedWords = ''; 	//for progress
var messageprinted = false; // For feedback
var result = false;

// Get first sound
if (Session.get("sound")==undefined){
	Session.set("sound", "L");
}
var lastSound = Session.get("sound");
/*TO FIX: 
errors in "speak" after a word is skipped? 
*/

// ****************** Helpers **********************
// Show directions
Session.set("directions",true);

Template.directionsBox.helpers({
	showDirections: function(){
		return Session.get("directions");
	}
});

Template.directionsBox.events({
	'click #close_directions': function(event){
		Session.set("directions",false);
	},
	'click #show_directions': function(event){
		Session.set("directions",true);
	}
});

// Button event helpers
Template.workshop.events({
	'click #start_button': function(event){
		startDictation(event);
	},
	'click #stop_button': function(event){
		stopDictation(event);
	},

	'click #speak_button': function(event){
		listen(event);
	},
	'click #skip_button': function(event){
		completedWords = theWord.fontcolor("#E2646B")+" ("+attempts+")<br>" + completedWords;
		$("#compWords").html(completedWords);
		History.insert({userId: Meteor.userId(), mode: "workshop", sound: Session.get("sound"), word: theWord, time: new Date(), correct: false});
		attemptedWords.push(theWord); // adds this word to the list of attempted words
		changeWord(event);
	}
});

// Variable helpers so they are reactive.
Template.getWord.helpers({
	word: Session.get("workshopWord")
});

Template.correct.helpers({
	correct: correctCounter,
	wordCounter: wordCounter,
});

// ********************* Functions ********************
//returns new word from the word collection. Called whenever word needs to change.
function getNewWord(){
	if (!wordChanged || attempts>0) wordCounter++;
	$("#word_counter").html(wordCounter+" <b>total</b>");
	theWord = getWord();
	console.log("next word: "+theWord);
	Session.set("workshopWord",theWord);
}

function getWord(){ // gets a word that has not already been completed.
	// Get all unique finished words: 
	correctWords =_.uniq(_.pluck( History.find({userId: Meteor.userId(), mode: "workshop", sound: Session.get("sound"), correct: true}).fetch(), 'word'));
	console.log("attempted words: "+attemptedWords);

	if (resetIndex){ // starting a new sound
		index=0;
		resetIndex=false;
	} else if (theWord==undefined){ // first word
		index=0;
	} else if(attemptedWords.indexOf(theWord)<0){ // never attempted this word
		index = wordList.indexOf(theWord);
	} else {
		index = wordList.indexOf(theWord)+1;
		if (index >= wordList.length-1){
			index=0;
		}
	}
	console.log(index);

	for (var i = index; i < wordList.length; i++) {
		if(!correctWords.includes(wordList[i])){
			return wordList[i];
		}
	}
	console.log("finished all words on this sound");
	return wordList[0];
}

// Changes the word and updates the counters. Called in Begin, Skip, and when user is correct.
function changeWord(event){
	getNewWord();

	// Reset
	$("#word").html(Session.get("workshopWord"));
	attempts=0;
	correct=false;
	result=false;
	$("#res").html("");
}

function listen(event) {
	msg = new SpeechSynthesisUtterance(theWord);
	//voices = window.speechSynthesis.getVoices();
	//msg.voice = voices[3];
	msg.rate = .7; 
	window.speechSynthesis.speak(msg);	//"speaks" word
}

// **********************  The Speech Recognition Stuff ****************************


// Start recognition. Called by Start button.
function startDictation(event) {
	recognizing=true;
	final_transcript = '';
	recognition.lang = 'en-US';
	recognition.start();
}

// Stop recognition. Called by the Stop button.
function stopDictation(event) {
	if (recognizing) {
		recognition.stop();
		recognizing=false;
		return;
	}
}


// All the stuff below only runs if the WebKit loads.
if ('webkitSpeechRecognition' in window) {
	// Settings.
	console.log("webkit is available!");
	var recognition = new webkitSpeechRecognition();
	recognition.continuous = false;
	recognition.interimResults = false;

	// Called by Start Recognition. 
	recognition.onstart = function() {
		recognizing = true;
		messageprinted=false;
		$("#dictButton").html("<button type=\"button\" class=\"btn btn-raised\" id=\"stop_button\">Stop</button>");
		$("#reco").html('<h2 class = "text-right" id = "mic">'+"Mic ON".fontcolor("#65D6A3")+'</h2>');
	};

	recognition.onerror = function(event) {
		console.log(event.error);
	};

	// Called by Stop Recognition. 
	recognition.onend = function() {
		console.log("end");

		// FEEDBACK FOR NO AUDIO
		if (messageprinted==false){
			console.log("no result");
			$('#res').html("Sorry, I didn't hear anything....");
			messageprinted=true;
		}
		recognizing = false;
		$("#reco").html('<h2 class = "text-right" id = "mic">'+"Mic OFF".fontcolor("#E2646B")+'</h2>');
		$("#dictButton").html("<button type=\"button\" class=\"btn btn-raised\" id=\"start_button\">Speak</button>");
	};

	// The actual recognition.
	recognition.onresult = function(event) {
		//Progress
		var complete = false; 

		messageprinted=true;
		myevent = event;
		for (var i = event.resultIndex; i < event.results.length; ++i) {
			console.log("i="+i);

			if (event.results[i].isFinal) {
				confidence = Math.round(100*event.results[i][0].confidence);
				final_transcript += event.results[i][0].transcript.trim().toLowerCase();
				recognition.stop();
				//console.log('final events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
			}
		}

		console.log("You said \""+final_transcript+"\" with a recorded accuracy of "+confidence+"%");

		// ******** Results ********
	 	//VOICE COMMANDS:
	 	if (final_transcript.includes("pass")) {	//skip
	 		completedWords = theWord.fontcolor("#E2646B")+" ("+attempts+")<br>" + completedWords;
			$("#compWords").html(completedWords);
			attemptedWords.push(theWord); // adds this word to the list of attempted words
			changeWord(event);
		} else if (final_transcript.includes("stop")) { 	//pause
			recognition.stop();
		} else if (final_transcript.includes("story mode")) {	//change to story
			window.location.replace("/story");
		} else if (final_transcript.includes("game mode")) {		//change to game
			window.location.replace("/game");
		} else if  (final_transcript.includes("profile")) {
        	window.location.replace("/profile");
      	} else if (final_transcript.includes("listen")) {
      		listen(event);
      	//PRONUNCIATION FEEDBACK:
      	} else if (final_transcript=='') { // Nothing in transcript.
	  		$('#res').html("Sorry, I didn't hear anything...");
	  	//CORRECT PARAMETERS, threshold: 60% confidence
		} else if (final_transcript.includes(theWord.toLowerCase()) && confidence>=60) {
			console.log ("you are correct!");
			result=true;
			correct=true; 
	  	} else if (final_transcript.includes(theWord.toLowerCase())) { // Correct but low confidence.
	  		result=true;
	  		$("#res").html("That didn't sound quite right, try again.");
	  	} else { // Wrong, or other error.
	  		result=true;
	  		$("#res").html("Try again");
	  	}
	  	// Get feedback / update
	  	if (result){
	  		counter(correct);
	  		result=false; // Reset
	  	}
	};
}

// Updates the counters and feedback
function counter(correct){
	attempts++;

	// Prints out the attempts with the correct ending (1st, 2nd, 3rd, 4th, etc.)
	n = getN(attempts);
	console.log(attempts+n+" attempt(s)");

	if (correct) {
		// Update counter
		correctCounter++;
		$("#correct_counter").html(correctCounter+" <b>correct</b> out of");

		// Feedback
	  	$("#res").html("Congratulations! You said <b>"+theWord+"</b> correctly on your "+attempts+n+" attempt!");
	  	corrSfx.play()
		    .fadeIn()
		    .bind( "timeupdate", function() {
		       var timer = buzz.toTimer( this.getTime() );
		    });

		// Add to history
		History.insert({userId: Meteor.userId(), mode: "workshop", sound: Session.get("sound"), word: theWord, time: new Date(), correct: true});
 		


		
		completedWords = theWord.fontcolor("#65D6A3")+" ("+attempts+")<br>" + completedWords;

		// Change word after 2 seconds
		setTimeout(function(){changeWord(event)},3000);	
	} else { // incorrect or low confidence
		var incorrectAudio = incorrSfx.play()
	    .fadeIn()
	    .bind( "timeupdate", function() {
	       var timer = buzz.toTimer( this.getTime() );
	    });	
	}

	// Show progress
	$("#compWords").html(completedWords);
}

// Finds the correct ending for the number (of attempts).
function getN(attempts){
	switch(attempts){
		case 1: return 'st';
		case 2: return 'nd';
		case 3: return 'rd';
		default: return 'th';
	}
}


// ************************* Sound Select Box ********************************
Template.soundselectworkshop.events({
	"submit #sound-select": function(event){
		event.preventDefault();

		var newSound = Session.get("sound");
		
		// If the sound has actually been changed
		if ((lastSound!=newSound)){
			wordChanged=true;
			console.log("CHANGING WORKSHOP SOUND... new sound = "+newSound);
			// Reset the wordList and pick a new word
			wordList = Phonetics.findOne({sound: newSound}).words;
			resetIndex = true;
			attemptedWords = [];
			changeWord(event);
			lastSound=newSound;
		}
		if (wordChanged) wordChanged=false; // Reset wordChanged
	} 
});
