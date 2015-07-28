
Template.levels.helpers({
    departmentNums: function() {
      // Get all the departments and sort them ascending
      var everything = Phonetics.find({}, {sort: {level:1}}).fetch();
      // De-dupe list of departments
      var justLevels = _.pluck(everything,"level");
      return _.uniq(justLevels);
    }
  });

  Template.levels.events({
    "change .department-selection": function(e, t){
      return Session.set("level", $("[name=departmentNums]").val()); // use this for level select.
    }
  });

  Template.sounds.helpers({
    manufacturers: function() {
      // Find only manufacturers that have the same dept as the session and sort them ascending
      var everything = Phonetics.find({level: Session.get('level')}, {sort: {sound:1}}).fetch();
      // De-dupe list of manufactuerers
      var justSounds= _.pluck(everything, "sound");
      return _.uniq(justSounds);
    }
  });

  Template.sounds.events({
    "change .manufacturer-selection": function(e, t){
      return Session.set("sound", $("[name=manufacturerNums]").val()); // use this for sound select.
    }
  })

Template.soundselectworkshop.rendered = function() {
    currentSound = Session.get ("sound");
    console.log (currentSound);
    level = Phonetics.findOne({sound: currentSound}).level;
    console.log (level);
    Session.set("level", level);
}
/*
http://stackoverflow.com/questions/12124234/set-the-selected-item-in-a-select-list-based-on-template-value
  UI.registerHelper('selected', function(key, value){
       return Session.get(key) == value? {selected:'selected'}: '';
});*/