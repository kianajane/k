var l1 = [
"I like cheese.",
"April the elephant lived in Brazil.",
"Her friends Lucy the Lizard and Lexie the Owl liked to be lazy.",
"They would play on the log in the lake, take extra long lunches, and dig holes.",
"Then they met Albert the Whale, near a pool of water, by the ocean.",
"Albert told them that it is okay to laugh, be silly, and lazy sometimes, but it was dangerous to do in the jungle.",
"Albert told them eleven ways that would help them be safer. April, Lucy, and Lexie listened and learned how to be more safe.",
"After Albert finished talking, the three friends yelled, \"Thank you,\" to him as he swam away." ]

/*
  This code comes from this blog post by Amit Agarwal
      http://ctrlq.org/code/19680-html5-web-speech-api
*/

var final_transcript = '';
var recognizing = false;
var interim_transcript = '';
var index=0;
sentence = l1[0];

if ('webkitSpeechRecognition' in window) {
	console.log("webkit is available!");
	var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() {
      recognizing = true;
    };

    recognition.onerror = function(event) {
      console.log(event.error);
    };

    recognition.onend = function() {
      recognizing = false;
    };

    recognition.onresult = function(event) {
		myevent = event;
       
      for (var i = event.resultIndex; i < event.results.length; ++i) {
		console.log("i="+i);
        if (event.results[i].isFinal) {
        	final_transcript += 
        		Math.round(100*event.results[i][0].confidence)+"% -- "+
        		capitalize(event.results[i][0].transcript.trim()) +".\n";
				console.log('final events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
        } else {
        	interim_transcript += Math.round(100*event.results[i][0].confidence)+"% -- "+event.results[i][0].transcript+"<br>";
			console.log('interim events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
        }
      }

      console.log ("say: " + sentence);
      if (interim_transcript.includes(sentence)) {
      	sentence = l1[index];
      	$("#senth1").html(sentence);
		console.log("you're awesome");
		console.log(index + "   " + sentence);
		index++;
	  }
    };
}


var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

function capitalize(s) {
  return s.replace(s.substr(0,1), function(m) { return m.toUpperCase(); });
}

function startDictation(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.lang = 'en-US';
  recognition.start();
}


function getSent() {
	return sentence;
}

var click = false;

Template.story.events({
	'click #start_story': function(event){
		startDictation(event);
		$("#senth1").html(sentence);
		//reading();
	}
})

// Template.getSentence.helpers({
// 	sent: getSent()
// });
