;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.factory('atividadesEmpresaModel', [
			'Entidade',
			model
		]);

	function model(Entidade) {

		function AtividadeEmpresa(obj) {
			Entidade.call(this, obj);

			this.Nome = '';
			this.Descricao = '';
			this.Status = false;

			angular.extend(this, obj);
			return this;
		}

		return AtividadeEmpresa;
	}

})(window.angular);