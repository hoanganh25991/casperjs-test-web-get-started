var casperjs = casper;

var login = require('./login.js');

var phpDataError = require('./php-database-error.js');

var dailyReports = require('./daily-reports.js');

casperjs.test.begin('Test: A PHP was encountered', function suite(test){
	login(test);

	// phpDataError(test);

	dailyReports(test);

	casperjs.run(function(){
		test.done();
	});
});