/*
  This code comes from this blog post by Amit Agarwal
      http://ctrlq.org/code/19680-html5-web-speech-api
*/

var final_transcript = '';
var recognizing = false;
var interim_transcript = '';
var index=0;


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

      //sentence changing happens here
      trimStory = story1[index].replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase()
      //console.log ("say: " + capitalize(trimStory));
      $("#senth1").html(story1[index]);
      interim_transcript = interim_transcript.toLowerCase()//.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")
     

      words = trimStory.split(" ");

      for (var j = 0; j < words.length; j++)
      {

        console.log ("say: " + words[j]);
        if (interim_transcript.includes(words[j]))
        {
            console.log("you're awesome!!!!!");
            console.log(index + "   " + words[j]);
        }


        /*// If whole sentence correct
        if (interim_transcript.includes(trimStory)) {
      		console.log("you're awesome");
      		console.log(index + "   " + story1[index]);

          // Can we get the interim transcript to reset somehow???
          //interim_transcript.replace(interim_transcript, '');
      		index++;*/
      	  
          //}
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

var click = false;

Template.story.events({
	'click #start_story': function(event){

    story1 = Phonetics.find({sound: "L"}).fetch()[0].story;    
		startDictation(event);
		$("#senth1").html(story1[index]);
	}
})
