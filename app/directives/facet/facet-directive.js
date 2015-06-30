(function() {
	'use strict';

	angular.module('directives.facet', ['services.selectedFacets'])
		.directive('searchFacet', SearchFacet);

	function SearchFacet() {

		return {
			restrict: 'E',
			templateUrl: 'directives/facet/facet-template.html',
			scope: {
				facets: '=facetItems'
			},
			controller: 'facetController'
		}
	}

})();
