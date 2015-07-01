if(Meteor.isClient){
	
	var final_transcript = '';
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
		}
	});
	
	var running=false;
	var enemyDrawn = false;
	
	function draw(){
		console.log("drawing board");
		var drawContext = gameboard.getContext("2d");
		drawContext.fillStyle="#eee";
		drawContext.fillRect(0,0,gameboard.width,gameboard.height);
		drawContext.strokeStyle="#f00";
		drawEnemy();
		console.log("drawing enemy");
		drawContext.strokeStyle=enemy.c;
		drawContext.beginPath();
		drawContext.arc(enemy.x,enemy.y,enemy.r,0,2*Math.PI,true);
		drawContext.stroke();
	};

	function getNewWord(){
		theWord = words[Math.round(getRandomArbitrary(0,24))];
		console.log(theWord);
		return theWord;
	}
	
	function getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}
	
	function start(event) {
		if (!running) {
			running=true;
	  		recognizing=true;
	 		final_transcript = '';
			recognition.lang = 'en-US';
			recognition.start();
			drawEnemy();
			gameLoop();
		} else {
			running=false;
			recognizing=false;
			recognition.stop();
	       	return;
		}
	}
	
	if ('webkitSpeechRecognition' in window) {
		console.log("webkit is available!");
		var recognition = new webkitSpeechRecognition();
	    recognition.continuous = true;
	    recognition.interimResults = false;
	
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
	
	        if (event.results[i].isFinal) {
	        	confidence = Math.round(100*event.results[i][0].confidence);
	        	final_transcript += event.results[i][0].transcript.trim();
				console.log('final events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
	         }
	      }
	
	      //final_span.innerHTML = linebreak("You said \""+final_transcript+"\" with a recorded accuracy of "+confidence+"%");
	      //interim_span.innerHTML = linebreak(interim_transcript);
	      if (final_transcript.includes(theWord) && confidence>60) {
	      	correct=true;
	      } 
	      counter(correct);
		  
		  // if(final_transcript.includes(theWord) && confidence>60){
			//   alert("Congratulations! You said the word correctly on your "+attempts+" attempt!\n You have now said "+correctCounter+" word(s) correctly out of "+wordCounter+" words.");
			//   changeWord(event);
		  // } else {
			//   alert("Sorry, I didn't quite catch that...");
		  // }
		  document.getElementById("correct_counter").innerHTML = "<b>Number correct:</b> "+correctCounter;
		  
	    };
	}
	
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
	}
	
	Enemy.prototype.update = function(){
		console.log("update");
		// if (this.y - this.r >= gameboard.height) {
		// 	running=false;
		// 	this.alive=false;
		// } else {
			this.y += 20;
		// }
	};

	function gameLoop(){
		console.log("game loop");
		draw();
		if (running) window.requestAnimationFrame(gameLoop);
	}
}