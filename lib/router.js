
Router.configure({
	layoutTemplate: 'layout',
	//loadingTemplate: 'loading',
	//waitOn: function() {return true;}   // later we'll add more interesting things here .... 
});

Router.route('/', {name: 'welcome'});
Router.route('/workshop', {name: 'workshop'});

Router.route('/game', {name: 'game'});

Router.route('/story', {name: 'story'});

//Router.route('/profile', {name: 'profile'});


Router.route('/people',{name:'people'});
Router.route('/profile/:_id',
	{name:'profile',
	data: function(){ 
		
		return Meteor.users.findOne({_id:this.params._id})
	}
});


Router.route('/profileEdit/:_id',
	{name:'profileEdit',
	data: function(){ return Meteor.users.findOne({_id:this.params._id})}
});