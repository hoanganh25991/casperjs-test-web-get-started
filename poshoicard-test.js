// poshoicard-test.js
var casperjs = casper;

var $ = require('jquery');

var config = {
	host: 'http://pos.hoicard.com/cms/dev/',
	login: {
		email: 'arteastiq',
		password: 'zZzZzZz'
	}
};

// sidebar-menu

var numberOfTest = 3;
casperjs.test.begin('Test: A PHP was encountered', numberOfTest, function suite(test) {
	casperjs.start(config.host, function(){
		//detect login from
		test.assertExists('form[name="hoipos_login"]', 'Find login form');

		test.comment('Logging in...');

		//login
		var host = config.host;
		casperjs.fill('form[name="hoipos_login"]', {
			email: host.email,
			password:  host.password
		}, true);

		//wait redirect to dashboard
		casperjs.waitForUrl('Wait for redirect to dashboard', function(){
			//check succes redirect to dashboard
			test.assertUrlMatch(/dashboard/, 'Success login, redirect to `dashboard`');
		});
	});

	

	casperjs.start(config.host + 'dashboard', function(){
		//check h1 is Dashboard
		test.assertSelectorHasText('h1', 'Dashboard');



	});

	

	
});