;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.factory('portesEmpresaModel', [
			'Entidade', 
			model
		]);

	function model(Entidade) {

		function PorteEmpresa(obj) {
			Entidade.call(this, obj);

			this.Nome = '';
			this.Descricao = '';
			this.Status = false;

			angular.extend(this, obj);
			return this;
		}

		return PorteEmpresa;
	}

})(window.angular);