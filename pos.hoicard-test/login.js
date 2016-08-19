var config = require('./config.js');

var casperjs = casper;

var login = function(test){
	casperjs.start(config.host, function(){
		//check login form
		test.assertExists('form[name="hoipos_login"]', 'Find login form');

		test.comment('Logging in...');

		var login = config.login;

		//login
		casperjs.fill('form[name="hoipos_login"]', {
			email: login.email,
			password: login.password
		}, true);

		//wait redirect to dashboard
		casperjs.waitForUrl(/dashboard/, function(){
			//check succes redirect to dashboard
			test.assertUrlMatch(/dashboard/, 'Success login, redirect to `dashboard`');
		});
	});
};

module.exports = login;

