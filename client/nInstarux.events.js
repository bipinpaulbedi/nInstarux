Template.navBar.events({
	'click .logout': function(e){
		e.preventDefault();
		AccountsTemplates.logout();
	}
});