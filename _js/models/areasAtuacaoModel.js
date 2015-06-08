;(function (angular, undefined) {
	'use strict';
	
	angular
		.module('app.models')
		.factory('areasAtuacaoModel', [
			'Entidade', 
			model
		]);
	
	function model(Entidade) {
		
		function AreaAtuacao(obj) {
			Entidade.call(this, obj);
			
			this.Nome = '';
			this.Descricao = '';
			this.Status = false;
			
			angular.extend(this, obj);
			return this;
		}
		
		return AreaAtuacao;
	}
	
})(window.angular);