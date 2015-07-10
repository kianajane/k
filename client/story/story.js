/*
  This code comes from this blog post by Amit Agarwal
      http://ctrlq.org/code/19680-html5-web-speech-api
*/

/* comment from 7/9: 
FIX INCLUDES (error: " they" passes for " the " due to ||s)
WAIT TIME IF LAST WORD IN SENTENCE IS SKIPPED
IF SKIP ENTIRE SENTENCE, NOTHING HAPPENS
BUGS IN COLORING ARISE IF SKIPPED TOO MUCH
*/

var final_transcript = '';
recognizing = false;
var interim_transcript = '';
var index=0;
var wordNum = 0;
sent = "";
var words = [];
var original = [];
var skipped = []; //contains index of the word of words[] that was skipped

if ('webkitSpeechRecognition' in window) {
	console.log("webkit is available!");
	var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() {
      recognizing = true;
      $("#start_button").html('<button type="button" class="btn btn-info" id="pause_story">Pause Story</button>');
      $("#reco").html('<h2 class = "text-right" id = "mic">'+"Mic ON".fontcolor("#7fe508")+'</h2>');
    };

    recognition.onerror = function(event) {
      console.log(event.error);
    };

    recognition.onend = function() {
      recognizing = false;
      $("#start_button").html('<button type="button" class="btn btn-success" id="start_story">Begin Story</button>');
      $("#reco").html('<h2 class = "text-right" id = "mic">'+"Mic OFF".fontcolor("#FF7373")+'</h2>');
    };

    recognition.onresult = function(event) {
  		myevent = event;

      for (var i = event.resultIndex; i < event.results.length; ++i) {
  		console.log("i="+i);
        if (event.results[i].isFinal) {
        	final_transcript += 
      		Math.round(100*event.results[i][0].confidence)+"% -- "+
      		event.results[i][0].transcript.trim() +".\n";
  				console.log('final events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
        } else {
        	interim_transcript += Math.round(100*event.results[i][0].confidence)+"% -- "+event.results[i][0].transcript+"<br>";
  			  console.log('interim events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
        }
      }

      getSent();

      //change all char to lowercase
      trimStory = sent.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase();
      current = " "+interim_transcript.toLowerCase() + " ";
      words = trimStory.split(" ");
      
      console.log ("say: " + words[wordNum]);
      // Note: we are ignoring confidence. Also, should be only working for complete words. Eg. "I" is found in "something".
      if (current.includes(" "+words[wordNum] || words[wordNum]+" " || " "+words[wordNum]+" ")) {
          if (wordNum >= words.length - 1) {
            console.log ("you've completed the sentence!");
            correctWords();
            index++;  //changes sentence
            wordNum = 0;  //reset index for words[]
            skipped = [];

            // Can we get the interim transcript to reset somehow??? Doesn't work.
            //final_transcript = ''; interim_transcript='';
            //startDictation(event);    
          } else {
            //console.log("you're awesome!!!!!");
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

//sentence changing and printing happens here
function getSent() {
  if (index>0) {
    $("#prevSent").html(newSentence); //shows sentence before above (with G/R coloring)
  }
  sent = story1[index];
  original = sent.split(" "); 
  $("#senth1").html(coloring(original, wordNum));
}

//colors the word that you are on blue
function coloring(original, wordNum) {
  newSent = "";
  for(var j = 0; j < original.length; j++) {
    if (j == wordNum) {
      newSent += " " + original[j].fontcolor("blue"); 
    } else {
      newSent += " " + original[j].fontcolor("black");
    }
  }
  return newSent;
}

//separates the correct and incorrect words
function correctWords() {
  var correct = [];
  var incorrect = [];
  for (var wordI = 0; wordI<=words.length; wordI++) {
    if (current.includes(words[wordI])) {
      correct.push(original[wordI]); 
      console.log("correct words: "+correct);
    } else {
      incorrect.push(original[wordI]);
    }
  }
  colorGR(correct, incorrect);
}

//colors the correct words green(G), incorrect words red (R)
function colorGR(correct, incorrect) {
  newSentence = ""; //colored sentence
  var cIndex = 0;
  for(var k = 0; k < words.length; k++) {
    console.log(k);
    var corr = correct[cIndex];
    if (original[k] == corr) {
      newSentence += " " + corr.fontcolor("green");
      cIndex++;
    } else {
      for (var s = 0; s<skipped.length; s++) {
        if (skipped[s]==k) {
           newSentence += " " + original[k].fontcolor("red");
        }
      }
    }
  }
  console.log(newSentence);
}

Template.story.events({
	'click #start_story': function(event){
    story1 = Phonetics.find({sound: "L"}).fetch()[0].story;    
		startDictation(event);
    getSent();
	},
  'click #pause_story': function(event) {
    startDictation(event);
  },
  'click #skip': function(event) {
    if (wordNum==words.length-1) {
      skipped.push(wordNum);
      correctWords();
      index++; wordNum=0;
    } else {
      skipped.push(wordNum);
      wordNum++;
    }
    getSent();
  }
})
