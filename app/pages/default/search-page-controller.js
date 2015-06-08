(function() {
	'use strict';

	angular.module('pages.search')
		.controller('searchPageController', ['$scope', 'searchResource', SearchPageController]);

	function SearchPageController($scope, searchResource) {

		$scope.searchTerm = null;

		// "click" function of the search button on the UI
		$scope.search = function() {

			searchResource.query($scope.searchTerm).then(function(results) {
				$scope.results = results;
			});

		};
	}

})();
