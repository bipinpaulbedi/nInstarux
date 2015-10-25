Template.questionPollclient.helpers({
	allEventQuestionPollclient: function(){
		var _allQ = Questions.find({eventID : this.id, isApproved: true}, {sort : {sequence : -1}});
		var _allP = Polls.find({eventID : this.id, isApproved: true}, {sort : {sequence : -1}});
		var _allQP = _.union(_allQ.fetch(),_allP.fetch());
		return _.sortBy(_allQP, function(val) {
			return (val.sequence * -1);});
	},
	isQuestionclient: function(){
		return this.type == "Question";
	}
});

Template.pollResultclient.helpers({
	chartIdclient: function() {return this._id;},
	chartResultclient: function() {
		var result = Polls.findOne({eventID: this.eventID, _id: this._id},{});
		if(result){
		    return {
		        chart: {
		            type: 'column'
		        },
		        title: {
		            text: 'Result'
		        },
		        subtitle: {
	            	text: 'Last Computed On : ' + result.lastComputedDate
	        	},
		        credits: {
		            enabled: false
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: 'Votes (count)'
		            }
		        },
		        tooltip: {
		            headerFormat: '<span style="font-size:10px"></span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		                '<td style="padding:0"><b>{point.y}</b></td></tr>',
		            footerFormat: '</table>',
		            shared: true,
		            useHTML: true
		        },
			    series: [{
		            name: result.firstChoice,
		            data: [result.totalChoiceOne]

		        }, {
		            name: result.secondChoice,
		            data: [result.totalChoiceTwo]

		        }, {
		            name: result.thirdChoice,
		            data: [result.totalChoiceThree]

		        }, {
		            name: result.forthChoice,
		            data: [result.totalChoiceFour]

		        }]
		    };
		}
	}
});