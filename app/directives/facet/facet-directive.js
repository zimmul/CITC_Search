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
				var currentFacet = null;

				$scope.choose = function(event, field, value) {
					refreshChecked(event, field, value);
					$scope.$emit('facetClick', field, value);
				};

				$scope.elementId = function(name, id) {
					var returnStr="";
					returnStr += name.replace(/ /g, '-'); //IDs and Class names should use hyphens as CSS is hyphen-delimited syntax
					returnStr += '-' + id;
					return returnStr;
				};

				var refreshChecked = function(event, field, value) {

					if(event.toElement.id === currentFacet) {
						event.toElement.checked = false;
						currentFacet = null;
						return;
					}

					var elements = angular.element('.facet-detail > input');
					var selectedFacet = field + '-' + value;
					var i= 0, j=elements.length;

					for(i; i<j; i++) {
						var input = elements[i];
						if (selectedFacet !== input.id)
							input.checked = false;
					}
					currentFacet = selectedFacet;
				}
			}
		}
	}

})();
