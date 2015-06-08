(function() {
	'use strict';

	angular.module('resources.search')
		.service('searchResource', ['$resource', 'searchUrl', SearchResource]);

	/**
	 *
	 * @param $resource
	 * @param searchUrl
	 * @constructor
	 */
	function SearchResource($resource, searchUrl) {
		this.resource = $resource(searchUrl);
	}

	SearchResource.prototype.query = function(term) {
		return this.resource.query(term).$promise;
	}

})();