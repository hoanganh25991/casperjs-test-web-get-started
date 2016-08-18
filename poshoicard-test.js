// poshoicard-test.js
var casperjs = casper;

console.log("hello anh Torin");

casperjs.test.begin('login pos.hoicard', 1, function suite(test) {

    casperjs.start("http://pos.hoicard.com/cms/dev", function() {

        console.log("check form exist");

        test.assertExists('form[name="hoipos_login"]', 'find form : ok');

        console.log("fill form, then login");
        
        this.fill('form[name="hoipos_login"]', {
            email: 'arteastiq', 
            password:  'zZzZzZz'
        }, true);


    });

    casperjs.then(function() {

	    casperjs.start("http://pos.hoicard.com/cms/dev/dashboard", function(){

            console.log("login success, go to page: ");
		    // var deleteConfirmModal = document.getElementById("deleteConfirmModal");

		    // console.log("baseURI of deleteConfirmModal: " + deleteConfirmModal.childNodes[0].baseURI);
		    //
		    test.assertTitle("hoiPOS CMS ABC", "pos.hoicard title : ok");

		    console.log(this.getCurrentUrl());
	    });

    });

    casperjs.run(function() {
        test.done();
    });
});