(function() {
	'use strict';

	angular.module('pages.search')
		.controller('searchPageController', ['$scope', 'searchResource', 'DTOptionsBuilder', 'selectedFacetService', SearchPageController]);

	function SearchPageController($scope, searchResource, DTOptionsBuilder, selectedFacetService) {

		var originalSearchResults = [];
		$scope.searchTerm = null;

		// "click" function of the search button on the UI
		$scope.search = function() {

			selectedFacetService.reset();

			searchResource.query($scope.searchTerm).then(function(results) {
				var resultsObj = results[0];

				if(resultsObj && resultsObj.hasOwnProperty('count') && resultsObj.count > 0) {
					$scope.results = resultsObj.entries;
					originalSearchResults = resultsObj.entries;

					$scope.facets = buildFacetData(resultsObj.facetFields);
				} else {
					$scope.results = [];
				}
			});

		};

		// options to build the results datatable
		$scope.dtOptions = DTOptionsBuilder.newOptions()
			.withDOM('<"row"<"col-xs-6"<"pull-left"i>><"col-xs-6"<"pull-right"l>>><"row"<"col-xs-12"<"table-responsive"rt>>><"row row-padding"<"col-xs-12"<"pull-right"p>>>')
			.withPaginationType('full_numbers')
			.withDisplayLength(10)
			.withBootstrap()
		;

		// event listener for facet filtering
		$scope.$on('facetClick', function(event) {
			filterResultsFromFacet();
		});

		// function to build the array of filtering facet categories and items
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
					facetArray.push(obj);
				} else {
					if(obj.fieldValue !== 'data' && obj.fieldValue !== 'marketing_campaign') {
						facetArray.push(obj);
					}
				}

				facetName = obj.fieldName;
			}

			facets.push(facetArray);
			facets.push(pastDueFacets);

			return facets;
		};

		// function to filter the search results based on chosen filter facet(s)
		var filterResultsFromFacet = function() {

			var selectedFacets = selectedFacetService.getSelected();
			var newResults = [];

			if(selectedFacets.length > 0) {
				// filter results
				var j = originalSearchResults.length;
				for (var i = 0; i < j; i++) {
					var result = originalSearchResults[i];

					if (isResultMatchToFacets(selectedFacets, result) && !isItemInList(newResults, result)) {
						newResults.push(result);
					}
				}
			} else {
				// no filters applied
				newResults = originalSearchResults;
			}

			$scope.results = newResults;
		};

		// returns a boolean if the individual object fits within the array of filtering facets
		var isResultMatchToFacets = function(selectedFacets, obj) {

			var isMatch = false;

			var j=selectedFacets.length;

			for(var i = 0; i<j; i++) {
				var facet = selectedFacets[i];
				var searchResultValue = null;

				if(obj.hasOwnProperty(facet.field)) {
					if (facet.field.toLowerCase() === 'pastdueamount') {
						searchResultValue = parseFloat(obj.pastDueAmount);
						var minValue = parseInt(facet.value) - 99;
						var maxValue = parseInt(facet.value);
						if (minValue <= searchResultValue && searchResultValue <= maxValue) {
							isMatch = true;
						}
					} else {
						searchResultValue = obj[facet.field].toLowerCase();
						if (searchResultValue.includes(facet.value.toLowerCase())) {
							isMatch = true;
						}
					}
				}

			}

			return isMatch;
		};

		// checks to see if an object is already in the array
		var isItemInList = function(array, obj) {

			var j = array.length;
			for(var i=0; i<j; i++) {
				var arrayObj = array[i];

				if(isEquals(obj, arrayObj)) {
					return true;
				}
			}

			return false;
		};

		// checks to see if two objects are equal based on specific field criteria
		var isEquals = function(lhs, rhs) {

			return lhs.id === rhs.id
					&& lhs.accountId === rhs.accountId
					&& lhs.accountNumber === rhs.accountNumber
					&& lhs.firstName === rhs.firstName
					&& lhs.lastName === rhs.lastName
					&& lhs.city === rhs.city
					&& lhs.state === rhs.state
					&& lhs.zip === rhs.zip ;
		}
	}

})();
