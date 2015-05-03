;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.core')
		.constant('entidades', [
			{
				Nome: "Atividades",
				Href: "Atividades",
				UI: true,
				ListOnSidebar: true
			},
			{
				Nome: "AtividadesTarefa",
				Href: "AtividadesTarefa",
				UI: false,
				ListOnSidebar: false
			},
			{
				Nome: "AtividadesEmpresa",
				Href: "AtividadesEmpresa",
				UI: false,
				ListOnSidebar: false
			},
			{
				Nome: "Areas de Atuação",
				Href: "AreasAtuacao",
				UI: true,
				ListOnSidebar: false
			},
			{
				Nome: "Empresas",
				Href: "Empresas",
				UI: true,
				ListOnSidebar: true
			},
			{
				Nome: "Cenários",
				Href: "Cenarios",
				UI: true,
				ListOnSidebar: true
			},
			{
				Nome: "Relação Cenários e Dia",
				Href: "CenariosDia",
				UI: false,
				ListOnSidebar: false
			},
			{
				Nome: "Relação Cenário e Valores",
				Href: "CenarioValores",
				UI: false,
				ListOnSidebar: false
			},
			{
				Nome: "Funções",
				Href: "Funcoes",
				UI: true,
				ListOnSidebar: true
			},
			{
				Nome: "Levantamentos",
				Href: "Levantamentos",
				UI: false,
				ListOnSidebar: false
			},
			{
				Nome: "Obras",
				Href: "Obras",
				UI: true,
				ListOnSidebar: true
			},
			{
				Nome: "Portes de Empresas",
				Href: "PortesEmpresa",
				UI: true,
				ListOnSidebar: false
			},
			{
				Nome: "Usuários",
				Href: "Users",
				UI: true,
				ListOnSidebar: true
			},
			{
				Nome: "IdentityUserClaims",
				Href: "IdentityUserClaims",
				UI: false,
				ListOnSidebar: false
			},
			{
				Nome: "IdentityUserLogins",
				Href: "IdentityUserLogins",
				UI: false,
				ListOnSidebar: false
			},
			{
				Nome: "IdentityUserRoles",
				Href: "IdentityUserRoles",
				UI: false,
				ListOnSidebar: false
			},
			{
				Nome: "Produções",
				Href: "Producoes",
				UI: false,
				ListOnSidebar: false
			},
			{
				Nome: "Serviços Prestados",
				Href: "ServicosPrestados",
				UI: false,
				ListOnSidebar: false
			},
			{
				Nome: "Setores de Atuacao",
				Href: "SetoresAtuacao",
				UI: false,
				ListOnSidebar: false
			},
			{
				Nome: "Tarefas",
				Href: "Tarefas",
				UI: true,
				ListOnSidebar: true
			},
			{
				Nome: "Padrões de Obra",
				Href: "PadroesObra",
				UI: true,
				ListOnSidebar: false
			},
			{
				Nome: "TiposObra",
				Href: "TiposObra",
				UI: true,
				ListOnSidebar: false
			},
			{
				Nome: "Tokens",
				Href: "Tokens",
				UI: false,
				ListOnSidebar: false
			}
		]);
		
})(angular);
