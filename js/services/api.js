;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.services')
		.service('API', [
			'$http',
			'DB_URL',
			'isFilter',
			api
		])
		;

	function api($http, DB_URL, is) {

		function API(url, functions) {
			this.type = '';

			this._loading = false;
			this._awaiting = [];
			this._await = _await;
			this._play = _play;
			this.functions = functions || ['save', 'update', 'get', 'query', 'delete', 'listar', 'detalhar', 'gravar', 'apagar'];
			this.bindAPI(url);
			return this;
		}

		/*
		 * prototype methods
		 * ----------------------------------------------------------
		 */
		Object.cefen.defineMethods(API.prototype, [
			bindAPI,
			save,
			update,
			get,
			query,
			[erase, 'delete'],
			// api .NET custom
			gravar,
			listar,
			detalhar,
			apagar
		]);

		/*
		 * internal methods
		 * ----------------------------------------------------------
		 */

		function _await(fn) {
			this._awaiting.push(fn);
			return this;
		}

		function _play() {
			this._awaiting.forEach(function (fn) {
				return fn();
			});
			return this;
		}

		function save(url, obj) {
			return $http({
				method: 'POST',
				url: DB_URL + url,
				data: obj
			}).then(function (resp) {
				return resp.data.value || resp.data;
			});
		}

		function update(url, obj) {
			return $http({
				method: 'PUT',
				url: DB_URL + url + '(' + obj.Id + ')',
				data: obj
			}).then(function (resp) {
				return resp.data.value || resp.data;
			});
		}

		function get(url, id, params) {
			return $http({
				method: 'GET',
				url: id ? DB_URL + url + '(' + id + ')' : DB_URL + url,
				params: params || {}
			}).then(function (resp) {
				return resp.data.value || resp.data;
			});
		}

		function query(url, params) {
			return get(url, null, params);
		}

		function erase(url, obj) {
			return $http({
				method: 'DELETE',
				url: DB_URL + url + '(' + obj.Id + ')',
				data: obj
			}).then(function (resp) {
				return resp.data.value || resp.data;
			});
		}

		function bindAPI(address) {
			var self = this;
			var fns = self.functions.map(function (fnName) {
				return [self[fnName].bind(this, address), fnName];
			});
			Object.cefen.defineMethods(self, fns);
			return self;
		}

		/**
		 * listar
		 * @param {string} url nome da entidade; ex.: empresas
		 * @param {int[], string} params array de ids ou nome da instancia
		 * @returns {promise} lista de elementos
		 */
		function listar(url, params) {
			var endpoint = DB_URL + url + '/lista';
			var data = is.array(params) ? {ids: params} :
				is.number(parseInt(params, 10)) ?
				{ids: params} : {nome: params, razaosocial: params};

			return $http({
				method: 'GET',
				url: endpoint,
				params: data
			}).then(respData).catch(respError);
		}

		function detalhar(url, id) {
			var endpoint = DB_URL + url + '/detalhes?ids=' + parseInt(id, 10);

			return $http({
				method: 'GET',
				url: endpoint
			}).then(respData).catch(respError);
		}

		function gravar(url, obj) {
			var endpoint = DB_URL + url + '/gravar';
			var data = {};
			data.obj = obj;

			return $http({
				method: 'POST',
				url: endpoint,
				params: obj
			}).success(respData).catch(respError);
		}

		function apagar(url, ids) {
			var endpoint = DB_URL + url + '/delete';
			var data = is.array(ids) ? {ids: ids} : {ids: ids};

			return $http.post(endpoint, data).success(respData).catch(respError);
		}


		///////////////////////////////////////////////////////

		function respData(resp) {
			return (resp.data) ? resp.data.value || resp.data : resp;
		}

		function respError(error) {
			return error;
		}
		
		function convertToInt(str) {
			return parseInt(str, 10);
		}

		return API;

	}
})(window.angular);