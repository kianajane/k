if(Meteor.isClient){
	
	// Chooses an initial sound
	Template.game.rendered=function(){
		if (recognizing) recognition.stop();
		draw();
		i=0;
		x=0.2;
		correctCounter=0;
		$("#game_counter").html("<b>Score:</b> "+correctCounter);
		if (lastSound!=Session.get("sound")) resetIndex = true;
		wordList = Phonetics.findOne({sound: Session.get("sound")}).words;
		theWord = getWord();
		Session.set("gameWord",theWord);
		$("#say").html(Session.get("gameWord"));
		Session.set("story",false);
	}

	var i = 0;
	var x = 0.2;
	var wordList=[];
	var theWord;
	var resetIndex = false;
	var attemptedWords = [];
	var final_transcript = '';
	var interim_transcript = '';
	var confidence = null;
	var recognizing = false;
	var correctCounter = 0;
	var skipped = false;
	var stopped = false;
	var counter = 0;
	
	if (Session.get("sound")==undefined){
	  Session.set("sound", "L");
	}
	var lastSound = Session.get("sound");
	
	Template.score.helpers({
		correct: correctCounter
	});

	Template.game.helpers({
		word: Session.get("gameWord")
	});
	
	Template.game.events({
		"click #start": function(event){
			start(event);
			$("#game_controls").html("<button class=\"btn btn-raised\" type=\"submit\" id=\"pause\">Pause</button>");
		},
		"click #pause": function(event){
			stop(event);
			$("#game_controls").html("<button class=\"btn btn-raised\" type=\"submit\" id=\"start\">Resume</button>");
		},
		"click #restart": function(event){
			$("#say").html(Session.get("gameWord"));
			drawContext.restore();
			drawContext.clearRect(0,0,gameboard.width,gameboard.height);
			console.log("canvas context restored and cleared");
			i=0;
			x=0.2;
			correctCounter=0;
			draw();
			$("#game_counter").html("<b>Score:</b> "+correctCounter);
			start(event);
			$("#game_controls").html("<button class=\"btn btn-raised\" type=\"submit\" id=\"pause\">Pause</button>");	
		}	
	});
	
	Template.soundselectgame.events({
		"submit #sound-select": function(event){
		    event.preventDefault();

		    Session.set("sound", event.target.sound.value);
		    var newSound = Session.get("sound");
		    
		    if (lastSound!=newSound){
		      console.log("CHANGING GAME SOUND... new sound = "+newSound);
		      wordList = Phonetics.findOne({sound: newSound}).words;
		      $("#game_controls").html("<button class=\"btn btn-raised\" type=\"submit\" id=\"pause\">Pause</button>");
		      resetIndex = true;
			  attemptedWords = [];
		      next(event);
		      lastSound=newSound;
		    }
	  	} 
	});
	
	var running=false;	
	
	function getNewWord(){ // gets a word that has not already been completed.
		theWord = getWord();
		console.log("next game word: "+theWord);
		Session.set("gameWord", theWord);
	}

	function getWord(){
	// Get all unique finished words: 
		correctWords =_.uniq(_.pluck( History.find({userId: Meteor.userId(), mode: "game", sound: Session.get("sound"), correct: true}).fetch(), 'word'));
		console.log("attempted words: "+attemptedWords);

		// start searching the list at the correct index
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
		$("#say").html('<div class="alert alert-success" role="alert" id="endSound"> <strong>Congratulations!</strong> You finished all words on this sound! <br> Your other options are: <br> 1. Select another sound on the left <br> 2. Go to another mode. <br> <center> <a class = "btn btn-default btn-raised" href="/workshop">Workshop</a> <a class = "btn btn-default btn-raised" href="/story">Story</a> </center> </div>');
		return wordList[0];
	}

	if ('webkitSpeechRecognition' in window) {
		console.log("webkit is available!");
		var recognition = new webkitSpeechRecognition();
	    recognition.continuous = true;
	    recognition.interimResults = true;
	
	    recognition.onstart = function() {
	   	  $("#reco").html('<h2 class = "text-right" id = "mic">'+"Mic ON".fontcolor("#65D6A3")+'</h2>');	 
	      console.log("recognition started");    
	      recognizing = true;
	      if(!running) running=true;
	      lastTime = (new Date()).getTime();
		  gameLoop();
	    };
	
	    recognition.onerror = function(event) {
	      console.log(event.error);
	    };
	
	    recognition.onend = function() {
	      $("#reco").html('<h2 class = "text-right" id = "mic">'+"Mic OFF".fontcolor("#E2646B")+'</h2>');
	      recognizing = false;
	    };
	
	    recognition.onresult = function(event) {
			myevent = event;

	      for (var i = event.resultIndex; i < event.results.length; ++i) {
			console.log("i="+i);
			confidence = Math.round(100*event.results[i][0].confidence);

	        if (event.results[i].isFinal) {
	        	final_transcript = event.results[i][0].transcript.trim();
	        	final_transcript = eachWord(final_transcript);
				console.log('final events.results['+i+'][0].transcript = '+ JSON.stringify(final_transcript)
						+ " --- " +JSON.stringify(confidence));
				if(final_transcript==Session.get("gameWord").toLowerCase() && confidence>50){
					console.log("test for word: "+Session.get("gameWord"));
	         		correct();
			    }
	         } else {
	        	interim_transcript = event.results[i][0].transcript.trim();
	        	interim_transcript = eachWord(interim_transcript);
				console.log('interim events.results['+i+'][0].transcript = '+ JSON.stringify(interim_transcript)
						+ " --- " +JSON.stringify(confidence));
	         	if(interim_transcript==Session.get("gameWord").toLowerCase() && confidence>30){
	         		// add to history
					console.log("test for word: "+Session.get("gameWord"));
					History.insert({userId: Meteor.userId(), mode: "game", sound: Session.get("sound"), word: theWord, time: new Date(), correct: true});
	         		correct();
				}
	         }

	         //Voice commands: pass, stop, site nav
			 if (interim_transcript.includes("pass")) {
			 	History.insert({userId: Meteor.userId(), mode: "game", sound: Session.get("sound"), word: theWord, time: new Date(), correct: false});
			 	skipped=true;
			 	attemptedWords.push(theWord); // adds this word to the list of attempted words
				next(event);
			 } else if (interim_transcript.includes("stop")) {
				stopped=true;
				stop(event);
				$("#game_controls").html("<button class=\"btn btn-raised\" type=\"submit\" id=\"start\">Resume</button>");
			 } else if (interim_transcript.includes("workshop")) { //goes to workshop
				window.location.replace("/workshop");
			 } else if (interim_transcript.includes("story")) {  //goes to story
				window.location.replace("/story");
			 } else if  (interim_transcript.includes("profile")) { //goes to profile
				window.location.replace("/profile");
			 }

	         function eachWord(transcript) {
		         var current_result = transcript;
		         var index = current_result.lastIndexOf(" ");
		         if (index>0){
		         	current_result = current_result.substring(index+1);
		         	console.log('full transcript = "'+transcript+'"');
		         }
		         return current_result.toLowerCase();
	         }
	         
	      }
	    }

		//if called, updates counter, plays correct sound, resets necessary booleans and increments speed, calls next(event)
	    function correct() {
			correctCounter++;
			corrSfx.play()
	          .fadeIn()
	          .bind( "timeupdate", function() {
	             var timer = buzz.toTimer( this.getTime() );
	          });
			$("#game_counter").html("<b>Score:</b> "+correctCounter);
			running=false;
			x+=0.025;
			next(event);
	    }
	
	
	//starts recognition
		function start(event) {
			if (!running) {
		 		final_transcript = '';
		 		interim_transcript = '';
				recognition.lang = 'en-US';
				recognition.start();
			}
		}
		
		//stops recognition, sets running to false
		function stop(event) {
			if (stopped) {
				stopped=false;
			}
			running=false;
			recognizing=false;
			recognition.stop();
	       	return;
		}

		//gets next word, resets turtle position, restores and redraws canvas, calls game loop
		function next(event){
			getNewWord();
			i=0;
			$("#say").html(Session.get("gameWord"));
			if (!recognizing){
				start(event);
			} else {
				running=true;
			}
			lastTime = (new Date()).getTime();
			drawContext.restore();
			drawContext.clearRect(0,0,gameboard.width,gameboard.height);
			draw();
			gameLoop();
		}
		
		//creates backgroung image
		var background = new Image();
		background.src = 'images/fullbackground.png';
		//creates dummy turtle image
		var turtle = new Image();	
		turtle.src = 'images/turtle.png';
		//creates turtle1 image
		var turtle1 = new Image();
		turtle1.src = 'images/turtle.png';
		//creates turtle2 image
		var turtle2 = new Image();
		turtle2.src = 'images/turtle2.png';
		//creates bush image
		var bush = new Image();
		bush.src = 'images/bush.png';
		
		//creates and draws pattern from background, saves canvas, draws turtle 
		function draw(){
			drawContext = gameboard.getContext("2d");
	
			pat = drawContext.createPattern(background,"repeat-x");
			drawContext.fillStyle=pat;
			drawContext.fillRect(0,0,gameboard.width,gameboard.height);
			
			drawContext.save();
			
			drawContext.drawImage(turtle,0,91);
			drawContext.drawImage(bush,968,91);
		}
	
		//checks turtle position. if at end of screen, ends game, adds incorrectness to history. else, calls moveRight(dt)
		function moveTurtle(dt){
			if(i+132 >= gameboard.width){
				running=false;
				recognition.stop();
				recognizing=false;
				History.insert({
					userId: Meteor.userId(),
					mode: "game",
					sound: Session.get("sound"),
					word: theWord, time: new Date(),
					correct: false
				});	
				$("#game_controls").html("<button class=\"btn btn-raised\" type=\"submit\" id=\"restart\">Restart</button>");
			} else {
				moveRight(dt);
			}
		};
		
		//moves the turtle right by a function of time passed (to regulate animation speed), animates legs
		function moveRight(dt){
			counter++;
			switch (counter%16){
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
					turtle=turtle2;
					break;
				default:
					turtle=turtle1;
					break;
			}
			i+=x*dt;
			drawContext.clearRect(0,0,gameboard.width,gameboard.height);
			drawContext.fillRect(0,0,gameboard.width,gameboard.height);
			drawContext.fillStyle=pat;
			drawContext.drawImage(bush,968,91);
			drawContext.drawImage(turtle,i,91);
		}

		//calculates dt for speed regulation, calls moveTurtle(dt), requests animation frame if running
		function gameLoop(){
			var theTime = (new Date()).getTime();
			var dt = theTime - lastTime;  // in milliseconds
			lastTime = theTime;
			moveTurtle(dt);
			if (running) window.requestAnimationFrame(gameLoop);
		}
	}
};	
