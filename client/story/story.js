/*
  This code comes from this blog post by Amit Agarwal
      http://ctrlq.org/code/19680-html5-web-speech-api
*/

var final_transcript = '';
recognizing = false;
var interim_transcript = '';
index=0;
wordNum = 0;
sent = "";

if ('webkitSpeechRecognition' in window) {
	console.log("webkit is available!");
	var recognition = new webkitSpeechRecognition();
    recognition.continuous = false; // 7/8 change
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


      // Where the color change happens. When we're up to that word, change it green.
      sent = story1[index];
      $("#senth1").html(coloring(sent, wordNum));


      //sentence changing happens here
      trimStory = sent.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase();
      interim_transcript = interim_transcript.toLowerCase()

      interim_transcript = " " + interim_transcript + " ";

      words = trimStory.split(" ");
       
      console.log ("say: " + words[wordNum]);

      // Note: we are ignoring confidence. Also, should be only working for complete words. Eg. "I" is found in "something".
      if (interim_transcript.includes(words[wordNum]))
      {
          if (wordNum >= words.length - 1)
          {
            // When sentence is over, change sentence.
            console.log ("you've completed the sentence!");
            index++;

            // Can we get the interim transcript to reset somehow??? Doesn't work.
            final_transcript = ''; interim_transcript='';
            recognition.start();
            //startDictation(event);

            event.results = [];
            wordNum = 0;
            
          } else
          {
            console.log("you're awesome!!!!!");
            wordNum++;
          }
      }
    };
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

function capitalize(s) {
  return s;
  //return s.replace(s.substr(0,1), function(m) { return m.toUpperCase(); });
}

function coloring(sent, wordNum) {
  prettyWords = sent.split(" ");
  newSent = "";
  for(var j = 0; j < prettyWords.length; j++)
  {
    if (j == wordNum)
    {
      newSent += " " + prettyWords[j].fontcolor("blue"); 
    }else 
    {
      newSent += " " + prettyWords[j].fontcolor("black");
    }
  }
  return newSent;
}

function startDictation(event) {
  if (recognizing) {
    recognition.stop();
    recognizing = false;
    return;
  }
  final_transcript = '';
  recognition.lang = 'en-US';
  recognition.start();
}

Template.story.events({
	'click #start_story': function(event){

    story1 = Phonetics.find({sound: "L"}).fetch()[0].story;    
		startDictation(event);
    sent = story1[index];
		$("#senth1").html(coloring(sent, 0));
	}
})
