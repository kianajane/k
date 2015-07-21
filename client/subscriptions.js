Meteor.subscribe("userData");
Meteor.subscribe("thePhonetics"); // All of our sound data, including words and the story.
Meteor.subscribe("theHistory"); // All of the history for every user.
Meteor.subscribe("theProgress"); // All sound/story/level progress for every user.

//Meteor.subscribe("theWords"); // Delete after July 20th if still unused.
Meteor.subscribe("theProfiles"); 