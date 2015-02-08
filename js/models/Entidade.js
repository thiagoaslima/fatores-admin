;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.factory('Entidade', [
			'API',
			'isFilter',
			entidade
		]);

	function entidade(API, is) {

		function Entidade(obj) {
			this.Id = obj.Id || 0;
			this.DataCriacao = _format(obj.DataCriacao) || new Date();
			this.DataAtualizacao = _format(obj.DataAtualizacao) || new Date();
			return this;
		}
		
		Entidade.bindAPI = bindAPI;

		/*
		 * prototype
		 * ----------------------------------------------------------
		 */
		Entidade.prototype = Object.create(API.prototype);

		Object.cefen.defineMethods(Entidade.prototype, [
			bindAPI
		]);

		function bindAPI(obj, address, onObj) {
			var lista = new API();
			var self = this;
			var fns = lista.functions.map(function (fnName) {
				return [self.prototype[fnName].bind(null, address), fnName];
			});
			Object.cefen.defineMethods(obj, fns);
			return self;
		}


		/*
		 * private methods
		 * ----------------------------------------------------------
		 */

		function _format(value) {
			if (!value) {
				return false;
			}

			if (!is.date(value) &&
				!is.date.formatted.as.isoString(value)) {
				throw Error(
					'Entidade must receive a Date or an ISO String Date as parameter');
			}

			if (is.date.formatted.as.isoString(value)) {
				return value;
			}

			return value.toISOString();
		}

		/////////////////////////////////////////////

		return Entidade;
	}
})(window.angular);