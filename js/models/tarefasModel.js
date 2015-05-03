;
(function (angular, undefined) {
	'use strict';

	'use strict';

	angular
		.module('app.models')
		.factory('tarefasModel', [
			'Entidade',
			model
		]);

	function model(Entidade) {

		var dateProperties = ['InicioExecucao', 'FimExecucao'];

		function Tarefa(obj) {
			Entidade.call(this, obj, dateProperties);

			this.Nome = '';
			this.Descricao = '';
			this.UnidadeMedida = ""; 
			this.UnidadeMedida2 = "";
			this.UnidadeMedida3 = "";
			this.LevantamentoCiclico = false;
			this.Ciclica = false;
			this.DiasCiclo = 0;
			this.CicloVariavel = false;

			this.Empresas = [];
			this.Funcoes = [];
			this.FuncoesInativas = [];
			this.CenariosValor = [];
			this.CenariosValorInativos = [];
			this.AtributosProducao = [];
			this.AtributosProducaoInativos = [];
			this.AtividadesTarefa = [];
			this.Usuarios = [];
			
			angular.extend(this, obj);
			
			return this;
		}
		
		return Tarefa;
	}

})(angular);
