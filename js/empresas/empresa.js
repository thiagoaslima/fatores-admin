;
(function (angular, undefined) {
	'use strict';
	angular
		.module('app.models')
		.factory('Empresa', ['Entidade', empresa]);

	function empresa(Entidade) {

		function Empresa(obj) {
			Entidade.call(this, obj);

			this.RazaoSocial = '';
			this.CNPJ = '';
			this.Endereco = '';
			this.EnderecoNumero = '';
			this.EnderecoComplemento = '';
			this.EnderecoLocalidade = '';
			this.EnderecoUF = "";
			this.EnderecoCEP = '';
			this.QuantidadeFuncionarios = 0;
			this.InformacoesComplementares = null;
			this.PorteEmpresaId = 0;
			this.AreaAtuacaoId = 0;
			this.Status = false;
			this.UserId = "";
			
			angular.extend(this, obj);
			return this;
		}

		/*
		 * prototype
		 * ----------------------------------------------------------
		 */

		var API_ADDRESS = 'Empresas';
		Entidade.bindAPI(Empresa.prototype, API_ADDRESS);

		/////////////////////////////////////

		return Empresa;
	}
})(window.angular);