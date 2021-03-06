(function() {
	'use strict';

	angular.module('pages.search', ['resources.search', 'datatables', 'services.selectedFacets'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/search', {
				templateUrl: 'app/pages/default/search-page-template.html',
				controller: 'searchPageController'
			});
		}]);
})();
