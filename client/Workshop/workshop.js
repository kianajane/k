/*
This code comes from this blog post by Amit Agarwal
http://ctrlq.org/code/19680-html5-web-speech-api
  
Random math function taken from the Mozilla Developer Network
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
var final_transcript = '';
var confidence = null;
var recognizing = false;

// Should switch to new words!
//var words = Phonetics.find({sound: "R"}).fetch()[0].words;
var words = ["time", "issue","year","side","people","kind","way","head","day","house","man","service","thing","friend","woman",
	"father","life","power","child","hour","world","game","school","line"];
var correct=false;
var correctCounter = 0;
var wordCounter = 1;
var attempts = 0;
var messageprinted = false;

/*TO FIX: 
errors in "speak" after a word is skipped? 
*/

Template.workshop.events({
	'click #start_button': function(event){
		startDictation(event);
	},
	'click #stop_button': function(event){
		stopDictation(event);
	},

	'click #speak_button': function(event){
		msg = new SpeechSynthesisUtterance(theWord);
		//voices = window.speechSynthesis.getVoices();
		//msg.voice = voices[3];
		msg.rate = .5; 
		window.speechSynthesis.speak(msg);	//"speaks" word
	},
	'click #skip_button': function(event){
		changeWord(event);
	}
});

Template.getWord.helpers({
	word: getNewWord()
});

Template.correct.helpers({
	correct: correctCounter,
	wordCounter: wordCounter,
});

//returns new word from words[]
function getNewWord(){
	theWord = words[Math.round(getRandomArbitrary(0,24))];
	console.log(theWord);
	return theWord;
}

//random # returned (called in getNewWord)
function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

//called in skip, new word given for user to speak
function changeWord(event){
	$("#word").html(getNewWord());
	//document.getElementById("word").innerHTML = "Please say: "+getNewWord();
	correct=false;
	wordCounter++;
	$("#word_counter").html("<b>Total words:</b> "+wordCounter);
	$("#skipButton").html("");
	attempts = 0;
}

function startDictation(event) {
	recognizing=true;
	final_transcript = '';
	recognition.lang = 'en-US';
	recognition.start();
	$("#results_heading").html("");
	$('#res').html("");
	interim_span.innerHTML = "I'm listening...";
}

function stopDictation(event) {
	$("#results_heading").html("Results:");
	interim_span.innerHTML = '';
	if (recognizing) {
	    recognition.stop();
	    recognizing=false;
	    return;
	}
}

function counter(correct){
	if (correct == true) {
		correctCounter ++;
	}
	attempts++;
	if (attempts >= 1){
		$("#skipButton").html('<button type="button" class="btn btn-warning" id="skip_button">Skip word</button>');
	}
}


if ('webkitSpeechRecognition' in window) {
	console.log("webkit is available!");
	var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = function() {
		recognizing = true;
		messageprinted=false;
		$("#dictButton").html("<button type=\"button\" class=\"btn btn-danger\" id=\"stop_button\">Stop</button>");
    	$("#reco").html('<h2 class = "text-right" id = "mic">'+"Mic ON".fontcolor("#7fe508")+'</h2>');
    };

    recognition.onerror = function(event) {
    	console.log(event.error);
    };

    recognition.onend = function() {
    	console.log("end");
    	if (messageprinted==false){
    		console.log("no result");
    		$('#res').html("Sorry, I didn't quite catch that..");
    		messageprinted=true;
    	}
		recognizing = false;
		$("#reco").html('<h2 class = "text-right" id = "mic">'+"Mic OFF".fontcolor("#FF7373")+'</h2>');
		$("#dictButton").html("<button type=\"button\" class=\"btn btn-success\" id=\"start_button\">Speak</button>");
    };

    recognition.onresult = function(event) {
    	messageprinted=true;
		myevent = event;
		var interim_transcript = '';
		for (var i = event.resultIndex; i < event.results.length; ++i) {
			console.log("i="+i);
			if (event.results[i].isFinal) {
				confidence = Math.round(100*event.results[i][0].confidence);
				final_transcript += event.results[i][0].transcript.trim();
				//console.log('final events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
			}
		}

      console.log("You said \""+final_transcript+"\" with a recorded accuracy of "+confidence+"%");
      interim_span.innerHTML = linebreak(interim_transcript);
      //Audio input evaluation, threshold: 60% confidence
      if (final_transcript.includes(theWord) && confidence>60) {
      	correct=true;
      } 
      counter(correct);
	  
	  //Feedback - messages in result box
	  if (final_transcript=='' || confidence<50) {
	      $('#res').html("Sorry, I didn't quite catch that..");
	  }else if(final_transcript.includes(theWord) && confidence>60){
		  $("#res").html("Congratulations! You said the word correctly on your "+attempts+" attempt!\n You have now said "+correctCounter+" word(s) correctly out of "+wordCounter+" words.");
		  changeWord(event);
	  } else {
		  $("#res").html("Try again");
	  }
	  //Updates correct counter
	  document.getElementById("correct_counter").innerHTML = "<b>Number correct:</b> "+correctCounter;
	  
    };
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}