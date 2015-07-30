
Template.levels.helpers({
    levelChoice: function() {
      // Get all the levels and sort them ascending
      var everything = Phonetics.find({}, {sort: {level:1}}).fetch();
      // De-dupe list of levels
      var justLevels = _.uniq(_.pluck(everything,"level"));
      return justLevels;
    },
    currentLevel: function() {
      return Session.get("level");
    }
  });

  Template.levels.events({
    "change .level-selection": function(event){
      return Session.set("level", $("[name=levelSelect]").val()); // use this for level select.
    }
  });

Template.levelChoices.helpers({
    isCurrent: function () {
      if (this == Session.get("level")) {
         return 'selected';
      } else {
        return "";
    }
  }  
});

Template.soundChoices.helpers({
    isCurrent: function () {
      if (this == Session.get("sound")) {
         return 'selected';
      } else {
        return "";
    }
  }  
});


Template.sounds.helpers({
  sounds: function() {
    // Find only sounds that have the same dept as the session and sort them ascending
    var everything = Phonetics.find({level: Session.get("level")}, {sort: {sound:1}}).fetch();
    // De-dupe list of manufactuerers
    var justSounds = _.uniq(_.pluck(everything, "sound"));
    return justSounds;
  },
  currentSound: function() {
    return Session.get("sound");
  }
});
  

Template.dropdowns.helpers({
  isStory: function() {
    return Session.get("story");
  }
});

Template.soundselectworkshop.rendered = function() {
    currentSound = Session.get("sound");
    console.log(currentSound);
    level = Phonetics.findOne({sound: currentSound}).level;
    console.log(level);
    Session.set("level", level);
}

Template.soundselectgame.rendered = function() {
    currentSound = Session.get("sound");
    console.log(currentSound);
    level = Phonetics.findOne({sound: currentSound}).level;
    console.log(level);
    Session.set("level", level);
}

Template.soundselectstory.rendered = function() {
    currentSound = Session.get("sound");
    console.log(currentSound);
    level = Phonetics.findOne({sound: currentSound}).level;
    console.log(level);
    Session.set("level", level);
}


/*
http://stackoverflow.com/questions/12124234/set-the-selected-item-in-a-select-list-based-on-template-value
  UI.registerHelper('selected', function(key, value){
       return Session.get(key) == value? {selected:'selected'}: '';
});*/