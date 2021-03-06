var casperjs = casper;

var dailyReports = function(test, $){
	//test analysis on daily_report
	var reportInfo,
		orderInfo;
	casperjs.thenOpen('http://pos.hoicard.com/cms/v2/daily_reports', function(){
		test.assertUrlMatch(/daily_reports/, 'Go to daily_reports');
		//casperjs evaluate = crawler through DOM
		reportInfo = casperjs.evaluate(function(){
			var tmp = {};
			tmp.heading1 = $('h1').text();

			var nettTotalIndex = 3;

			var numberOfRowData = 10;

			// //random row index, obmit the first one
			// //css nth-child start at 1
			var randomRowIndex = Math.floor((Math.random() * numberOfRowData) + 2);

			var rowSeletorString = 'table#dataTable > tbody ' +
				'tr:nth-child(' + randomRowIndex + ') ' +
				'td:nth-child(' + nettTotalIndex + ')';

			var nettTotal = $(rowSeletorString).text();

			tmp.rowX = rowSeletorString;

			tmp.rowNettTotal = nettTotal;

			return tmp;
		});

		test.comment('heading1: ' + reportInfo.heading1);
		test.comment('rowX: ' + reportInfo.rowX);
		test.comment('td: ' + reportInfo.rowNettTotal);
	});

	casperjs.then(function(){
		test.comment('click on report, rowX: ' + reportInfo.rowX);
		test.comment('report built quite long, waitTimeout: 10000');
		casperjs.click(reportInfo.rowX);
	});

	casperjs.then(function(){
		casperjs.waitTimeout = 10000;
		//need force wait more than 5000ms
		casperjs.waitForUrl(/daily_reports\/[0-9]+/, function(){
			test.assertUrlMatch(/daily_reports\/[0-9]+/, 'Go to daily_reports/XXX success');
			//reset as normal
			casperjs.waitTimeout = 5000;
			// test.assertTextExists(reportInfo.rowNettTotal, 'Nett Total matched, ' + reportInfo.rowNettTotal);
			test.assertSelectorHasText('#nett_total', reportInfo.rowNettTotal, 'Nett Total matched, ' + reportInfo.rowNettTotal);

			orderInfo = casperjs.evaluate(function(){
				var tmp = {};

				var numberOfRowData = 10;

				// //random row index, obmit the first one
				// //css nth-child start at 1
				var randomRowIndex = Math.floor((Math.random() * numberOfRowData) + 2);

				var tableHeaderStr = 'table#reportOrdersDataTable > thead > tr';

				var tableHeader = $(tableHeaderStr);

				var totalHeaderIndex = 0;
				var idHeaderIndex = 0;

				$.each(tableHeader.find('th'), function(index, th){
					// console.log(value.textContent);
					if(th.textContent == 'Total'){
						totalHeaderIndex = index;
					}

					if(th.textContent == 'ID'){
						idHeaderIndex = index;
					}
				})

				var rowSeletorString = 'table#reportOrdersDataTable > tbody ' +
					'tr:nth-child(' + randomRowIndex + ')';

				var order = $(rowSeletorString);

				// tmp.id = order.find('td:nth-child(2)').text();
				tmp.id = order.find('td:nth-child(' + (idHeaderIndex + 1) +')').text();

				tmp.total = order.find('td:nth-child(' + (totalHeaderIndex + 1) + ')').text();

				tmp.rowX = rowSeletorString;

				// tmp.id = 628361287;
				// tmp.total = 823749;

				tmp.rowX =rowSeletorString;

				return tmp;
			});

			test.comment('order id: ' + orderInfo.id);
			test.comment('order total: ' + orderInfo.total);
			test.comment('order, rowX: ' + orderInfo.rowX);
		});
	});

	casperjs.then(function(){
		test.comment('click on order, rowX: ' + orderInfo.rowX);
		casperjs.click(orderInfo.rowX);
	});

	casperjs.then(function(){
		casperjs.waitUntilVisible('#orderModal', function(){
			test.assertVisible('#orderModal', 'Order modal: poped up');
			test.assertSelectorHasText(
				'#order-id', orderInfo.id,
				'orderInfo.id matched, ' + orderInfo.id
			);

			test.assertSelectorHasText(
				'#order-total', orderInfo.total,
				'orderInfo.total matched, ' + orderInfo.total
			);

		});
	});
};

module.exports = dailyReports;




























