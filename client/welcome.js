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
      }
  });