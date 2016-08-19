var casperjs = casper;

var dailyReports = function(test, $){
	//test analysis on daily_report
	casperjs.thenOpen('http://pos.hoicard.com/cms/v2/daily_reports', function(){
		//casperjs evaluate = crawler through DOM
		var info = casperjs.evaluate(function(){
			// var tmp = {};
			//
			// var tr = $('table#dataTable > thead > tr');
			//
			// var thNettTotal;
			//
			// tr.find('th').each(function(){
			// 	if($(this).text() == 'Nett Total'){
			// 		thNettTotal = $(this);
			// 	}
			// });
			//
			// if(!thNettTotal){
			// 	thNettTotal = {
			// 		index: function(){return 3}
			// 	}
			// }
			//
			// var nettTotalIndex = thNettTotal.index();
			//
			// test.comment(nettTotalIndex);
			//
			// var numberOfRowData = $('table#dataTable > tbody tr').length;
			//
			// //random row index, obmit the first one
			// //css nth-child start at 1
			// var randomRowIndex = Math.floor((Math.random() * numberOfRowData) + 2);
			//
			// var rowSeletorString = 'table#dataTable > tbody ' +
			// 	'tr:nth-child(' + randomRowIndex + ') ' +
			// 	'td:nth-child(' + nettTotalIndex +')';
			//
			// test.comment(rowSeletorString);
			//
			// var nettTotal = $(rowSeletorString).text();
			//
			// tmp.rowX = rowSeletorString;
			//
			// tmp.rowNettTotal = nettTotal;
			//
			// return tmp;

			test.comment($('h1').text());

			return {};
		});

		// var info = {
		// 	rowX : 'table#dataTable > tbody',
		// 	rowNettTotal: '$345'
		// };

		// casperjs
		casperjs.click(info.rowX);

		casperjs.then(function(){
			//need force wait more than 5000ms
			casperjs.waitForUrl(/daily_reports\/[0-9]+/, function(){

			});
		});

	});
};

module.exports = dailyReports;