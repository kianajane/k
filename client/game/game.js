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
	
	function draw(){
		var drawContext = gameboard.getContext("2d");
		drawContext.fillStyle="#eee";
		drawContext.fillRect(0,0,gameboard.width,gameboard.height);
		drawContext.strokeStyle="#f00";
	}
	
	Template.score.helpers({
		
	})
	
	Template.game.events({
		"click #start": function(event){
			startDictation(event);
		}
	});
	
	function startDictation(event) {
	  recognizing=true;
	  final_transcript = '';
	  recognition.lang = 'en-US';
	  recognition.start();
	  //final_span.innerHTML = '';
	  //interim_span.innerHTML = "I'm listening...";
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
	
	function Enemy(x,y,r,c,vx,vy){
		this.x=x;
		this.y=y;
		this.r=r;
		this.c=c;
		this.vx=vx;
		this.vy=vy;
		this.alive = true;
	}
	
	Enemy.prototype.update = function(dt){
		if ((this.y + this.r >= 100) || (this.y - this.r <= 0)) this.vy *= -1;
		if ((this.x + this.r >= 100 )|| (this.x - this.r <= 0)) this.vx *= -1;
		this.x += this.vx*dt;
		this.y += this.vy*dt;
	};
	
	theEnemy = new Enemy(50,50,5,"black",10,-5);
	
	
}