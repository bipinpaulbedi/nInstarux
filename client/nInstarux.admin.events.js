Template.askTheSpeaker.events({
	'submit .askQuestionForm': function(e){
		e.preventDefault();
		var _question = e.target.askQuestion.value;
		var doc = {eventID: this.id, question: _question, enableReply: false, isApproved: false};
		Meteor.call("QuestionsInsert",doc,function (error, result) 
			{ if(error) {
					sAlert.error(error.message);
				}
				else{
					sAlert.success('Question raised.');
				}
			});
		return false;
	}
});

Template.createPoll.events({
	'submit .takeConsensusForm': function(e){
		e.preventDefault();
		var _question = e.target.askQuestion.value;
		var _choice1 = e.target.choice1.value;
		var _choice2 = e.target.choice2.value;
		var _choice3 = e.target.choice3.value;
		var _choice4 = e.target.choice4.value;
		var doc = {eventID: this.id, question: _question, isApproved: false, firstChoice: _choice1,secondChoice: _choice2,
			thirdChoice: _choice3,forthChoice: _choice4};
		Meteor.call("PollsInsert",doc,function (error, result) 
			{ if(error) {
					sAlert.error(error.message);
				}
				else{
					sAlert.success('Question raised.');
				}
			});
		return false;
	}
});

Template.question.events({
	'click .addVote': function(e){
		e.preventDefault();
		var selector = {eventID: this.eventID, _id: this._id};
		var doc = {$addToSet: {votes: Meteor.user()._id}};
		Meteor.call("QuestionsUpdate",selector,doc); 
		return false;
	},
	'change .approve': function(e){
		e.preventDefault();
		var selector = {eventID: this.eventID, _id: this._id};
		var doc = {$set: {isApproved: e.target.checked}};
		Meteor.call("QuestionsUpdate",selector,doc); 
		return false;
	},
	'change .enable': function(e){
		e.preventDefault();
		var selector = {eventID: this.eventID, _id: this._id};
		var doc = {$set: {enableReply: e.target.checked}};
		Meteor.call("QuestionsUpdate",selector,doc); 
		return false;
	}
});

Template.answer.events({
	'submit form': function(e){
		e.preventDefault();
		var _reply = e.target.reply.value;
		var selector = {eventID: this.eventID, questionID: this._id, clientID: Meteor.user()._id};
		var doc = {$set : {eventID: this.eventID, questionID: this._id, clientID: Meteor.user()._id, reply: _reply}};
		Meteor.call("AnswersUpsert",selector,doc,function (error, result) 
			{ if(error) {
					sAlert.error(error.message);
				}
				else{
					sAlert.success('Thank you for your reply.');
				}
			});
		return false;
	}
});

Template.poll.events({
	'change .approve': function(e){
		e.preventDefault();
		var selector = {eventID: this.eventID, _id: this._id};
		var doc = {$set: {isApproved: e.target.checked}};
		Meteor.call("PollsUpdate",selector,doc); 
		return false;
	},
	'click .computeResult' : function (e) {
		e.preventDefault();
		var selector = {eventID: this.eventID, _id: this._id};
		Meteor.call("PollsComputeResult",selector); 
		return false;	
	}
});