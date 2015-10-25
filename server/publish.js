Meteor.publish('Events', function(query, options){
	if(options){
		check(options,{
			sort: Match.Optional(Object),
			limit: Match.Optional(Number),
			fields: Match.Optional(Object)
		});
	}
	return Events.find(query,options);
});
Meteor.publish('Clients', function(query, options){
	if(options){
		check(options,{
			sort: Match.Optional(Object),
			limit: Match.Optional(Number),
			fields: Match.Optional(Object)
		});
	}
	return Clients.find(query,options);
});
Meteor.publish('Questions', function(query, options){
	if(options){
		check(options,{
			sort: Match.Optional(Object),
			limit: Match.Optional(Number),
			fields: Match.Optional(Object)
		});
	}
	return Questions.find(query,options);
});
Meteor.publish('Answers', function(query, options){
	if(options){
		check(options,{
			sort: Match.Optional(Object),
			limit: Match.Optional(Number),
			fields: Match.Optional(Object)
		});
	}
	return Answers.find(query,options);
});
Meteor.publish('Polls', function(query, options){
	if(options){
		check(options,{
			sort: Match.Optional(Object),
			limit: Match.Optional(Number),
			fields: Match.Optional(Object)
		});
	}
	return Polls.find(query,options);
});
Meteor.publish('PollReplies', function(query, options){
	if(options){
		check(options,{
			sort: Match.Optional(Object),
			limit: Match.Optional(Number),
			fields: Match.Optional(Object)
		});
	}
	return PollReplies.find(query,options);
});
Meteor.publish('EventTrail', function(query, options){
	if(options){
		check(options,{
			sort: Match.Optional(Object),
			limit: Match.Optional(Number),
			fields: Match.Optional(Object)
		});
	}
	return [Clients.find(query,options),Questions.find(query,options),
		Answers.find(query,options),Polls.find(query,options),
		PollReplies.find(query,options)];
});