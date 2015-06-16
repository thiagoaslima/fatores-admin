;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.factory('empresasModel', [
			'Entidade',
			model
		]);

	function model(Entidade) {

		function Empresa(obj) {
			Entidade.call(this, obj);

			this.RazaoSocial = '';
			this.CNPJ = '';
			this.Endereco = '';
			this.EnderecoNumero = null;
			this.EnderecoComplemento = null;
			this.EnderecoLocalidade = '';
			this.EnderecoUF = "";
			this.EnderecoCEP = '';
			this.QuantidadeFuncionarios = 0;
			this.InformacoesComplementares = null;
			this.PorteEmpresaId = 0;
			this.AreaAtuacaoId = 0;
			this.Status = false;
			
			
			this.Tarefas = [];
			this.SetoresAtuacao = [];
			this.ServicosPrestado = [];
			this.Obras = [];
			this.ObrasContratada = [];
			this.AtividadesEmpresa = [];
			this.UsuariosAutorizados = [];

			angular.extend(this, obj);
			return this;
		}

		return Empresa;

	}

})(angular);
