var config = require('./config.js');

var casperjs = casper;

var phpDataError = function(test){
	var whereDoWeGo;
	//store list of link in sidebar-menu
	casperjs.thenOpen(config.host + '/dashboard', function(){
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
				
				test.assertTextDoesntExist(
					'A Database Error Occured',
					'No Database Error found, at ' + url
				);
			});
		});
	});
};

module.exports = phpDataError;
