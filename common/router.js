Router.configure({
	layoutTemplate: 'nInstaRUXlayout',
	loadingTemplate: 'loading'
});

AccountsTemplates.configure({

  defaultLayout: 'nInstaRUXlayout',

    // Behavior
    enablePasswordChange: true,
    sendVerificationEmail: false,
    lowercaseUsername: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: true,
    negativeFeedback: true,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: false,

    // Redirects
    homeRoutePath: '/dashboard',
    redirectTimeout: 4000,

    texts: {
      socialIcons: {
        facebook: "fi-social-facebook",
        twitter: "fi-social-twitter",
      }
    }

  });

Router.plugin('ensureSignedIn', {
  only: ['dashboard','admin','client','c','analysis']
});

AccountsTemplates.configureRoute('signIn', {redirect: '/dashboard'});
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
AccountsTemplates.configureRoute('resendVerificationEmail');

Router.route('/', function () {
  this.render('home');
}, {name: 'home'});

Router.route('/dashboard', function () {
  this.subscribe('Events', {moderatorID : Meteor.user()._id},{sort : {code: -1}}).wait();
  if(this.ready())
  	this.render('dashboard');}, {name: 'dashboard'});

Router.route('/admin/:id', function () {
  this.subscribe('Events', {_id: this.params.id}).wait();
  this.subscribe('EventTrail', {eventID: this.params.id}).wait();
  if(this.ready())
  	this.render('admin', {data: this.params});
}, {name: 'admin'});

Router.route('/c/:code', function () {
  Meteor.call('GetEventByCode',{code: parseInt(this.params.code)},function(error,result){
    if(result)
      Router.go('/client/' + result._id)
  })
}, {name: 'c'});

Router.route('/client/:id', function () {
  this.subscribe('Events', {_id: this.params.id}).wait();
  this.subscribe('EventTrail', {eventID: this.params.id}).wait();
  if(this.ready())
    this.render('client', {data: this.params});
}, {name: 'client'});


Router.route('/analysis/:id', function () {
  this.subscribe('Events', {_id: this.params.id}).wait();
  this.subscribe('EventTrail', {eventID: this.params.id}).wait();
  if(this.ready())
    this.render('analysis', {data: this.params});
}, {name: 'analysis'});