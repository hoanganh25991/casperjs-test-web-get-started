// poshoicard-test.js
var casperjs = casper;

var $ = require('jquery');

var config = {
	host: 'http://pos.hoicard.com/cms/v2',
	login: {
		email: 'arteastiq',
		password: 'zZzZzZz'
	}
};

var whereDoWeGo = [];

casperjs.test.begin('Test: A PHP was encountered', function suite(test){

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

	//make sure login success by waitForUrl
	//now go to dashboard

	//store list of link in sidebar-menu
	casperjs.thenOpen(config.host + '/dashboard', function(){
		//check h1 is Dashboard
		// test.assertSelectorHasText('h1', 'Dashboard');

		//inside casperjs.evaluate, we can use jquery as normal
		//like jQuery(document), jQuery 'eat' the DOM
		var info = casperjs.evaluate(function(){
			var tmp = {};

			tmp.heading1 = $('h1').text();

			//detect sidebar-menu
			var ulSideBarMenu = $('ul.sidebar-menu');

			tmp.whereDoWeGo = [];

			//loop through, get link
			ulSideBarMenu.find('a').each(function(){
				var a = $(this);

				var aHref = a.attr('href');

				//store real link, not #
				var isRealLink = false;
				if(aHref && aHref !== '#'){
					isRealLink = aHref;
				}

				//store
				if(isRealLink){
					tmp.whereDoWeGo.push(isRealLink);
				}
			});

			return tmp;
		});

		test.comment(info.heading1);

		test.comment('whereDoWeGo[0] ' + info.whereDoWeGo[0]);

		//remove the `dashboard` link
		var index = info.whereDoWeGo.indexOf('http://pos.hoicard.com/cms/v2/dashboard');

		if(index > -1){
			info.whereDoWeGo.splice(index, 1);
		}

		whereDoWeGo = info.whereDoWeGo;

		//detect A PHP was encountered
		// test.assertTextExists('A PHP Error was encountered');
		test.assertTextDoesntExist('A PHP Error was encountered', 'No PHP Error found');
	});

	//test A PHP Error was encountered
	casperjs.then(function(){
		whereDoWeGo.forEach(function(url){
			test.comment(url);

			casperjs.thenOpen(url, function(){
				test.assertTextDoesntExist(
					'A PHP Error was encountered',
					'No PHP Error found, at ' + url
				);
			});
		});
	});

	//test analysis on daily_report
	casperjs.thenOpen('http://pos.hoicard.com/cms/v2/daily_reports', function(){
		var info = casperjs.evaluate(function(){
			var tr = $('table#dataTable > thead > tr');

			var thNettTotal;

			tr.find('th').each(function(){
				if($(this).text() == 'Nett Total'){
					thNettTotal = $(this);
				}
			});

			var nettTotalIndex = thNettTotal.index();
		});
	});

	casperjs.run(function(){
		test.done();
	});
});

// casperjs.run(function(){});