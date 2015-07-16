// Global router config
Router.configure({
	layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
  	console.log ("I am waiting");
    return Meteor.subscribe('thePhonetics');}
});

Router.route('/', {name: 'welcome'});
//Router.route('/workshop', {name: 'workshop'});

Router.route('/workshop', {name: 'workshop'}, {
  /*waitOn: function() {
  	//console.log("I am waiting!");
    return Meteor.subscribe('thePhonetics');
  },*/
  data: function () {
    return  Phonetics.findOne({sound: "R"}).words;
  }

});


Router.route('/game', {name: 'game'});
Router.route('/story', {name: 'story'});


Router.route('/profile',
	{name:'profile',
	data: function(){ 
		
		return Meteor.users.findOne({_id: Meteor.userId()}) // This is the data for the logged in user.
	}
});


Router.route('/profileEdit',
	{name:'profileEdit',
	data: function(){ return Meteor.users.findOne({_id:this.params._id})} // Not sure why this isn't the same as the returned user above.
});