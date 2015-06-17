(function() {
	'use strict';

	angular.module('directives.facet', [])
		.directive('searchFacet', SearchFacet);

	function SearchFacet() {

		return {
			restrict: 'E',
			templateUrl: 'directives/facet/facet-template.html',
			scope: {
				facets: '=facetItems'
			},
			controller: function($scope) {
				$scope.facetTitle = $scope.facets[0].fieldName;
			}
		}
	}

})();
