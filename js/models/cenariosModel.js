;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.factory('cenariosModel', [
			'Entidade',
			model
		]);

	function model(Entidade) {

		function Cenario(obj) {
			Entidade.call(this, obj);

			this.Nome = "";
			this.Descricao = "";
			this.Obrigatorio = false;
			this.Valores = [];

			angular.extend(this, obj);

			return this;
		}

		return Cenario;
	}

})(angular);
