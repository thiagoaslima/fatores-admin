;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.factory('obrasModel', [
			'Entidade',
			model
		]);

	function model(Entidade) {

		var dateProperties = ['InicioExecucao', 'FimExecucao'];

		function Obra(obj) {
			Entidade.call(this, obj, dateProperties);

			this.Nome = '';
			this.AreaTotalConstruida = 0;
			this.VGV = 0;
			this.Descricao = "Porto Atlantico";
			this.NumeroBlocos = 0;
			this.InicioExecucao = "/Date(1414540929080)/";
			this.FimExecucao = "/Date(1485648129080)/";
			this.QuantidadeFuncionarios = 0;
			this.PadraoObraId = null;
			this.TipoObraId = null;
			this.EmpresaId = null;

			this.ObraId = null;
			this.Contratadas = [];
			this.ObrasFilhas = [];
			this.CenariosValor = [];
			this.CenariosValorInativos = [];
			this.Usuarios = [];
			
			angular.extend(this, obj);
			
			return this;
		}
		
		return Obra;
	}

})(angular);
