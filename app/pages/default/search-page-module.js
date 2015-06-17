(function() {
	'use strict';

	angular.module('pages.search', ['resources.search', 'datatables'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/search', {
				templateUrl: 'pages/default/search-page-template.html',
				controller: 'searchPageController'
			});
		}]);
})();
