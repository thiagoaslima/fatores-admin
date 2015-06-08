;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.factory('cenarioValoresModel', [
			'Entidade',
			model
		]);

	function model(Entidade) {

		function CenarioValor(obj) {
			Entidade.call(this, obj);

			this.Nome = "";
			this.Descricao = "";
			this.CenarioId = null;

			angular.extend(this, obj);

			return this;
		}

		return CenarioValor;
	}

})(angular);
