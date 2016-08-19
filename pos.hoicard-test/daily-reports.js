var config = require('./config.js');

var casperjs = casper;

var dailyReports = function(test){
	//test analysis on daily_report
	casperjs.thenOpen('http://pos.hoicard.com/cms/v2/daily_reports', function(){
		

		//casperjs evaluate = crawler through DOM
		var info = casperjs.evaluate(function(){
			var tmp = {};

			var tr = $('table#dataTable > thead > tr');

			var thNettTotal;

			tr.find('th').each(function(){
				if($(this).text() == 'Nett Total'){
					thNettTotal = $(this);
				}
			});

			tmp.nettTotalIndex = thNettTotal.index();

			console.log(tmp.nettTotalIndex);

			tmp.numberOfRowData = $('table#dataTable > tbody tr').length;

			//random row index, obmit the first one
			//css nth-child start at 1
			var randomRowIndex = Math.floor((Math.random() * tmp.numberOfRowData) + 2);

			console.log(tmp.nettTotalIndex);

			var nettTotal = $('table#dataTable > tbody tr')

			return tmp;
		});

		

		casperjs.click('table#dataTable > tbody tr:nth-child(' + randomRowIndex + ')');

		casperjs.then(function(){
			casperjs.waitForUrl(/daily_reports\/[0-9]+/, function(){

			});
		});


	});
};

module.exports = dailyReports;