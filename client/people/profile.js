Template.profile.helpers({
	ownPost:function(){ // returns true if the logged in user owns the profile being viewed
		console.log(this._id);
		console.log(Meteor.userId());
		return (this._id == Meteor.userId());},
	bio: function(){
		console.log("profile this = "+JSON.stringify(this));
		return this.profile.bio;
		},
	photo:function(){ // returns the URL of the gravatar photo for this email
		return  "images/face.png"} ///Gravatar.imageUrl(Gravatar.hash(this.emails[0].address,{secure:true}))}
})