Template.totalUsersAnalysis.helpers({
	totalUsersAnalysisId: function(){
		return (this.id + 'Analysis');
	},
	totalUsersAnalysisResult: function(){
		var result = Clients.find({eventID: this.id}).fetch().length;
		if(result){
		    return {
		    	chart: {
		    		type: 'solidgauge'
		    	},

		    	title: null,

		    	pane: {
		    		center: ['50%', '85%'],
		    		size: '140%',
		    		startAngle: -90,
		    		endAngle: 90,
		    		background: {
		    			backgroundColor: '#EEE',
		    			innerRadius: '60%',
		    			outerRadius: '100%',
		    			shape: 'arc'
		    		}
		    	},

		    	tooltip: {
		    		enabled: false
		    	},

		    	yAxis: {
		    		min: 0,
		    		max: (result * 2),
		    		title: {
		    			text: 'Users'
		    		},

		    		stops: [
		    		[0.1, '#55BF3B'],
		    		[0.5, '#DDDF0D'],
		    		[0.9, '#DF5353']
		    		],
		    		lineWidth: 0,
		    		minorTickInterval: null,
		    		tickPixelInterval: 400,
		    		tickWidth: 0,
		    		title: {
		    			y: -70
		    		},
		    		labels: {
		    			y: 16
		    		}
		    	},

		    	plotOptions: {
		    		solidgauge: {
		    			dataLabels: {
		    				y: 5,
		    				borderWidth: 0,
		    				useHTML: true
		    			}
		    		}
		    	},

		    	credits: {
		    		enabled: false
		    	},

		    	series: [{
		    		name: 'Users',
		    		data: [result],
		    		dataLabels: {
		    			format: '<div style="text-align:center"><span style="font-size:25px;color:#7e7e7e">{y}</span><br/>' +
		    			'<span style="font-size:12px;color:silver">users participated</span></div>'
		    		},
		    		tooltip: {
		    			valueSuffix: ' Users'
		    		}
		    	}]
		    };
		}
	}
});

Template.topFiveQuestions.helpers({
	topFiveQuestionsResult: function(){
		return Questions.find({eventID: this.id},{sort: {votesCount: -1}}, {limit: 5});
		
	}
});