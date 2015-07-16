Template.profile.helpers({
	bio: function(){
		console.log("profile this = "+JSON.stringify(this));
		return this.profile.bio;
		},

    // I have replaced all of the photos with a stock photo, we may want to change that later.
	photo:function(){ // returns the URL of the gravatar photo for this email
		return  "images/face.png"
        }, ///Gravatar.imageUrl(Gravatar.hash(this.emails[0].address,{secure:true}))}

	myHistory: function() {
		return History.find({userId: Meteor.userId()}).fetch();
        },

    // This doesn't work and I don't know why!?!?!!?
    'click #clearHistory': function(event){    
        console.log ("you've pressed clear!");
        History.remove({userId: Meteor.userId()});
        return;
        }
})


// Call the function to built the chart when the template is rendered
Template.profile.rendered = function() {    
    builtColumn();
}

//Function to draw the column chart
function builtColumn() 
{

    // GAME DATA
    history = History.find({userId: Meteor.userId(), mode: "game"}).fetch(); // Returns the array of the objects of that user's game history.

    history2 = History.find({userId: Meteor.userId(), mode: "game"}).fetch();
    counts = _.countBy(history2, function(obj) {
        return obj.time.toDateString(); }); // Returns the array of counts in the format: [June 06: 3, June 10: 11], etc.
   
    gameData = _.map(counts, function(num, key){ return num;}); // Pulls out only the counts, returns an array [3, 11], etc.
    gameDates = _.map(counts, function(num, key){ return key;});

    workshopData = _.map(_.countBy(History.find({userId: Meteor.userId(), mode: "workshop"}).fetch(), function(obj) {
                        return obj.time.toDateString();
                        })
                        , function(num, key) {return num;});

    workshopData = _.map(_.countBy(History.find({userId: Meteor.userId(), mode: "story"}).fetch(), function(obj) {
                        return obj.time.toDateString();
                        })
                        , function(num, key) {return num;});



    // We love Underscorejs.org!
    //Not quite working.
/*
    I want to have the zeros for the days that you haven't done anything.
    So.... 
    I want the counts of times for each mode for every day.

    Do I have to fill in zeros for any mode that doesn't have it??

    First do counts for each mode.

    Iterate through every date that we have from the original array.
*/
    // For some reason this isnt' working???
    history3 = History.find({userId: Meteor.userId()}, {'time': 1, 'word': 1}).fetch();
       // _.pluck(stooges, 'name');
//=> ["moe", "larry", "curly"]

        _.uniq([1, 2, 1, 4, 1, 3]);

    //allUniqueDates = _.uniq(

   // _.map(history3, function(time){return time.toDateString(); });

    //_.pluck(history3, 'time'));

    // My goal is a an array of all of the unique dates formatted nicely:
    // [June 06, June 07, June 08]

/*

        


    If mode doesn't have it, add zero to the counts.
    counts["Sun"] = 0



*/    // Creates the highchart. Uses the meteor highchart package.
    $('#container-column').highcharts({
        
        chart: {
            type: 'column'
        },
        
        title: {
            text: 'Your Pronunciation Progress'
        },
        
        subtitle: {
            text: 'All History'
        },
        
        credits: {
            enabled: false
        },
        
        // Fake. Should be the names of the months that we have data for? Or days? or weeks?
        xAxis: {
            categories: gameDates
        },
        
        yAxis: {
            min: 0,
            title: {
                text: 'Log Entries'
            }
        },
        
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        
        // The data. The data below is fake. Working on getting actual data.
        series: [{
        	//data:data
        	// I want the columns to be a time frame (for now, date). Then have one line per mode.

        	// Below returns the number of game entries.
        	//History.find({userId: Meteor.userId(), mode: "game"}, {fields: {time: 1}}).fetch().length

        // Fake data
            name: 'Game',
            data: gameData

       /* }, {
            name: 'Story',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

        }, {
            name: 'Game',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
*/
        }]
    });
}
