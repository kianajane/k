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
    gcounts = _.countBy(history2, function(obj) {
        return obj.time.toLocaleDateString(); }); // Returns the array of counts in the format: [June 06: 3, June 10: 11], etc.

    workshop = History.find({userId: Meteor.userId(), mode: "workshop"}).fetch();
    wcounts = _.countBy(workshop, function(obj) {
        return obj.time.toLocaleDateString(); });


    story = History.find({userId: Meteor.userId(), mode: "story"}).fetch();
    scounts = _.countBy(story, function(obj) {
        return obj.time.toLocaleDateString(); });


    //Iterate through every date that we have from the original array.
    // Every date since the oldest history entry.

    start = History.findOne({userId: Meteor.userId()},{sort:{time:1}}).time;     // Pulls your oldest date. 
    console.log("s: " + start);

    e = (new Date()); //Today's date.
    
    // Do I really want to shorten the dates now?
    firstAllDays = getAllDays(start,e)
    allDays = _.map(firstAllDays, function(time){ return time.toLocaleDateString();})
    console.log ("final days: " + allDays)


    gcounts = addZeros(allDays, gcounts);

    function addZeros(allDays, counts){

    for (var i = 0; i < allDays.length; i++)
    {
        if (counts[allDays[i]] == undefined)
        {
            counts[allDays[i]] = 0.1;
        }
    }
    return counts;
    }

    counts = addZeros(allDays, gcounts);
    wcounts = addZeros(allDays, wcounts);
    scounts = addZeros(allDays, scounts);

    // Resort by date:
    gcounts = _.sortBy(gcounts, function(num, key){ return key; });
    wcounts = _.sortBy(wcounts, function(num, key){ return key; });
    scounts = _.sortBy(scounts, function(num, key){ return key; });

    gameData = _.map(gcounts, function(num, key){ return num;}); // Pulls out only the counts, returns an array [3, 11], etc.
    storyData = _.map(scounts, function(num, key){ return num;});
    workshopData = _.map(wcounts, function(num, key){ return num;});

    //gameDates = _.map(shcounts, function(num, key){ return key;});


// Gets all of the dates between s and e.
function getAllDays(s, e) {
    s = new Date(s.valueOf());
    var e = new Date(e.valueOf());
    var a = [s];

    while(s < e) {
        var t = new Date(s);
        t.setDate(1+ t.getDate());
        a.push(t);
        s = t;
    }

    return a;
};

   // Creates the highchart. Uses the meteor highchart package.
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
            categories: allDays
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

       }, {
            name: 'Story',
            data: storyData

        }, {
            name: 'Workshop',
            data: workshopData

        }]
    });
}
/*
Unused code:


       
        // Last: takes unique array, returns an array.
        //_.uniq(cleanHistory);

 // Need an array of just the times. Works. All the times for any testing.
    
       // history3 = _.pluck(History.find({}).fetch(), 'time')
        //cleanHistory = _.map(history3, function(time){ return time.toLocaleDateString();; })

    // My goal is a an array of all of the unique dates formatted nicely:
    // [June 06, June 07, June 08]

     //Doesn't work.
    history3 = History.find({userId: Meteor.userId()}, {'time': 1}).fetch();
    //FacData.find({depts:{$elemMatch:{descr:'Computer Science'}}},{sort:{lastname:1}})
    


*/