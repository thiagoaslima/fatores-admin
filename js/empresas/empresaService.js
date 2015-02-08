;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.factory('empresaService', [
			'Empresa',
			'isFilter',
			empresaSrv
		]);

	function empresaSrv(Empresa, is) {
		var empresas = {};

		var service = {
			new : newEmpresa,
			query: query,
			get: get,
//			post: post,
//			update: update,
//			delete: erase,

			queue: queue,
			unqueue: unqueue
		};

		////////////////////////////////

		function newEmpresa(obj) {
			return this.queue(new Empresa(obj));
		}

		function query(params) {
			return Empresa.prototype.query(params).then(_createEmpresas);
		}

		function get(id, params) {
			return empresas[id] ||
				Empresa.prototype.get(id, params).then(_createEmpresas);
		}



		function queue(empresa) {
			empresas[empresa.Id] = empresa;
			return empresa;
		}

		function unqueue(empresa) {
			empresas[empresa.Id] = null;
			return empresa;
		}

		////////////////////////////////////////////////////

		function _createEmpresas(array) {
			array.forEach(function (empresa) {
				service.new(empresa);
			});
			return empresas;
		}

		return service;
	}
})(window.angular);