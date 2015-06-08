'use strict';

angular.module('searchApp', [
	'ngRoute',
	'pages.search',
	'resources.search'
])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/search'});
}])
	.constant('searchUrl', 'resources/search/mock-search-results.json');
