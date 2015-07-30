
Template.profileEdit.helpers({
	myEmail: function(){
		return this.emails[0].address;
	},
	profile: function(){ 
    	return Meteor.users.findOne({_id: Meteor.userId()}).profile;
    }
})

// Profile Edit submit form.
Template.profileEdit.events({
	"submit #profile-edit-form": function(event){
		event.preventDefault();
		var bio = event.target.bio.value;
		var firstName = event.target.firstName.value;
		var lastName = event.target.lastName.value;
		var userName = event.target.userName.value;

		// Update the meteor user.
		Meteor.users.update(Meteor.userId(),
			{$set:{'profile.bio':bio, 
					'profile.firstName':firstName, 
					'profile.lastName':lastName,
					'profile.userName':userName}});
		Router.go('/');
		
	}
});