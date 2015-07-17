/*
  This code comes from:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
*/
if (![].includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
    'use strict';
    var O = Object(this);
    var len = parseInt(O.length) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1]) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) {
        return true;
      }
      k++;
    }
    return false;
  };
}

/* VOICE RECO
  Some parts of code comes from this blog post by Amit Agarwal
      http://ctrlq.org/code/19680-html5-web-speech-api
*/
var final_transcript = '';
var recognizing = false;
var interim_transcript = '';
var index=0;          //index in Phonetics - sound - story[]
var sent = "";        // = story[index]
var words = [];       //array of the words in sent
var wordNum = 0;      //index in words[]
var original = [];    //accessed in .onresult, coloring, colorGR
var correct = [];     //accessed in events
var incorrect = [];   //accessed in events
var coloredSent = ""; //global to make coloredSent accumulate
var end = false;      //marks end of sentence, used in getSent() for timeout

if (Session.get("sound")==undefined){
  Session.set("sound", "L");
}
var lastSound = Session.get("sound");

if ('webkitSpeechRecognition' in window) {
	console.log("webkit is available!");
	var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

    recognition.onstart = function() {
      recognizing = true;
      $("#start_button").html('<button type="button" class="btn btn-info" id="pause_story">Stop Story</button>');
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

      //Voice commands: skip (doesnt work), pause, site nav
      if (final_transcript.includes("skip" || "pass")) {
        skip(event);
      } else if (interim_transcript.includes("stop")) {
        recognition.stop();
      } else if (interim_transcript.includes("workshop")) { //goes to story
        window.location.replace("/workshop");
      } else if (interim_transcript.includes("game")) {  //goes to game
        window.location.replace("/game");
      } else if  (interim_transcript.includes("profile")) { //goes to profile
        window.location.replace("/profile");
      }

      //If sentence completed
      if (end) {                    
        colorGR(correct, incorrect);
        feedback();
        wordNum=0;
        index++;
        //setTimeout(getSent, 1500);  //creates lag time for final_transcript, array reset, .. 
        $("#prevSent").html(coloredSent);//shows completed sentences on the side
        end=false;
      }
      
      getSent();
      
      //Change all char to lowercase
      trimStory = sent.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase();
      current = " "+interim_transcript.toLowerCase() + " ";
      words = trimStory.split(" ");
      console.log ("say: " + words[wordNum]);
      // Note: we are ignoring confidence. Kind of working (if "they" is said, passes for "the")
      if (current.includes(" "+words[wordNum] || words[wordNum]+" " || " "+words[wordNum]+" ")) {
        correct.push(wordNum); //Pushes index to correct[]
        console.log("correct words: "+correct);
        if (wordNum >= words.length-1) {
          console.log ("you've completed the sentence!");
          end = true;                   //sentence end

          //Add to history; (7/11 jane - changed "word: trimStory" to sent, might want to make the sentence into the colored one?)
          History.insert({userId: Meteor.userId(), mode: "story", sound: Session.get("sound"), word: sent, time: new Date()}); // Probably want to record a different sentence
        } else {
          wordNum++;             console.log("wordNum: "+wordNum+", words.length: "+words.length);
        }
        
      }
    };
}
//Starts reco
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
//Sentence changing and printing happens here
function getSent() {
  sent = story1[index];
  original = sent.split(" "); 
  $("#senth1").html(coloring(original, wordNum));
}
//"Highlights" the word that you are on blue
function coloring(original, wordNum) {
  newSent = "";
  for(var j = 0; j < original.length; j++) {
    if (j == wordNum) {
      newSent += " " + original[j].fontcolor("#00aedb"); 
    } else {
      newSent += " " + original[j].fontcolor("black");
    }
  }
  return newSent;
}
//Final coloring: colors the correct words green(G), incorrect words red (R)
function colorGR(correct, incorrect) {
  for(var k = 0; k < original.length; k++) {
    var w = original[k]
    if (correct.includes(k)) {
      coloredSent += " " + w.fontcolor("#00b159");
    } else {
      coloredSent += " " + w.fontcolor("#d11141");
    }
  }
  coloredSent+="<br>";
}
//Visual feedback after sentence completed
function feedback() {
  if (correct.length == words.length) {
    corrSfx.play()
          .fadeIn()
          .bind( "timeupdate", function() {
             var timer = buzz.toTimer( this.getTime() );
          });
    $("#storyarea").html("<h3>Perfect!</h3> <img src = \"images/goodjob.jpg\" width = \"100%\" alt = \"completed\">");
  } else {
    $("#storyarea").html("<img src = \"images/completedsent-01.png\" width = \"70%\" alt = \"completed\">");
  }
  correct = []; incorrect = []; //reset arrays
  setTimeout(resetStoryarea, 1500);
}
//Resets area
function resetStoryarea() {
  $("#storyarea").html('<p class = "lead" id = "storyTitle"></p> <h1 class = "text-left" id="senth1"></h1>');
}
//When skip
function skip(event) {
  incorrect.push(wordNum); 
  console.log("incorrect: "+incorrect);
  if (wordNum==words.length-1) {
    end=true;
  } else {
    wordNum++;  
  }
  return;
}

Template.story.events({
	'click #start_story': function(event){
    story1 = Phonetics.findOne({sound: lastSound}).story;
    $("#storyTitle").html('Read the following: '); $("#resTitle").html('Your progress: ');  //Is there a way to make this show up forever after one sentence is complete?
		startDictation(event);
    getSent();
	},
  'click #pause_story': function(event) {
    startDictation(event);
  },
  'click #skip': function(event) {
    skip(event);
  }
})

Template.soundselectstory.events({
  "submit #sound-select": function(event){
    event.preventDefault();
    var soundSelected = event.target.sound.value;
    Session.set("sound",soundSelected);
    var newSound = Session.get("sound");
    if (lastSound!=newSound){
      console.log("CHANGING STORY SOUND... new sound = "+newSound);
      story1 = Phonetics.findOne({sound: newSound}).story;
      index = 0; wordNum = 0;
      getSent();
      lastSound=newSound;
    }
  }
})