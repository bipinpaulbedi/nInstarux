Template.askTheSpeakerclient.events({
	'submit .askQuestionFormclient': function(e){
		e.preventDefault();
		var _question = e.target.askQuestionclient.value;
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

Template.questionclient.events({
	'click .addVoteclient': function(e){
		e.preventDefault();
		var selector = {eventID: this.eventID, _id: this._id};
		var doc = {$addToSet: {votes: Meteor.user()._id}};
		Meteor.call("QuestionsUpdate",selector,doc); 
		return false;
	}
});

Template.answerclient.events({
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

Template.pollclient.events({
	'change .castPoll': function(e){
		e.preventDefault();
		var _reply = e.target.value;
		var selector = {eventID: this.eventID, pollID: this._id, clientID: Meteor.user()._id};
		var doc = {$set : {eventID: this.eventID, pollID: this._id, clientID: Meteor.user()._id, reply: _reply}};
		Meteor.call("PollRepliesUpsert",selector,doc); 
		return false;
	}
});