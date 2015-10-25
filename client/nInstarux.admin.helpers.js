Template.questionPoll.helpers({
	allEventQuestionPoll: function(){
		var _allQ = Questions.find({eventID : this.id}, {sort : {sequence : -1}});
		var _allP = Polls.find({eventID : this.id}, {sort : {sequence : -1}});
		var _allQP = _.union(_allQ.fetch(),_allP.fetch());
		return _.sortBy(_allQP, function(val) {
			return (val.sequence * -1);});
	},
	isQuestion: function(){
		return this.type == "Question";
	}
});

Template.questionReplies.helpers({
	questionRepliesSegregated: function() {
		return Answers.find({eventID: this.eventID, questionID: this._id},{});
	}
});

Template.pollResult.helpers({
	chartId: function() {return this._id;},
	chartResult: function() {
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