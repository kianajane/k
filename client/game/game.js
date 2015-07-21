if(Meteor.isClient){

	// Chooses an initial sound
	Template.game.rendered=function(){
		draw();
		wordList = Phonetics.findOne({sound: Session.get("sound")}).words;
		getNewWord();
		$("#say_word").html("say: "+Session.get("gameWord"));
	}

	var i = 0;
	var wordList=[];
	var final_transcript = '';
	var interim_transcript = '';
	var confidence = null;
	var recognizing = false;
	var correctCounter = 0;
	var alive = true;
	var radius = 0;
	var skipped = false;
	var stopped = false;
	if (Session.get("sound")==undefined){
	  Session.set("sound", "L");
	}
	lastSound = Session.get("sound");
	
	Template.score.helpers({
		
	});
	
	Template.game.helpers({
		word: Session.get("gameWord")
	});
	
	Template.game.events({
		"click #start": function(event){
			start(event);
			$("#game_controls").html("<button class=\"btn btn-default\" type=\"submit\" id=\"pause\">Pause</button>");
		},
		"click #pause": function(event){
			stop(event);
			$("#game_controls").html("<button class=\"btn btn-default\" type=\"submit\" id=\"start\">Resume</button>");
		},
		"click #restart": function(event){
			$("#gamearea").html('<canvas id="gameboard" width="1135" height = "500"></canvas>');
			start(event);
			$("#game_controls").html("<button class=\"btn btn-default\" type=\"submit\" id=\"pause\">Pause</button>");	
		}	
	});
	
	Template.soundselectgame.events({
		"submit #sound-select": function(event){
		    event.preventDefault();
		
		    var soundSelected = event.target.sound.value;
		    Session.set("sound",soundSelected);
		    var newSound = Session.get("sound");
		    if (lastSound!=newSound){
		      console.log("CHANGING GAME SOUND... new sound = "+newSound);
		      wordList = Phonetics.findOne({sound: newSound}).words;
		      $("#game_controls").html("<button class=\"btn btn-default\" type=\"submit\" id=\"pause\">Pause</button>");
		      next(event);
		      lastSound=newSound;
		    }
	  	} 
	});
	
	var running=false;

/* -------------------------------------This is the code for getting the word to test----------------------------------------------*/
	
	function getNewWord(){
		theWord = wordList[Math.round(getRandomArbitrary(0,wordList.length-1))];
		console.log("getting word: "+theWord);
		Session.set("gameWord",theWord);
	}
	
	function getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}
	
	if ('webkitSpeechRecognition' in window) {
		console.log("webkit is available!");
		var recognition = new webkitSpeechRecognition();
	    recognition.continuous = true;
	    recognition.interimResults = true;
	
	    recognition.onstart = function() {
	   	  $("#reco").html('<h2 class = "text-right" id = "mic">'+"Mic ON".fontcolor("#7fe508")+'</h2>');	 
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
	      $("#reco").html('<h2 class = "text-right" id = "mic">'+"Mic OFF".fontcolor("#FF7373")+'</h2>');
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
				if(final_transcript==Session.get("gameWord") && confidence>60 && alive){
					console.log("test for word: "+Session.get("gameWord"));
	         		correct();
			    }
	         } else {
	        	interim_transcript = event.results[i][0].transcript.trim();
	        	interim_transcript = eachWord(interim_transcript);
				console.log('interim events.results['+i+'][0].transcript = '+ JSON.stringify(interim_transcript)
						+ " --- " +JSON.stringify(confidence));
	         	if(interim_transcript==Session.get("gameWord") && confidence>30 && alive){
	         		// add to history
					console.log("test for word: "+Session.get("gameWord"));
					History.insert({userId: Meteor.userId(), mode: "game", sound: Session.get("sound"), word: theWord, time: new Date()});
	         		correct();
				}
	         }

	         //Voice commands: skip (doesnt work), pause, site nav
			 if (final_transcript.includes("skip" || "pass")) {
			 	skipped=true;
				next(event);
			 } else if (interim_transcript.includes("stop")) {
				stopped=true;
				stop(event);
			 } else if (interim_transcript.includes("workshop")) { //goes to story
				window.location.replace("/workshop");
			 } else if (interim_transcript.includes("game")) {  //goes to game
				window.location.replace("/game");
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

	    function correct() {
			correctCounter++;
			corrSfx.play()
	          .fadeIn()
	          .bind( "timeupdate", function() {
	             var timer = buzz.toTimer( this.getTime() );
	          });
			document.getElementById("correct_counter").innerHTML = "<b>Number correct:</b> "+correctCounter;
			console.log("Congratulations! You said "+theWord+" correctly!\n");
			alive=false;
			running=false;
			next(event);
	    }
	
/* --------------------------------------------------------------------------------------------------------------------------------*/
		function start(event) {
			if (!running) {
		 		final_transcript = '';
		 		interim_transcript = '';
				recognition.lang = 'en-US';
				recognition.start();
			}
		}
		
		function stop(event) {
			if (stopped) {
				$("#game_controls").html("<button class=\"btn btn-default\" type=\"submit\" id=\"start\">Resume</button>");
				stopped=false;
			}
			running=false;
			recognizing=false;
			recognition.stop();
			// console.log("now");
	       	return;
		}

		function next(event){
			getNewWord();
			i=0;
			alive=true;
			$("#say_word").html("say: "+Session.get("gameWord"));
			if (!recognizing){
				start(event);
			} else {
				running=true;
			}
			// if (!skipped) {
			// 	radius += 5;
			// } else {
			// 	skipped=false;
			// }
			lastTime = (new Date()).getTime();
			drawContext.restore();
			drawContext.clearRect(0,0,gameboard.width,gameboard.height);
			console.log("canvas context restored and cleared");
			draw();
			gameLoop();
		}
		
		function draw(){
			console.log("drawing board");
			
			drawContext = gameboard.getContext("2d");
			drawContext.fillStyle='#ffffff';
			drawContext.fillRect(0,0,gameboard.width,gameboard.height);
			drawContext.strokeStyle="#f00";
			
			turtle = new Image();
			console.log("image created");	
			turtle.src = 'images/turtle.png';
			console.log("image sourced");
			drawContext.drawImage(turtle,0,90);
			console.log("image drawn");
			
			drawContext.save();
			console.log("canvas context saved");
		}
	
		function moveTurtle(){
			if(i+50 >= gameboard.width){
				running=false;
				recognition.stop();
				recognizing=false;
				alive=false;
				console.log("you hit the end!");
				//$("#gamearea").html("<img src = \"images/answer_try_again.jpg\" width = \"50%\" alt = \"game over\">");
				$("#game_controls").html("<button class=\"btn btn-default\" type=\"submit\" id=\"restart\">Restart</button>");
			} else {
				moveRight();
				i++;
			}
		};
		
		function moveRight(){
			drawContext.clearRect(0,0,gameboard.width,gameboard.height);
			drawContext.fillStyle='#ffffff';
			drawContext.fillRect(0,0,gameboard.width,gameboard.height);
			drawContext.translate(1,0);
			drawContext.drawImage(turtle,0,90);
		}

		function gameLoop(){
			// console.log("game loop");
			var theTime = (new Date()).getTime();
			var dt = theTime - lastTime;  // in milliseconds
			lastTime = theTime;
			moveTurtle();
			if (running) window.requestAnimationFrame(gameLoop);
		}
	}
};	
