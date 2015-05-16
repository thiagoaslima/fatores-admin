;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.factory('atividadesModel', [
			'Entidade',
			model
		]);

	function model(Entidade) {

		function Atividade(obj) {
			Entidade.call(this, obj);

			this.Nome = "";
			this.Descricao = "";
			this.AtividadeId = null;
			this.Cor = "";
			this.DuracaoMinima = 0;
			this.DuracaoMaxima = 0;
			this.AtividadesFilhas = [];

			angular.extend(this, obj);

			return this;
		}

		return Atividade;
	}

})(angular);
