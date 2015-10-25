Template.nInstaRUXlayout.onRendered(function () {
	$(document).foundation();
});

Template.admin.onRendered(function () {
	$(document).foundation('reflow');
	$('#masonry-container-admin').isotope({
  		itemSelector: '#masonry-container-admin li',
  		transformsEnabled: false
	});

	this.find('#masonry-container-admin')._uihooks = {
     insertElement: function(node, next) {
        $('#masonry-container-admin').append(node);
        $('#masonry-container-admin').isotope('prepended', node);
     },
  };
});

Template.client.onRendered(function () {
	$(document).foundation('reflow');
	$('#masonry-container-client').isotope({
  		itemSelector: '#masonry-container-client li',
  		transformsEnabled: false
	});

	this.find('#masonry-container-client')._uihooks = {
     insertElement: function(node, next) {
        $('#masonry-container-client').append(node);
        $('#masonry-container-client').isotope('prepended', node);
     },
  };
});


Template.analysis.onRendered(function () {
	$(document).foundation('reflow');
	$('#masonry-container-analysis').isotope({
  		itemSelector: '#masonry-container-analysis li',
  		transformsEnabled: false
	});
});

Template.dashboard.onRendered(function () {
	$(document).foundation('reflow');
	$('#masonry-container').isotope({
  		itemSelector: '#masonry-container li',
  		transformsEnabled: false
	});

	this.find('#masonry-container')._uihooks = {
     insertElement: function(node, next) {
        $('#masonry-container').append(node);
        $('#masonry-container').isotope('prepended', node);
     },
  };
});

Template.answer.onRendered(function () {
	$(document).foundation('reflow');
	if($('#masonry-container-admin').data('isotope'))
		$('#masonry-container-admin').isotope('layout');
});

Template.questionReplies.onRendered(function () {
	$(document).foundation('reflow');
	if($('#masonry-container-admin').data('isotope'))
		$('#masonry-container-admin').isotope('layout');
});

Template.answerclient.onRendered(function () {
	$(document).foundation('reflow');
	if($('#masonry-container-client').data('isotope'))
		$('#masonry-container-client').isotope('layout');
});

Template.admin.onCreated(function () {
	if(Meteor.user()){
		var invalidContext = true;
		var context = Events.findOne({_id: this.data.id});
		if(context.moderatorID == Meteor.user()._id)
			invalidContext = false;
		if(invalidContext)
			Router.go('/client/' + context._id);
	}
	else{
		Router.go('/');
	}
});

Template.analysis.onCreated(function () {
	if(Meteor.user()){
		var invalidContext = true;
		var context = Events.findOne({_id: this.data.id});
		if(context.moderatorID == Meteor.user()._id)
			invalidContext = false;
		if(invalidContext)
			Router.go('/client/' + context._id);
	}
	else{
		Router.go('/');
	}
});

Template.client.onCreated(function () {
	if(Meteor.user()){
		var selector = {eventID: this.data.id, clientID: Meteor.user()._id};
		var doc = {$set: {eventID: this.data.id, clientID: Meteor.user()._id}};
		Meteor.call("ClientsUpsert",selector,doc); 
	}
});

Template.loading.onRendered(function () {
	var message = '<p class="button gradient-button">Loading...</p>';
	var spinner = '<div class="sk-spinner sk-spinner-rotating-plane"></div>';	
	if ( ! Session.get('loadingSplash') ) {
		this.loading = window.pleaseWait({
			backgroundColor: '#7f8c8d',
			loadingHtml: message + spinner
		});
    Session.set('loadingSplash', true); // just show loading splash once
};
});

Template.loading.onDestroyed(function () {
	if ( this.loading ) {
		this.loading.finish();
	};
});
