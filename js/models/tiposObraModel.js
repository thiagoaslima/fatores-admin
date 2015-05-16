;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.factory('tiposObraModel', [
			'Entidade', 
			model
		]);

	function model(Entidade) {

		function TiposObra(obj) {
			Entidade.call(this, obj);

			this.Nome = '';
			this.Descricao = '';
			this.Status = false;

			angular.extend(this, obj);
			return this;
		}

		return TiposObra;
	}

})(window.angular);