(function() {
	'use strict';

	angular.module('directives.facet')
		.controller('facetController', ['$scope', 'selectedFacetService', FacetController]);

	/**
	 *
	 * @param $scope
	 * @constructor
	 */
	function FacetController ($scope, selectedFacetService) {
		$scope.facetTitle = $scope.facets[0].fieldName;

		$scope.choose = function(event, field, value) {

			refreshChecked(event, field, value);
			console.log(selectedFacetService.getSelected());
			$scope.$emit('facetClick');
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

			var clickedObject = {field: field, value: value};
			var currentSelectedFacetArray = selectedFacetService.getSelected();

			var i=0, j=currentSelectedFacetArray.length;
			var index = -1;
			for(i; i<j; i++) {
				// find the item if it exists
				var obj = currentSelectedFacetArray[i];
				if(obj.field === field && obj.value === value) {
					index = i;
					break;
				}
			}

			if(index >= 0) {
				// remove the facet from the selected array
				event.toElement.checked = false;
				selectedFacetService.removeFacet(clickedObject);
			} else {
				// add the facet to the selected array
				event.toElement.checked = true;
				selectedFacetService.addFacet(clickedObject);
			}
		}
	}

})();
