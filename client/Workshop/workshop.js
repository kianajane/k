/*
This code comes from this blog post by Amit Agarwal
http://ctrlq.org/code/19680-html5-web-speech-api
  
Random math function taken from the Mozilla Developer Network
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/

// Chooses an intial sound
Template.workshop.rendered = function() {
	// Reset
	wordCounter=0;
	correctCounter=0;
	completedWords='';
	// Show a word
	wordList = Phonetics.findOne({sound: Session.get("sound")}).words;
	getNewWord();
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
		completedWords += currentWord.fontcolor("#d11141") + "<br>";
		$("#compWords").html(completedWords);
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
	$("#word_counter").html("<b>Total words:</b> "+wordCounter);
	theWord = wordList[Math.round(getRandomArbitrary(0,wordList.length-1))];
	Session.set("workshopWord",theWord);
	console.log(theWord);
}

//random # returned inside given range. (called in getNewWord)
function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

// Changes the word and updates the counters. Called in Begin, Skip, and when user is correct.
function changeWord(event){
	getNewWord();

	// Reset
	$("#word").html(Session.get("workshopWord"));
	attempts=0;
	correct=false;
	result=false;
	$("#skipButton").html(""); // Remove the skip button.
	$("#res").html("");
}

// Updates the counters when the user is correct.
function counter(correct){
	attempts++;

	// Prints out the attempts with the correct ending (1st, 2nd, 3rd, 4th, etc.)
	n = getN(attempts);
	console.log(attempts+n+" attempt(s)");
	if (attempts >= 1){
		$("#skipButton").html('<button type="button" class="btn btn-warning" id="skip_button">Skip word</button>');
	}

	if (correct) {
		// Update counter
		correctCounter++;
		document.getElementById("correct_counter").innerHTML = "<b>Number correct:</b> "+correctCounter;

		// Feedback
	  	$("#res").html("Congratulations! You said the word correctly on your "+attempts+n+" attempt!");
	  	corrSfx.play()
		    .fadeIn()
		    .bind( "timeupdate", function() {
		       var timer = buzz.toTimer( this.getTime() );
		    });

		// Add to history & progress
		History.insert({userId: Meteor.userId(), mode: "workshop", sound: Session.get("sound"), word: theWord, time: new Date()});
		completedWords += currentWord.fontcolor("#00b159") + " (" + attempts + ")" + "<br>";

		// Change word
		changeWord(event);
	} else {
		var incorrectAudio = incorrSfx.play()
	    .fadeIn()
	    .bind( "timeupdate", function() {
	       var timer = buzz.toTimer( this.getTime() );
	    });	
	}

	// Show progress
	$("#progress").html("Completed: ");
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
	$("#results_heading").html("");
	$('#res').html("");
}

// Stop recognition. Called by the Stop button.
function stopDictation(event) {
	$("#results_heading").html("Results:");
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
		interim_span.innerHTML = "I'm listening..."; // feedback that it's working, and removes previous message.
		recognizing = true;
		messageprinted=false;
		$("#dictButton").html("<button type=\"button\" class=\"btn btn-danger\" id=\"stop_button\">Stop</button>");
		$("#reco").html('<h2 class = "text-right" id = "mic">'+"Mic ON".fontcolor("#7fe508")+'</h2>');
	};

	recognition.onerror = function(event) {
		console.log(event.error);
	};

	// Called by Stop Recognition. 
	recognition.onend = function() {
		interim_span.innerHTML = '';
		console.log("end");

		// FEEDBACK FOR NO AUDIO
		if (messageprinted==false){
			console.log("no result");
			$('#res').html("Sorry, I didn't hear anything....");
			messageprinted=true;
		}
		recognizing = false;
		$("#reco").html('<h2 class = "text-right" id = "mic">'+"Mic OFF".fontcolor("#FF7373")+'</h2>');
		$("#dictButton").html("<button type=\"button\" class=\"btn btn-success\" id=\"start_button\">Speak</button>");
	};

	// The actual recognition.
	recognition.onresult = function(event) {
		//Progress
		currentWord = Session.get("workshopWord");
		var complete = false; 

		messageprinted=true;
		myevent = event;
		var interim_transcript = '';
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
		interim_span.innerHTML = linebreak(interim_transcript);

		// ******** Results ********
		//CORRECT PARAMETERS, threshold: 60% confidence
		if (final_transcript.includes(theWord) && confidence>=60) {
			console.log ("you are correct!");
			result=true;
			correct=true;
	 	//FEEDBACK & VOICE COMMANDS:
	 	} else if (final_transcript.includes("pass" || "skip")) {	//skip
	 		completedWords += currentWord.fontcolor("#d11141") + "<br>";
			$("#compWords").html(completedWords);
			changeWord(event);
		} else if (final_transcript.includes("stop")) { 	//pause
			recognition.stop();
		} else if (final_transcript.includes("story")) {	//change to story
			window.location.replace("/story");
		} else if (final_transcript.includes("game")) {		//change to game
			window.location.replace("/game");
		} else if  (final_transcript.includes("profile")) {
        	window.location.replace("/profile");
      	} else if (final_transcript.includes("listen")) {
      		listen(event);
      	} else if (final_transcript=='') { // Nothing in transcript.
	  		$('#res').html("Sorry, I didn't hear anything...");    
	  	} else if (final_transcript.includes(theWord) && confidence<60) { // Correct but low confidence.
	  		result=true;
	  		$("#res").html("That didn't sound quite right, try again.");
	  	} else { // Wrong, or other error.
	  		result=true;
	  		$("#res").html("Try again");
	  	}
	  	if (result){
	  		counter(correct);
	  		result=false; // Reset
	  	}
	};
}

// Formatting functions.
var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
	return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

function capitalize(s) { // Unused???
	return s.replace(s.substr(0,1), function(m) { return m.toUpperCase(); });
}


// ************************* Sound Select Box ********************************
Template.soundselectworkshop.events({
	"submit #sound-select": function(event){
		event.preventDefault();

		// Get the results from the input box
		var soundSelected = event.target.sound.value;
		Session.set("sound",soundSelected);
		var newSound = Session.get("sound");
		
		// If the sound has actually been changed
		if ((lastSound!=newSound)){
			wordChanged=true;
			console.log("CHANGING WORKSHOP SOUND... new sound = "+newSound);
			// Reset the wordList and pick a new word
			wordList = Phonetics.findOne({sound: newSound}).words;
			changeWord(event);
			lastSound=newSound;
		}
		if (wordChanged) wordChanged=false; // Reset wordChanged
	} 
});
