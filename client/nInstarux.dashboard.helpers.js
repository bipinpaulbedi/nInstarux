Template.myEvents.helpers({
	myAllEvents: function(){
		return Events.find({moderatorID : Meteor.user()._id}, {sort : {code : -1}});
	}
});

Template.createUpdateEvent.helpers({
	eventToEdit: function(){
		var event = Events.findOne({moderatorID : Meteor.user()._id, _id : Session.get('editEventOnDashboard')},{});
		if(event == null){
			event = {title: '', description: ''}
			Session.set('eventOperation', 'Create Event');
		}
		else
			Session.set('eventOperation', 'Update Event : ' + event.code);
		return event;
	},
	currentOperation: function(){
		return Session.get('eventOperation');
	}

});