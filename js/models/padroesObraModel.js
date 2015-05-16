;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.factory('padroesObraModel', [
			'Entidade', 
			model
		]);

	function model(Entidade) {

		function PadroesObra(obj) {
			Entidade.call(this, obj);

			this.Nome = '';
			this.Descricao = '';
			this.Status = false;

			angular.extend(this, obj);
			return this;
		}

		return PadroesObra;
	}

})(window.angular);