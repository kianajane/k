Template.profile.helpers({
	bio: function(){
		console.log("profile this = "+JSON.stringify(this));
		return this.profile.bio;
		},
	photo:function(){ // returns the URL of the gravatar photo for this email
		return  "images/face.png"} ///Gravatar.imageUrl(Gravatar.hash(this.emails[0].address,{secure:true}))}
})