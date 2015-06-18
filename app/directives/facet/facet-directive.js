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

					if(value.includes('Up To')) {
						var start = str.indexOf('[') + 2;
						var end = str.indexOf(']');

						value = parseInt(value.substr(start, end - start));
					}

					$scope.$emit('facetClick', field, value);
				};

				$scope.elementId = function(name, id) {
					var returnStr="";

					returnStr += name.replace(/ /g, '-'); //IDs and Class names should use hyphens as CSS is hyphen-delimited syntax

					if(id) {
						returnStr += '-' + id;
					}

					return returnStr;
				};

				$scope.buildFieldDesc = function(str) {

					var start = str.indexOf('[') + 2;
					var end = str.indexOf(']');
					var endValue = str.substr(start, end - start);
					var startValue = parseInt(endValue) - 99;

					return '$' + startValue + ' - ' + '$' + endValue;
				};

				$scope.getFacetValue = function(str) {

					var start = str.indexOf('[') + 2;
					var end = str.indexOf(']');

					return str.substr(start, end - start);
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
