// poshoicard-test.js
var casperjs = casper;

var $ = require('jquery');

var numberOfTest = 7;

casperjs.test.begin('test php error', numberOfTest, function suite(test) {

	var url = 'http://pos.hoicard.com/cms/dev';

	console.log(url);

	console.log('login, user/pass arteastiq/zZzZzZz');

	casperjs.start(url, function() {

		console.log("check form exist");

		test.assertExists('form[name="hoipos_login"]', 'find form : ok');

		console.log("fill form, then login");

		test.comment('ώ Logging in...');
		
		this.fill('form[name="hoipos_login"]', {
			email: 'arteastiq', 
			// password:  'zZzZzZz'
			password:  'zZzZzZz'
		}, true);
	});

	casperjs.then(function() {

		// console.log("login success, go to page: ");
		// var deleteConfirmModal = document.getElementById("deleteConfirmModal");

		// console.log("baseURI of deleteConfirmModal: " + deleteConfirmModal.childNodes[0].baseURI);
		//
		// test.assertTitle("hoiPOS CMS ABC", "pos.hoicard title : ok");


		test.assertHttpStatus(200);

		console.log(this.getCurrentUrl());

		test.assertExists('.login-logo', 'still at login page, why not redirected???');

		var h1 = $('h1');

		console.log(h1.text());

		casperjs.waitForUrl(/dashboard/, function(){
			console.log('login success, now redirected');
			test.assertUrlMatch(/dashboard/, 'go to dashboard');
		});

	});

	casperjs.then(function(){

		var url = 'http://pos.hoicard.com/cms/dev/dashboard';

		test.assertHttpStatus(200);//4


		test.assertExists('h1', 'find h1');//5 test

		
		test.assertUrlMatch(/dashboard/, 'go to dashboard');

		
		console.log($('h1'));

		// casperjs.captureSelector('log.png', 'h1');
		casperjs.capture('log.png');
		// casperjs.capture('log.pdf');
		
		// change casperjs viewport
		// casperjs.viewport(1280, 600);
		casperjs.viewport(1600, 600);
		
		casperjs.capture('log.pdf');

	});

	casperjs.run(function() {
		test.done();
	});
});