if(Meteor.isClient){
	
	var final_transcript = '';
	var interim_transcript = '';
	var confidence = null;
	var recognizing = false;
	var words = ["time", "issue","year","side","people","kind","head","day","house","man","service","thing","friend","woman",
		"father","life","power","child","hour","world","game","school","line"];
	var correctCounter = 0;
	var alive = false;
	var radius = 0;
	// var wordCounter = 1;
	// var attempts = 0;
	
	Template.score.helpers({
		
	});
	
	Template.game.helpers({
		word: getNewWord()
	});
	
	Template.game.events({
		"click #start": function(event){
			start(event);
			$("#game_controls").html("<button class=\"btn btn-default\" type=\"submit\" id=\"pause\">Pause</button>");
		},
		"click #pause": function(event){
			stop(event);
			$("#game_controls").html("<button class=\"btn btn-default\" type=\"submit\" id=\"start\">Resume</button>");
		}
	});
	
	var running=false;
	var enemyDrawn = false;

/* -------------------------------------This is the code for getting the word to test----------------------------------------------*/
	
	function getNewWord(){
		theWord = words[Math.round(getRandomArbitrary(0,23))];
		console.log(theWord);
		return theWord;
	}

	function next(event){
		getNewWord();
		$("#say_word").html("say: "+theWord);
		enemyDrawn=false;
		radius += 5;
		// 	final_transcript = '';
		//  	interim_transcript = '';
		// 	recognition.start();
		// 	recognizing=true;
		// 	console.log("recognition started");
		// }
		// gameLoop();
		start(event);
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
			confidence = Math.round(100*event.results[i][0].confidence);

	        if (event.results[i].isFinal) {
	        	final_transcript = event.results[i][0].transcript.trim();
				console.log('final events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
	         } else {
	        	interim_transcript = event.results[i][0].transcript.trim();
				console.log('interim events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
	         	if(interim_transcript.includes(theWord) && confidence>60 && alive){
					// recognition.stop();
					// recognizing=false;
					// console.log("recognition stopped");
					correctCounter++;
					document.getElementById("correct_counter").innerHTML = "<b>Number correct:</b> "+correctCounter;
					console.log("Congratulations! You said "+theWord+" correctly!\n");
					 			// You have now said "+correctCounter+" word(s) correctly");
					alive=false;
					running=false;
					// fireworks();
					stop(event);
					console.log("recognition stopped: "+recognizing);
					next(event);
			    }
	         }
	      }
	    }	
	
/* --------------------------------------------------------------------------------------------------------------------------------*/
	Template.game.rendered=function(){
		draw(0);
	}

	function start(event) {
		if (!running) {
			running=true;
	  		recognizing=true;
	 		final_transcript = '';
	 		interim_transcript = '';
			recognition.lang = 'en-US';
			recognition.start();
			lastTime = (new Date()).getTime();
			gameLoop();
		}
	}
	
	function stop(event) {
		running=false;
		recognizing=false;
		recognition.stop();
       	return;
	}
	
	function draw(dt){
		// console.log("drawing board");
		var drawContext = gameboard.getContext("2d");
		drawContext.fillStyle="#eee";
		drawContext.fillRect(0,0,gameboard.width,gameboard.height);
		drawContext.strokeStyle="#f00";
		drawEnemy(dt);
		// console.log("drawing enemy");
		drawContext.strokeStyle=enemy.c;
		drawContext.beginPath();
		drawContext.arc(enemy.x,enemy.y,enemy.r,0,2*Math.PI,true);
		drawContext.stroke();
	};

	
	function Enemy(x,y,r,v,c){
		this.x=x;
		this.y=y;
		this.r=r;
		this.v=v;
		this.c=c;
		alive=true;
	}

	var drawEnemy = function(dt) {
		if (!enemyDrawn) {
			this.enemy = new Enemy(gameboard.width/2,20,20+radius,50,"black");
			enemyDrawn=true;
		} else {
			this.enemy.update(dt/1000.0);
		}
	};
	
	Enemy.prototype.update = function(dt){
		// console.log("update");
		if (this.y + this.r >= gameboard.height) {
			this.y = gameboard.height-this.r;
			running=false;
			recognition.stop();
			recognizing=false;
			alive=false;
		} else {
			this.y += this.v*dt;
		}
	};

	function gameLoop(){
		// console.log("game loop");
		var theTime = (new Date()).getTime();
		var dt = theTime - lastTime;  // in milliseconds
		lastTime = theTime;
		draw(dt);
		if (running) window.requestAnimationFrame(gameLoop);
	}
}
}