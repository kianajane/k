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
    
    // Turn it into an array. WORKS
    history = History.find({userId: Meteor.userId(), mode: "game"}).fetch(); 


    // All Time values: (I'm really going to want days, or weeks or something.)
    //var dates = _.pluck(history, 'time'); // Gives me all the y-values I need.

    // Hits the same collection undefined problem we had before.
    data = _.pairs(_.countBy(history, 'time')); // I think I'd then want to pluck only the numbers out....??
    //console.log (JSON.stringify(data));

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
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ]
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
            name: 'Workshop',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

        }, {
            name: 'Story',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

        }, {
            name: 'Game',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

        }]
    });
}
