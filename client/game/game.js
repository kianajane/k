if(Meteor.isClient){
	
	// var gameboard = document.getElementById("gameboard");
	// var drawContext = null;
	var final_transcript = '';
	var interim_transcript = '';
	var confidence = null;
	var recognizing = false;
	var correctCounter = 0;
	var alive = false;
	var radius = 0;
	if (Session.get("sound")==undefined){
	  Session.set("sound", "L");
	}
	var lastSound = Session.get("sound");
	var wordList = [];
	var noWord = true;
	
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
	
	Template.score.helpers({
		
	});
	
	Template.game.helpers({
		word: Session.get("gameWord")
	});
	
	Template.game.events({
		"click #start": function(event){
			wordList = Phonetics.findOne({sound: lastSound}).words;
			if (noWord){
				getNewWord();
				$("#say_word").html("say: "+Session.get("gameWord"));
				noWord=false;
			}	
			start(event);
			$("#game_controls").html("<button class=\"btn btn-default\" type=\"submit\" id=\"pause\">Pause</button>");
		},
		"click #pause": function(event){
			stop(event);
			$("#game_controls").html("<button class=\"btn btn-default\" type=\"submit\" id=\"start\">Resume</button>");
		},
		"click #restart": function(event){
			enemyDrawn=false;
			start(event);
			$("#game_controls").html("<button class=\"btn btn-default\" type=\"submit\" id=\"pause\">Pause</button>");	
		}	
	});
	
	Template.game.rendered=function(){
			draw(0);
	};
	
	var running=false;
	var spriteDrawn = false;

/* -------------------------------------This is the code for getting the word to test----------------------------------------------*/
	
	function getNewWord(){
		theWord = wordList[Math.round(getRandomArbitrary(0,wordList.length-1))];
		console.log(theWord);
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
	      lastTime = (new Date()).getTime();
		  gameLoop();
	    };
	
	    recognition.onerror = function(event) {
	      console.log(event.error);
	    };
	
	    recognition.onend = function() {
	      $("#reco").html('<h2 class = "text-right" id = "mic">'+"Mic OFF".fontcolor("#FF7373")+'</h2>');
	      console.log("recognition stopped");
	      recognizing = false;
	    };
	
	    recognition.onresult = function(event) {
			myevent = event;
			console.log("result");

	      for (var i = event.resultIndex; i < event.results.length; ++i) {
			console.log("i="+i);
			confidence = Math.round(100*event.results[i][0].confidence);

	        if (event.results[i].isFinal) {
	        	final_transcript = event.results[i][0].transcript.trim();
	        	final_transcript = eachWord(final_transcript);
				console.log('final events.results['+i+'][0].transcript = '+ JSON.stringify(final_transcript)
						+ " --- " +JSON.stringify(confidence));
				if(final_transcript==theWord && confidence>60 && alive){
	         		correct();
			    }
	         } else {
	        	interim_transcript = event.results[i][0].transcript.trim();
	        	interim_transcript = eachWord(interim_transcript);
				console.log('interim events.results['+i+'][0].transcript = '+ JSON.stringify(interim_transcript)
						+ " --- " +JSON.stringify(confidence));
	         	if(interim_transcript==theWord && confidence>30 && alive){
	         		// add to history
					History.insert({userId: Meteor.userId(), mode: "game", sound: "N/A", word: theWord, time: new Date()});
	         		correct();
			    }
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
			document.getElementById("correct_counter").innerHTML = "<b>Number correct:</b> "+correctCounter;
			console.log("Congratulations! You said "+theWord+" correctly!\n");
			alive=false;
			// fireworks();
			running=false;
			next(event);
	    }
	
/* --------------------------------------------------------------------------------------------------------------------------------*/

		function start(event) {
			if (!running) {
				running=true;
		  		recognizing=true;
		 		final_transcript = '';
		 		interim_transcript = '';
				recognition.lang = 'en-US';
				recognition.start();
				drawSprite();
				gameLoop();
			}
		}
		
		function stop(event) {
			running=false;
			recognizing=false;
			recognition.stop();
			// console.log("now");
	       	return;
		}

		function next(event){
			getNewWord();
			$("#say_word").html("say: "+Session.get("gameWord"));
			if (!recognizing){
				start(event);
			}
			spriteDrawn=false;
			running=true;  		
			lastTime = (new Date()).getTime();
			gameLoop();
		}
	 
		function draw(dt){
			console.log("drawing board");
			drawContext = gameboard.getContext("2d");
			drawContext.fillStyle="#eee";
			drawContext.fillRect(0,0,gameboard.width,gameboard.height);
			drawContext.strokeStyle="#f00";
			drawSprite(dt);
			console.log("drawing sprite");
			// drawContext.strokeStyle=enemy.c;
			// drawContext.beginPath();
			// drawContext.arc(enemy.x,enemy.y,enemy.r,0,2*Math.PI,true);
			// drawContext.stroke();
		};
	
		
		function Sprite(url, pos, size, speed, frames, dir, once){
		    this.pos = pos;
		    this.size = size;
		    this.speed = typeof speed === 'number' ? speed : 0;
		    this.frames = frames;
		    this._index = 0;
		    this.url = url;
		    this.dir = dir || 'horizontal';
		    this.once = once;
		};
	
		function drawSprite(dt) {
			if (!spriteDrawn) {
				var player = { 
					sprite: new Sprite('/public/images/real_sp.png', [2,51], [50,43], 16, [0,1], 'vertical'),
					pos: [gameboard.width/2, gameboard.height]
				};
				spriteDrawn = true;
				alive = false;
			} else {
				console.log("updating sprite");
				player.sprite.update();
				console.log("redrawing sprite");
				player.sprite.drawSp();
			}
		};
		
		Sprite.prototype = {
			update: function(){
				if (this.pos[1] >= gameboard.height) {
					this.pos[1] = gameboard.height-this.pos[1];
					running=false;
					recognition.stop();
					alive=false;
				} else {
					this.pos[1] += 0.5;
				}
			},
			
			drawSp: function(){
				drawContext.drawImage(
					this.url,
					this.pos,
					this.size,
					this.speed,
					this.frames,
					this.dir
				);
			}
		};
	
		function gameLoop(){
			draw();
			if (running) window.requestAnimationFrame(gameLoop);
		}
	}
	
}