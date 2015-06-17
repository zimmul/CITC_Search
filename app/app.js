'use strict';

angular.module('searchApp', [
	'ngRoute',
	'camelCaseToHuman',
	'directives.facet',
	'pages.search',
	'resources.search'
])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/search'});
}])
	.constant('searchUrl', 'resources/search/test-search-results.json');
