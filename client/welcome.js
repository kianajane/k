r = true;

Template.login.events({

    'submit #login_form': function(event){
      event.preventDefault();

      var email = event.target.email.value;
      var password = event.target.password.value;

      Meteor.loginWithPassword(email, password, function(err){
        if (err){
          $("#mssg").html("Error... login failed")
        } else {
          Router.go('/');
        }
      });
      return false; 
    },
    'click #new_user': function(event){
      r = false;
    }
});

Template.register.events({

    'submit #register_form': function(event){
      event.preventDefault();

      var email = event.target.email.value;
      var password = event.target.password.value;
      var password2 = event.target.password2.value;
      if (password!=password2){
        $("#mssg").html("Passwords do not match, try again")
      }
      
      Accounts.createUser({email: email, password: password}, function(err){
        if (err){
          $("#mssg").html("Account creation failed")
        } else {
          Router.go('/profileEdit');
        }
      });
      return false; 
    }
});

Template.welcome.helpers({
  profile: function(){ 
    return Meteor.users.findOne({_id: Meteor.userId()}).profile
  },
  existingUser: r
})