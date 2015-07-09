Template.people.helpers({
	//profiles: function(){ return Meteor.users.find({});},
	myProfile: function() {return Meteor.users.find({_id: Meteor.userId()})}, // grabs only the current user

	photo2:function(){
		console.log(this.emails[0].address);
		return "http://www.cs.brandeis.edu//~tim/hickey-apr08.gif"},
	photo:function(){
		console.log(this.emails[0]);
		return "images/face.png"}//Gravatar.imageUrl(
			//Gravatar.hash(
				//this.emails[0].address,
				//{secure:true}))}
})

Template.people.events({
	"click .profile-photo": function(event){
		console.log(event.target);
		console.log(this);
	}
})