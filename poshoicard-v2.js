// poshoicard-test.js
var casperjs = casper;

var $ = require('jquery');

var numberOfTest = 77;

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
		test.assertSelectorHasText('h1', 'Dashboard');

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

	casperjs.thenOpen('http://pos.hoicard.com/cms/v2/orders', function(){
		test.comment(whereDoWeGo[10]);
		test.assertTextDoesntExist(
			'A PHP Error was encountered',
			'No PHP Error found, at ' + whereDoWeGo[10]
		);
	});

	// whereDoWeGo.forEach(function(url){
	// 	test.comment(url);
	// 	// casperjs.thenOpen(url, function(){
	// 	// 	test.assertTextDoesntExist(
	// 	// 		'A PHP Error was encountered',
	// 	// 		'No PHP Error found, at ' + url
	// 	// 	);
	// 	// });
	// });

	// while(whereDoWeGo.length > 0){
	// 	var url = whereDoWeGo.pop();
	//
	// 	(function(url){
	// 		casperjs.thenOpen(url, function(){
	// 			test.assert(true, 'true is true');
	// 			test.assertTextDoesntExist(
	// 				'A PHP Error was encountered',
	// 				'No PHP Error found, at ' + url
	// 			);
	// 		});
	// 	})(url);
	// }

	// for(var i = 0; i++; i < whereDoWeGo.length){
	// 	var url = whereDoWeGo[i];
	// 	(function(url){
	// 		test.comment(url);
	// 		casperjs.thenOpen(whereDoWeGo[i], function(){
	// 			test.assertTextDoesntExist(
	// 				'A PHP Error was encountered',
	// 				'No PHP Error found, at ' + url
	// 			);
	// 		});
	// 	})(url);
	// }

	test.comment('acb $%^$');

	casperjs.then(function(){
		test.comment('fuck you');
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

	casperjs.run(function(){
		test.done();
	});
});

// casperjs.run(function(){});