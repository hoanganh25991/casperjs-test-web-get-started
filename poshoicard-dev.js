// poshoicard-test.js
var casperjs = casper;

var $ = require('jquery');

var numberOfTest = 77;

var config = {
	host: 'http://pos.hoicard.com/cms/dev',
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
		var index = info.whereDoWeGo.indexOf('http://pos.hoicard.com/cms/dev/dashboard');

		if(index > -1){
			info.whereDoWeGo.splice(index, 1);
		}

		whereDoWeGo = info.whereDoWeGo;

		//detect A PHP was encountered
		// test.assertTextExists('A PHP Error was encountered');
		test.assertTextDoesntExist('A PHP Error was encountered', 'No PHP Error found');
	});

	casperjs.thenOpen('http://pos.hoicard.com/cms/dev/orders', function(){
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

	// casperjs.then(function(){
	// 	test.comment('fuck you');
	// 	whereDoWeGo.forEach(function(url){
	// 		test.comment(url);

	// 		casperjs.thenOpen(url, function(){
	// 			test.assertTextDoesntExist(
	// 				'A PHP Error was encountered',
	// 				'No PHP Error found, at ' + url
	// 			);
	// 		});
	// 	});
	// });

	//detect submit form at categories/create, it exist in categories
	casperjs.thenOpen('http://pos.hoicard.com/cms/dev/categories', function(){
		var category = {
			display_name: Math.random().toString(36).substring(7)
		};

		var subCategory = {
			display_name: Math.random().toString(36).substring(7)
		};

		//go to categories/create
		casperjs.click('div.breadcrumb a');

		casperjs.then(function(){
			//detect see /create redirect
			casperjs.waitForUrl(/create/, function(){
				test.assertExists('form#theForm', 'Find create categories form');

				//notify category name
				test.comment('category name: ' + category.display_name);

				casperjs.fill('form#theForm', {
					display_name: category.display_name
				}, true);
			});
		});

		casperjs.then(function(){
			//detect see /categories redirect when create success
			casperjs.waitForUrl(/categories/, function(){
				test.assertUrlMatch(/categories/, 'Go back to categories');
				test.assertTextExists(
					category.display_name,
					'category name exist as created: ' + category.display_name
				);
			});

			//now go to a single categories, just created above
			casperjs.clickLabel(category.display_name, 'td');
		});

		casperjs.then(function(){
			casperjs.waitForUrl(/categories\/[0-9]+/, function(){
				casperjs.click('div.breadcrumb a');
			});
		});

		casperjs.then(function(){
			casperjs.waitForUrl(/categories\/create\/[0-9]+/, function(){
				test.assertExists('form#theForm', 'Find create categories form');

				//notify category name
				test.comment('sub-category name: ' + subCategory.display_name);

				casperjs.fill('form#theForm', {
					display_name: subCategory.display_name
				}, true);
			});
		});

		casperjs.then(function(){
			casperjs.waitForUrl(/categories/, function(){
				test.assertTextExists(
					subCategory.display_name,
					'sub-category name exist as created: ' + subCategory.display_name
				);
			});
		});
	});

	casperjs.run(function(){
		test.done();
	});
});

// casperjs.run(function(){});