/*
  This code comes from:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
  Allows arrays to have .includes() 
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

// On rendered
Template.story.rendered = function() {
  Session.set("story",true);
  if (recognizing) recognition.stop();
  story1 = Session.get("storyChosen");
  // Show first sentence 
  getSent();
}

//Sound effect
cheer = new buzz.sound( "/sounds/yaysound", {
    formats: ["mp3"]
});

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
var coloredSent = ""; //global to make coloredSent accumulate
var end = false;      //marks end of sentence, used in getSent() for timeout
var storyEnd = false;

if (Session.get("sound")==undefined){
  Session.set("sound", "L");
}
var lastSound = Session.get("sound");

if (Session.get("storyChosen")==undefined){
  Session.set("storyChosen", new Array ("The little owl floated across the lake on a big leaf.", "The leaf was green and yellow and slid across the lake with ease.", "The owl was late for lunch with her friend, a sparrow named Flower.", "As she approached the shore, the owl could hear Flower ringing a little golden bell, signaling the start of the meal.", "\"Oh no, I\'m so very late!\" the owl exclaimed, flapping her wings and leaping from the leaf.", "She flew to the shore and landed in front of Flower who stood holding her bell and laughing.", "\"What are you laughing at?\" the owl asked Flower.", "\"You looked so worried,\" Flower said, \"It\'s just lunch.\"", "\"I know it\'s just lunch,\" said the owl, \"But my belly is rumbling, and I was afraid all the food would be gone.\"", "Flower shook her head and led the owl into her home.", "\"I made sure to save you some,\" Flower said, putting her bell away, \"Now, let\'s eat!\""));
}

var story1 = Session.get("storyChosen");
var oldSentence1=story1[0];

if ('webkitSpeechRecognition' in window) {
  console.log("webkit is available!");
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

    recognition.onstart = function() {
      recognizing = true;
      $("#startButton").html('<button type="button" class="btn btn-raised" id="pause_story">Pause Story</button>');
      $("#reco").html('<h2 class = "text-right" id = "mic">'+"Mic ON".fontcolor("#65D6A3")+'</h2>');
    };

    recognition.onerror = function(event) {
      console.log(event.error);
    };

    recognition.onend = function() {
      recognizing = false;
      $("#startButton").html('<button type="button" class="btn btn-raised" id="start_story">Begin Story</button>');
      $("#reco").html('<h2 class = "text-right" id = "mic">'+"Mic OFF".fontcolor("#E2646B")+'</h2>');
    };

    recognition.onresult = function(event) {
      myevent = event;

      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript.trim() +".\n";
          console.log('final events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
        } else {
          interim_transcript += event.results[i][0].transcript+"<br>";
          console.log('interim events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
        }
      }

      //Voice commands: restarts sentence, pause, site nav
      if (interim_transcript.includes("stop")) {
        recognition.stop();
        return;
      } else if (interim_transcript.includes("restart")) {
        wordNum=0;
        getSent();
        return;
      } else if (interim_transcript.includes("workshop")) {
        window.location.replace("/workshop");
        return;
      } else if (interim_transcript.includes("go to game")) {
        window.location.replace("/game");
        return;
      } else if (interim_transcript.includes("profile")) {
        window.location.replace("/profile");
        return;
      }

      endCheck();
      getSent();
            
      //Change all char to lowercase
      trimStory = sent.replace(/[\.,-\/#!$%\^&\*;\":{}=\-_`~()]/g,"").toLowerCase();
      current = " "+interim_transcript.toLowerCase() + " ";
      words = trimStory.split(" ");
      console.log ("say: " + words[wordNum]);
      // Note: we are ignoring confidence. Kind of working (if "they" is said, passes for "the")
      if (current.includes(" "+words[wordNum] || words[wordNum]+" ")) {
        correct.push(wordNum); //Pushes index to correct[]
        console.log("correct words: "+correct);
        if (wordNum >= words.length-1) {
          console.log ("you've completed the sentence!");
          end = true;                   //sentence end
        }
        if (wordNum<words.length-1) {
          wordNum++;
          console.log("wordNum: "+wordNum+", words.length: "+words.length);
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
  if (storyEnd == false) {
    story1 = Session.get("storyChosen");
    console.log(index);
    sent = story1[index];
    original = sent.split(" "); 
    $("#senth1").html(coloring(original, wordNum));
  }
}
//"Highlights" the word that you are on blue
function coloring(original, wordNum) {
  newSent = "";
  for(var j = 0; j < original.length; j++) {
    if (j == wordNum) {
      //var theWord = original[j].fontcolor("#00aedb");
      newSent += " " + original[j].fontcolor("#00aedb"); 
    } else {
      newSent += " " + original[j].fontcolor("black");
    }
  }
  return newSent;
}
//If at the end of the story or sent, does stuff
function endCheck() {
  
  if (end) {
  //If sentence completed with 80% right, add to history as correct:
  console.log ("you finished a sentence: " + index);
    if (correct.length >= words.length * (8.0 / 10))
    {
      History.insert({userId: Meteor.userId(), mode: "story", sound: Session.get("sound"), word: sent, correct: true, time: new Date()});
    } else {
      console.log ("the sentence was not above 80% complete");
      History.insert({userId: Meteor.userId(), mode: "story", sound: Session.get("sound"), word: sent, correct: false, time: new Date()});   
    }
    colorGR(correct);
    feedback();
    $("#prevSent").html(coloredSent);//shows completed sentences on the side
    end=false; 
  }

  //If at the end of the story (ALERT)
  //console.log ("story1: " + story1);
  if (index == story1.length) {
    storyEnd = true;
    recognition.stop();
    var storyEndSound = cheer.play();
    console.log("reached the end!");

    $("#storyarea").html('<div class="alert alert-success" role="alert" id="endSoundS"> <strong>Congratulations!</strong> You finished all words on this sound! <br> Your other options are: <br> 1. Select another sound or story on the left <br> 2. Go to another mode. <br> <center> <a class = "btn btn-default btn-raised" href="/workshop" id = "WS">Workshop</a> <a class = "btn btn-default btn-raised" href="/game" id="game">Game</a> </center> </div>');
    setTimeout(function() {return}, 100000);
  }
}
//Final coloring: colors the correct words green(G), incorrect words red (R)
function colorGR(correct) {
  for(var k = 0; k < original.length; k++) {
    var w = original[k]
    if (correct.includes(k)) {
      coloredSent += " " + "<span style=\"color:#00b159\">"+w+"</span>"; // w.fontcolor("#00b159");
    } else {
      coloredSent += " " + "<span style=\"color:#d11141\">"+w+"</span>"; //w.fontcolor("#d11141");
    }
  }
  coloredSent+="<br>";
}
//Visual feedback after sentence completed
function feedback() {
  if (correct.length == words.length) {
    var storyaud = corrSfx.play()
          .fadeIn()
          .bind( "timeupdate", function() {
             var timer = buzz.toTimer( this.getTime() );
          });
    $("#storyarea").html("<img src = \"images/story-correct.png\" width = \"100%\" alt = \"allgreen\">"); 
    //make the image longer
  } else {
    $("#storyarea").html("<img src = \"images/story-compsent.png\" width = \"100%\" alt = \"sentcomplete\">");
  }
  correct = []; wordNum=0; index++; //reset array, vars 
  console.log("wordNum reset. wordNum = "+wordNum);
  setTimeout(function() {
    $("#storyarea").html('<h1 class = "text-left" id="senth1"></h1>') 
    getSent();
  }, 1700);  
  
}


//When skip
function skip(event) {
  if (wordNum==words.length-1) {
    end=true;
    endCheck();
    getSent();
  } else {
    wordNum++;  
    getSent();
  }
}

// When you click 'Resume', find the last sentence you've done for that story.
function resume(event) {
 
  // Only resume to your farthest point in that story. if you've finished the story, send the alert.
  correctSentences =_.uniq(_.pluck( History.find({userId: Meteor.userId(), mode: "story", sound: Session.get("sound"), correct: true}).fetch(), 'word'));
   story1 = Session.get("storyChosen");

  lastSent = "";
  // Find the first sentence in the story that you haven't done.
  for (var i = 0; i < story1.length; i++) {
    if(!correctSentences.includes(story1[i])){
      index = i;
      lastSent = story1[index];
      i = story1.length
    }
  }

  console.log ("i: "+ i);
  console.log ("sent: " + lastSent);

  // replace with endCheck(); ??
  if (lastSent == "") { // There is no sentence in the story that you haven't done.
    console.log ("You are done! but for some reason the alert doesn't show up");
    recognition.stop();
    var storyEndSound = cheer.play();
    $("#storyArea").html('<div class="alert alert-success" role="alert" id="endSound"> <strong>Congratulations!</strong> You finished all words on this sound! <br> Your other options are: <br> 1. Select another sound or story on the left <br> 2. Go to another mode. <br> <center> <a class = "btn btn-default btn-raised" href="/workshop">Workshop</a> <a class = "btn btn-default btn-raised" href="/game">Game</a> </center> </div>');
  }

    sent = lastSent;
    original = sent.split(" "); 
    $("#senth1").html(coloring(original, wordNum));

}

// Show directions
Session.set("story_directions",true);

Template.storyDirections.helpers({
  showDirections: function(){
    return Session.get("story_directions");
  }
});

Template.storyDirections.events({
  'click #close_directions': function(event){
    Session.set("story_directions",false);
  },
  'click #show_directions': function(event){
    Session.set("story_directions",true);
  }
});


Template.story.events({
  'click #start_story': function(event){
    startDictation(event);
    getSent();
  },
  'click #pause_story': function(event) {
    startDictation(event);
  },
  'click #skip': function(event) {
    skip(event);
  },
  'click #resume_story': function(event) {
    startDictation(event);
    resume(event);
  }
})

Template.soundselectstory.events({
  "submit #sound-select": function(event){
    event.preventDefault();
 
    Session.set("sound", event.target.sound.value);
    var newSound = Session.get("sound");

    var storyNum = event.target.story.value;
    storyEnd = false;

    switch(storyNum){
      case "1":
        Session.set("storyChosen",Phonetics.findOne({sound: newSound}).story1);
        break;
      case "2":
        Session.set("storyChosen",Phonetics.findOne({sound: newSound}).story2);
        break;
      default: // story 3
        Session.set("storyChosen",Phonetics.findOne({sound: newSound}).story3);
        break;
    }
    var newSentence1 = Session.get("storyChosen")[0];
    
    if (lastSound!=newSound || oldSentence1!=newSentence1){
      if (lastSound!=newSound){ // sound has changed
        console.log("CHANGING STORY SOUND... new sound = "+newSound);
      }
      if (oldSentence1!=newSentence1){ // story has changed
        console.log("CHANGING TO STORY #"+storyNum+", starting with '"+newSentence1+"'");
      }
      index = 0; wordNum = 0;
      getSent();
      lastSound = newSound;
      oldSentence1=newSentence1;
    }
  }
})