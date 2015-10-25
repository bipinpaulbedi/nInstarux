Template.joinEvent.events({
	'submit .clientLauncher': function(e){
		e.preventDefault();
		Router.go('/c/' + e.target.eventCode.value);
	}
});

Template.myEvents.events({
	'click .editEvent': function(e){
		e.preventDefault();
		Session.set('editEventOnDashboard',this._id);
		return false;
	}
});

Template.createUpdateEvent.events({
	'submit .cuEvent' : function(e) {
		e.preventDefault();
		var _title = e.target.title.value;
		var _description =  e.target.description.value;
		var selector = {};
		var doc = {title: _title, description: _description, moderatorID: Meteor.user()._id};
		if(Session.get('editEventOnDashboard')){
			selector = {_id: Session.get('editEventOnDashboard')};
			doc = {$set: {title: _title, description: _description}};
			Meteor.call("EventsUpdate",selector,doc,function (error, result) 
			{ if(error) {
					sAlert.error(error.message);
				}
				else{
					sAlert.success('Event created/updated successfully.');
				}
			});
		}
		else{
			Meteor.call("EventsInsert",doc,function (error, result) 
				{ if(error)
					sAlert.error(error.message);
				  else
					sAlert.success('Event created/updated successfully.');
				});
		}
		return false;
	},

	'click .reset': function(e) {
		e.preventDefault();
		Session.set('editEventOnDashboard','');
	}
});