(function() {
	'use strict';

	angular.module('pages.search')
		.controller('searchPageController', ['$scope', 'searchResource', SearchPageController]);

	function SearchPageController($scope, searchResource) {

		$scope.searchTerm = null;

		// "click" function of the search button on the UI
		$scope.search = function() {

			searchResource.query($scope.searchTerm).then(function(results) {
				var resultsObj = results[0];
				$scope.results = resultsObj.entries;
				$scope.facets = buildFacetData(resultsObj.facetFields);
			});

		};

		var buildFacetData = function(sourceData) {

			if(sourceData.length === 0) {
				return [];
			}

			var facets = [];
			var i = 0, j = sourceData.length;
			var starterObj = sourceData[0];
			var facetName = starterObj.fieldName;
			var facetArray = [];
			for(i; i < j; i++) {
				var obj = sourceData[i];

				if(obj.fieldName !== facetName) {
					if(facetArray !== null) {
						facets.push(facetArray);
					}

					facetArray = [];
				}
				facetArray.push(sourceData[i]);
				facetName = obj.fieldName;
			}

			facets.push(facetArray);

			return facets;
		}
	}

})();
