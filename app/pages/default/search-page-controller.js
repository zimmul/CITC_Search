(function() {
	'use strict';

	angular.module('pages.search')
		.controller('searchPageController', ['$scope', 'searchResource', 'DTOptionsBuilder', 'DTColumnBuilder', SearchPageController]);

	function SearchPageController($scope, searchResource, DTOptionsBuilder, DTColumnBuilder) {

		var originalSearchResults = [];
		var currentFacet = null;
		$scope.searchTerm = null;

		// "click" function of the search button on the UI
		$scope.search = function() {

			searchResource.query($scope.searchTerm).then(function(results) {
				var resultsObj = results[0];

				$scope.results = resultsObj.entries;
				originalSearchResults = resultsObj.entries;

				$scope.facets = buildFacetData(resultsObj.facetFields);
			});

		};

		$scope.dtOptions = DTOptionsBuilder.newOptions()
			.withDOM('<"row"<"col-xs-6"<"pull-left"i>><"col-xs-6"<"pull-right"l>>><"row"<"col-xs-12"<"table-responsive"rt>>><"row row-padding"<"col-xs-12"<"pull-right"p>>>')
			.withPaginationType('full_numbers')
			.withDisplayLength(10)
			.withBootstrap()
		;

		$scope.$on('facetClick', function(event, field, value) {
			filterResultsFromFacet(field, value);
		});

		var buildFacetData = function(sourceData) {

			if(sourceData.length === 0) {
				return [];
			}

			var facets = [];
			var pastDueFacets = [];
			var i = 0, j = sourceData.length;
			var starterObj = sourceData[0];
			var facetName = starterObj.fieldName;
			var facetArray = [];
			for(i; i < j; i++) {
				var obj = sourceData[i];

				if(obj.fieldValue.toLowerCase() === 'pastdueamount') {
					pastDueFacets.push(obj);
				} else if(obj.fieldName !== facetName) {
					if(facetArray !== null) {
						facets.push(facetArray);
					}

					facetArray = [];
				} else {
					if(obj.fieldValue !== 'data' && obj.fieldValue !== 'marketing_campaign') {
						facetArray.push(sourceData[i]);
					}
				}

				facetName = obj.fieldName;
			}

			facets.push(facetArray);
			facets.push(pastDueFacets);

			return facets;
		};

		var filterResultsFromFacet = function(facetField, facetValue) {
			var selectedFacet = facetField +'-' + facetValue;
			if(currentFacet === selectedFacet) {
				$scope.results = originalSearchResults;
				currentFacet = null;
				return;
			}

			var newResults = [];

			var i= 0, j=originalSearchResults.length;
			for(i; i < j; i++) {
				var result = originalSearchResults[i];

				if(facetField.toLowerCase() === 'pastdueamount') {
					var resultFacetField = parseFloat(result[facetField]);
					var minValue = parseInt(facetValue) - 99;
					var maxValue = parseInt(facetValue);
					if(minValue <= resultFacetField && resultFacetField <= maxValue) {
						newResults.push(result);
					}
				} else {
					var resultFacetField = result[facetField].toLowerCase();
					if(resultFacetField.includes(facetValue.toLowerCase()) ) {
						newResults.push(result);
					}
				}
			}

			currentFacet = selectedFacet;
			$scope.results = newResults;
		}
	}

})();
