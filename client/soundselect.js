
Template.levels.helpers({
    levelNums: function() {
      // Get all the levels and sort them ascending
      var everything = Phonetics.find({}, {sort: {level:1}}).fetch();
      // De-dupe list of levels
      var justLevels = _.pluck(everything,"level");
      return _.uniq(justLevels);
    }
  });

  Template.levels.events({
    "change .level-selection": function(e, t){
      return Session.set("level", $("[name=levelNums]").val()); // use this for level select.
    }
  });

  Template.sounds.helpers({
    sounds: function() {
      // Find only sounds that have the same dept as the session and sort them ascending
      var everything = Phonetics.find({level: Session.get('level')}, {sort: {sound:1}}).fetch();
      // De-dupe list of manufactuerers
      var justSounds= _.pluck(everything, "sound");
      return _.uniq(justSounds);
    }
  });

  Template.sounds.events({
    "change .sound-selection": function(e, t){
      return Session.set("sound", $("[name=soundNums]").val()); // use this for sound select.
    }
  })

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