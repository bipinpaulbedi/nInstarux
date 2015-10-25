Meteor.methods({
	EventsInsert: function(doc){
		Events.insert(doc);
	},

	EventsUpdate: function(selector, doc){
		Events.update(selector, doc);
	},

	ClientsUpsert: function(selector, doc){
		Clients.upsert(selector,doc);
	},

	QuestionsInsert: function(doc){
		var id = Questions.insert(doc);
		internalMethods.updateVoteCount({_id: id});
	},

	QuestionsUpdate: function(selector, doc){
		Questions.update(selector, doc);
		internalMethods.updateVoteCount(selector);
	},

	AnswersUpsert: function(selector, doc){
		Answers.upsert(selector, doc);
	},

	PollsInsert: function(doc){
		Polls.insert(doc);
	},

	PollsUpdate: function(selector, doc){
		Polls.update(selector, doc);
	},

	PollRepliesUpsert: function(selector, doc){
		PollReplies.upsert(selector, doc);
	},

	PollsComputeResult: function(selector){	
		internalMethods.computePollResult(selector);
	},

	GetEventByCode: function(selector){
		return Events.findOne(selector);
	}
});

var internalMethods = {};
internalMethods.updateVoteCount = function(selector){
	var doc = Questions.findOne(selector);
	if(doc.votesCount != doc.votes.length)
		Questions.update(selector,{$set: {votesCount: doc.votes.length}});
};

internalMethods.computePollResult = function(selector){
	var doc = Polls.findOne(selector);
	var replies = PollReplies.find({eventID: doc.eventID, pollID: doc._id}).fetch();
	if(replies){
		var result = _.countBy(replies, function(r){return r.reply});
		var _totalChoiceOne = result['1'];
		var _totalChoiceTwo = result['2'];
		var _totalChoiceThree = result['3'];
		var _totalChoiceFour = result['4'];

		if(_totalChoiceOne == null)
			_totalChoiceOne = 0;

		if(_totalChoiceTwo == null)
			_totalChoiceTwo = 0;

		if(_totalChoiceThree == null)
			_totalChoiceThree = 0;

		if(_totalChoiceFour == null)
			_totalChoiceFour = 0;

		Polls.update(selector,{$set: {totalChoiceOne: _totalChoiceOne,
			totalChoiceTwo: _totalChoiceTwo, totalChoiceThree: _totalChoiceThree,
			totalChoiceFour: _totalChoiceFour, lastComputedDate: new Date()}});
	}	
};