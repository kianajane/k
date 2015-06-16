/*
This code comes from this blog post by Amit Agarwal
	http://ctrlq.org/code/19680-html5-web-speech-api
	  
Random math function taken from the Mozilla Developer Network
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/

	var final_transcript = '';
	var confidence = null;
	var recognizing = false;
	var words = ["time", "issue","year","side","people","kind","way","head","day","house","man","service","thing","friend","woman",
		"father","life","power","child","hour","world","game","school","line"];
	var correctCounter = 0;
	var wordCounter = 0;
	
	function getRandomArbitrary(min, max) {
    	return Math.random() * (max - min) + min;
	}
	
	var indexF = getRandomArbitrary(0,24);
	console.log(indexF);
	var index = Math.round(indexF);
	console.log(index);
	var theWord = words[index];
	console.log(theWord);
	
	Template.getWord.helpers({
		word: theWord
	});
	
	
	if ('webkitSpeechRecognition' in window) {
		console.log("webkit is available!");
		var recognition = new webkitSpeechRecognition();
	    recognition.continuous = true;
	    recognition.interimResults = false;
 
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
	      var interim_transcript = '';
	      for (var i = event.resultIndex; i < event.results.length; ++i) {
			console.log("i="+i);

	        if (event.results[i].isFinal) {
	        	confidence += Math.round(100*event.results[i][0].confidence);
	        	final_transcript += event.results[i][0].transcript.trim();
				console.log('final events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
	         }
	      }


	      //final_transcript = capitalize(final_transcript);
	      final_span.innerHTML = linebreak("You said \""+final_transcript+"\" with a recorded accuracy of "+confidence+"%");
	      interim_span.innerHTML = linebreak(interim_transcript);
		  
		  if(final_transcript.includes(theWord) && confidence>80){
			  correctCounter++;
			  alert("Congratulations! You said the word correctly!\n You have now said "+correctCounter+" word(s) correctly.");
		  } else {
			  alert("Sorry, I didn't quite catch that...");
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
	  final_transcript = '';
	  recognition.lang = 'en-US';
	  recognition.start();
	  final_span.innerHTML = '';
	  interim_span.innerHTML = "I'm listening...";
	}

	function stopDictation(event) {
		if (recognizing) {
		    recognition.stop();
		    return;
		}
	}

	function counter(correct){
		if (correct == true) {
			correctCounter ++;
		}
		wordCounter ++;
	}
	
  Template.welcome.events({
	'click #start_button': function(event){
		startDictation(event);
	},
	'click #stop_button': function(event){
		stopDictation(event);
	}
  });

  

