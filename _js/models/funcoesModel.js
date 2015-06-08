;(function(angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.factory('funcoesModel', [
			'Entidade',
			model
		]);
		
	function model(Entidade) {
		
		function Funcao(obj) {
			Entidade.call(this, obj);
			
			this.Nome = '';
			this.Descricao = '';
			this.Peso = 0;
			this.Usuario = null;
			this.Tarefas = [];
			this.TarefasInativas = [];
			this.Levantamentos = [];
			
			angular.extend(this, obj);
			
			return this;
		}
		
		return Funcao;
	}
	
 })(angular);
