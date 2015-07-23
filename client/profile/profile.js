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
		return History.find({userId: Meteor.userId()}, {sort:{time:-1}}).fetch();
        },

    yesData: function() {
        return !(History.findOne({userId: Meteor.userId()}) == undefined);
    }
});

Template.profile.events({

    'click #clearHistory': function(event){
        console.log ('hello');
        Meteor.call('removeUserHistory')
    },
    'click #actLink': function(event) {
        tabLayout(event);
    },
    'click #histLink': function(event) {
        tabLayout(event);
    },
    'click #soundProg': function(event) {
        tabLayout(event);
    }
})



// Call the function to built the chart when the template is rendered
Template.profile.rendered = function() {    
    buildDailyProgressChart();
    buildSoundProgressChart();
}

// *************************************** Build the chart with the progress for each sound. ****************************************************
function buildSoundProgressChart()
{

    // X-axis data that is a list of all of the sounds. Get from the Phonetics collection.
    sounds = _.pluck(Phonetics.find().fetch(), 'sound');


    // Y-axis that is the number of words in the finished array.
    // Game mode
    gdata = []
    for (var i = 0; i < sounds.length; i++)
    {
        progress = History.find({userId: Meteor.userId(), mode: "game", sound: sounds[i], correct: true}).fetch();
        count = _.uniq(_.pluck(progress, 'word')).length;
        gdata.push(count);
    }

    // Workshop mode
    wdata = []
    for (var i = 0; i < sounds.length; i++)
    {
        progress = History.find({userId: Meteor.userId(), mode: "workshop", sound: sounds[i], correct: true}).fetch();
        count = _.uniq(_.pluck(progress, 'word')).length;
        wdata.push(count);
    }

    // Story mode.
    sdata = []
    for (var i = 0; i < sounds.length; i++)
    {
        progress = History.find({userId: Meteor.userId(), mode: "story", sound: sounds[i], correct: true }).fetch();
        count = _.uniq(_.pluck(progress, 'word')).length;
        sdata.push(count);
    }





$('#sound-chart').highcharts({
        
        chart: {
            type: 'column'
        },
        
        title: {
            text: 'Your Sound Progress'
        },
        
        credits: {
            enabled: false
        },
        
        xAxis: {
            categories: sounds
        },
        
        yAxis: {
            min: 0,
            title: {
                text: 'Completed Words'
            },
            allowDecimals: false
        },
        
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.0f} Completed</b></td></tr>',
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
        
        series: [{
            name: 'Game',
            data: gdata

       }, {
            name: 'Story',
            data: sdata

        }, {
            name: 'Workshop',
            data: wdata

        }]
    });
}


// ******************************** Function to draw the daily progress chart *****************************************************************
function buildDailyProgressChart() 
{
    // I shouldn't need this line. But it gives me errors when I get rid of it....
    history = History.find({userId: Meteor.userId(), mode: "game"}).fetch(); 

   
    // ******* Aggregates the counts of entries in History for each mode and creates an array of counts. ***********
    // Game
    history2 = History.find({userId: Meteor.userId(), mode: "game"}).fetch(); // Returns the array of the objects of that user's game history. 
    gcounts = _.countBy(history2, function(obj) {
        return obj.time.toLocaleDateString(); }); // Returns the array of counts in the format: [7/10/2015: 3, 7/12/2015: 11], etc.

    // Workshop
    workshop = History.find({userId: Meteor.userId(), mode: "workshop"}).fetch();
    wcounts = _.countBy(workshop, function(obj) {
        return obj.time.toLocaleDateString(); });

    // Story
    story = History.find({userId: Meteor.userId(), mode: "story"}).fetch();
    scounts = _.countBy(story, function(obj) {
        return obj.time.toLocaleDateString(); });


    // ***** Need to add zeros for all of the days that there isn't a count for (starting at first count date). ********

    // Create an array of every date between the first use date and today's date.
    start = History.findOne({userId: Meteor.userId()},{sort:{time:1}}).time;     // Pulls your oldest date. 
    end = (new Date()); //Today's date.
    
    // Gets all of the days in between start and end, and turns them into the 7/10/2015, 7/11/2015 format to match the counts.
    firstAllDays = getAllDays(start,end)
    allDays = _.map(firstAllDays, function(time){ return time.toLocaleDateString();})

    // Adds the missing zero counts for each mode.
    gcounts = addZeros(allDays, gcounts);
    wcounts = addZeros(allDays, wcounts);
    scounts = addZeros(allDays, scounts);

    // Resort by date (initially the zeros are inserted at the end)
    gcounts = _.sortBy(gcounts, function(num, key){ return key; });
    wcounts = _.sortBy(wcounts, function(num, key){ return key; });
    scounts = _.sortBy(scounts, function(num, key){ return key; });


    // ****** Pulls out only the counts so that it can be used in the highchart. Format like: [3, 0, 0, 12, 11, 0, 2], etc.
    gameData = _.map(gcounts, function(num, key){ return num;});
    storyData = _.map(scounts, function(num, key){ return num;});
    workshopData = _.map(wcounts, function(num, key){ return num;});

   //  *********** Creates the highchart. Uses the meteor highchart package. ***********************
    $('#activity-chart').highcharts({
        
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
        
        xAxis: {
            categories: allDays
        },
        
        yAxis: {
            min: 0,
            title: {
                text: 'Log Entries'
            },
            allowDecimals: false
        },
        
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.0f} Correct</b></td></tr>',
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
        
        series: [{
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

// Adds zero counts in the data for every date that doesn't currently exist.    
function addZeros(allDays, counts){

    for (var i = 0; i < allDays.length; i++)
    {
        if (counts[allDays[i]] == undefined)
        {
            counts[allDays[i]] = 0;
        }
    }
    return counts;
}

//LAYOUT - for the tabs
function tabLayout(event) {
    $('ul.tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('tab-link current').addClass('tab-link');
        $('.tab-content').removeClass('tab-content current').addClass('tab-content');

        $(this).removeClass('tab-link').addClass('tab-link current');
        $("#"+tab_id).removeClass('tab-content').addClass('tab-content current');
    })
}