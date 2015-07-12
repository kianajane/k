Template.soundselect.events({
	"submit #sound-select": function(event){
		event.preventDefault();
		
		if (Session.get("sound")==undefined){
			Session.set("sound", "L");
		}
		var lastSound = Session.get("sound");
		var soundSelected = event.target.sound.value;
		Session.set("sound",soundSelected);
		var newSound = Session.get("sound");
		if (lastSound!=newSound){
			console.log("CHANGING SOUND... new sound = "+newSound);
		}
	}	
})