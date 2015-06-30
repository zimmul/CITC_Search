(function() {
	'use strict';

	angular.module('services.selectedFacets', [])
		.service('selectedFacetService', SelectedFacetService);

	function SelectedFacetService() {

		var selectedFacetArray = [];

		var findIndex = function(obj) {
			var i=0, j=selectedFacetArray.length, index = -1;

			for(i; i<j; i++) {
				var existingObj = selectedFacetArray[i];
				if(existingObj.field === obj.field && existingObj.value === obj.value) {
					index = i;
					break;
				}
			}

			return index;
		};

		return {
			addFacet: function(obj) {
				var index = findIndex(obj);

				if(index < 0) {
					selectedFacetArray.push(obj);
				}
			},

			removeFacet: function(obj) {
				var index = findIndex(obj);

				if(index >= 0) {
					selectedFacetArray.splice(index, 1);
				}
			},

			getSelected: function() {
				return selectedFacetArray;
			}
		}
	}
})();
