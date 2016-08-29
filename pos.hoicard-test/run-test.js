var casperjs = casper;

var $ = require('jquery');

var login = require('./login.js');

var phpDataError = require('./php-database-error.js');

var dailyReports = require('./daily-reports.js');

casperjs.test.begin('Test: pos.hoicard.com/cms/v2', function suite(test){
	login(test);

	phpDataError(test);

	dailyReports(test, $);
	
	casperjs.run(function(){
		test.done();
	});
});