// Code mostly from http://blog.benmcmahen.com/post/41741539120/building-a-customized-accounts-ui-for-meteor

Template.welcome.rendered = function(){
  if (recognizing) recognition.stop();
}

Session.set("login",true); // Login mode

// Login form
Template.login.events({

    'submit #login_form': function(event){
      event.preventDefault();

      var email = event.target.email.value;
      var password = event.target.password.value;

      // Login and resets the home page.
      Meteor.loginWithPassword(email, password, function(err){
        if (err){
          $("#mssg").html("Invalid username or password");
        } else {
          Router.go('/');
        }
      });
      return false; 
    },

    // New user gets the create account mode, not the login mode.
    'click #new_user': function(event){
      Session.set("login",false);
    }
});

// Form submissions
Template.register.events({

    // New account
    'submit #register_form': function(event){
      event.preventDefault();
      // Save variab.es
      var email = event.target.email.value;
      var password = event.target.password.value;
      var password2 = event.target.password2.value;
      if (password!=password2){
        $("#mssg").html("Passwords do not match, try again");
        return;
      }
      
      // Create the actual account. 
      Accounts.createUser({email: email, password: password}, function(err){
        if (err){
          $("#mssg").html("Account creation failed");
        } else {
          Session.set("login",true);
          Router.go('/profileEdit'); // Routes you to ProfileEdit, so hopefully the user will enter a name, etc.
        }
      });
      return false; 
    },

    // Returns to login mode. 
    'click #signin': function(event){
      Session.set("login",true);
    }
});

Template.welcome.helpers({
  // Returns the current users profile.
  profile: function(){ 
    return Meteor.users.findOne({_id: Meteor.userId()}).profile
  },

  // Login mode or account creation mode
  existingUser: function(){
    return Session.get("login");
  },

  last: function() {
    return History.findOne({userId: Meteor.userId()},{sort:{time:-1}});;
  },

  yesData: function() {
    return !(History.findOne({userId: Meteor.userId()}) == undefined);
  }
});

Template.welcome.events({
  'click #continue': function(event){
    console.log("continue");
    var lastEntry = History.findOne({userId: Meteor.userId()},{sort:{time:-1}});
    Session.set("sound",lastEntry.sound);
    Router.go("/"+lastEntry.mode);
  }
})