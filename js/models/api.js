;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.service('API', ['$http', 'DB_URL', api]);

	function api($http, DB_URL) {
		
		function API() {
			this.functions = ['save', 'get', 'query'];
			return this;
		}
		
		/*
		 * prototype methods
		 * ----------------------------------------------------------
		 */
		Object.cefen.defineMethods(API.prototype, [
			save,
			get,
			query
		]);
		
		
		/*
		 * internal methods
		 * ----------------------------------------------------------
		 */

		function save(url) {
			return $http({
				method: 'POST',
				url: DB_URL + url,
				data: this
			});
		}

		function get(url, id, params) {
			return $http({
				method: 'GET',
				url: id ? DB_URL + url + '(' + id + ')' : DB_URL + url,
				params: params || {}
			}).then(function(resp) {
				return resp.data.value;
			 });
		}
		
		function query(url, params) {
			return get(url, null, params);
		}
		
		///////////////////////////////////////////////////////
		
		return API;
		
	}
})(window.angular);