;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.factory('usuariosModel', [
			'Entidade',
			model
		]);

	function model(Entidade) {

		function Usuario(obj) {
			Entidade.call(this, obj);

			this.UserName = "";
			this.Email = "";
			this.Password = null;
			this.Status = false,
			this.EmpresasAutorizadas = [];
			this.ObrasAutorizadas = [];
			this.TarefasAutorizadas = [];

			angular.extend(this, obj);
			if (this.UserName) {
				this.Nome = this.UserName;
			}
			
			return this;
		}

		return Usuario;

	}

})(angular);
