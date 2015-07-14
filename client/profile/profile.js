Template.profile.helpers({
	bio: function(){
		console.log("profile this = "+JSON.stringify(this));
		return this.profile.bio;
		},
	photo:function(){ // returns the URL of the gravatar photo for this email
		return  "images/face.png"
        }, ///Gravatar.imageUrl(Gravatar.hash(this.emails[0].address,{secure:true}))}

	myHistory: function() {
		return History.find({userId: Meteor.userId()}).fetch();
        },

    'click #clearHistory': function(event){    
        console.log ("you've pressed clear!");
        History.remove({userId: Meteor.userId()});
        return;
        }

})

/*Meteor.methods({

  data: function(){

    check(arguments, [Match.Any]);

	//History.find({userId: Meteor.userId(), mode: "game"}, {fields: {time: 1}}).fetch().length
    return History.find({userId : Meteor.userId(), mode: "game"},{"time" : 1}).fetch();

  }

});*/

/*
 * Function to draw the column chart
 */
function builtColumn() {

// I added underscores. So adapt this:
// var data = _.pairs(_.countBy(result, "fruit"));

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
        
        series: [{
        	//data:data
        	// I want the columns to be a time frame (for now, date). Then have one line per mode.

        	// Below returns the number of game entries.
        	//History.find({userId: Meteor.userId(), mode: "game"}, {fields: {time: 1}}).fetch().length

        	// I need the number of game entries on each day. We might need to use an aggregation package, and figure out JQuery???
        	// https://forums.meteor.com/t/solved-how-to-draw-bar-chart-using-highcharts-and-mongodb-data-reactively/5156/5
        	// https://forums.meteor.com/t/highcharts-and-mongodb/4605

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

/*
 * Call the function to built the chart when the template is rendered
 */
Template.profile.rendered = function() {    
    builtColumn();
}