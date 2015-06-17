(function() {
	'use strict';

	angular.module('pages.search')
		.controller('searchPageController', ['$scope', 'searchResource', 'DTOptionsBuilder', 'DTColumnBuilder', SearchPageController]);

	function SearchPageController($scope, searchResource, DTOptionsBuilder, DTColumnBuilder) {

		$scope.searchTerm = null;

		// "click" function of the search button on the UI
		$scope.search = function() {

			searchResource.query($scope.searchTerm).then(function(results) {
				var resultsObj = results[0];
				$scope.results = resultsObj.entries;
				$scope.facets = buildFacetData(resultsObj.facetFields);
			});

		};

		$scope.dtOptions = DTOptionsBuilder.newOptions()
			.withDOM('<"row"<"col-xs-6"<"pull-left"i>><"col-xs-6"<"pull-right"l>>><"row"<"col-xs-12"<"table-responsive"rt>>><"row row-padding"<"col-xs-12"<"pull-right"p>>>')
			.withPaginationType('full_numbers')
			.withDisplayLength(10)
			.withBootstrap()
			//.withOption('oLanguage', {
			//	"sSearch": "Search",
			//	"sShow": "Show",
			//	"oPaginate": {
			//		"sFirst": "First",
			//		"sPrevious": "Previous",
			//		"sNext": "Next",
			//		"sLast": "Last"
			//	},
			//	"sInfo": "Showing" +" _START_ to _END_ of _TOTAL_ "+ "entries",
			//	"sLengthMenu":"Show" +" _MENU_ " +"Items Per Page"
			//})
		;

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
