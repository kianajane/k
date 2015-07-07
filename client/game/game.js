if(Meteor.isClient){
	
	var final_transcript = '';
	var interim_transcript = '';
	var confidence = null;
	var recognizing = false;
	var words = ["time", "issue","year","side","people","kind","way","head","day","house","man","service","thing","friend","woman",
		"father","life","power","child","hour","world","game","school","line"];
	var correct=false;
	var correctCounter = 0;
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
		theWord = words[Math.round(getRandomArbitrary(0,24))];
		console.log(theWord);
		return theWord;
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
	      var interim_transcript = '';
	      for (var i = event.resultIndex; i < event.results.length; ++i) {
			console.log("i="+i);
			confidence = Math.round(100*event.results[i][0].confidence);

	        if (event.results[i].isFinal) {
	        	final_transcript += event.results[i][0].transcript.trim();
				console.log('final events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
	         } else {
	        	interim_transcript += event.results[i][0].transcript.trim();
				console.log('interim events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
	         	if(interim_transcript.includes(theWord) && confidence>60){
					correct=true;
					correctCounter++;
					document.getElementById("correct_counter").innerHTML = "<b>Number correct:</b> "+correctCounter;
					console.log("Congratulations! You said "+theWord+" correctly!\n");
					 			// You have now said "+correctCounter+" word(s) correctly");
					this.alive=false;
					running=false;
					recognition.stop();
			    }
	         }
	      }
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
			drawEnemy();
			gameLoop();
		}
	}
	
	function stop(event) {
		running=false;
		recognizing=false;
		recognition.stop();
       	return;
	}
	
	function draw(){
		// console.log("drawing board");
		var drawContext = gameboard.getContext("2d");
		drawContext.fillStyle="#eee";
		drawContext.fillRect(0,0,gameboard.width,gameboard.height);
		drawContext.strokeStyle="#f00";
		drawEnemy();
		// console.log("drawing enemy");
		drawContext.strokeStyle=enemy.c;
		drawContext.beginPath();
		drawContext.arc(enemy.x,enemy.y,enemy.r,0,2*Math.PI,true);
		drawContext.stroke();
	};

	
	function Enemy(x,y,r,c){
		this.x=x;
		this.y=y;
		this.r=r;
		this.c=c;
		this.alive = true;
	}

	var drawEnemy = function() {
		if (!enemyDrawn) {
			this.enemy = new Enemy(gameboard.width/2,20,20,"black");
			enemyDrawn=true;
		} else {
			this.enemy.update();
		}
	};
	
	Enemy.prototype.update = function(){
		// console.log("update");
		if (this.y + this.r >= gameboard.height) {
			this.y = gameboard.height-this.r;
			running=false;
			this.alive=false;
		} else {
			this.y += 0.2;
		}
	};

	function gameLoop(){
		// console.log("game loop");
		draw();
		if (running) window.requestAnimationFrame(gameLoop);
	}
}
}