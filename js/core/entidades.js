;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.core')
		.constant('entidades', [
			{
				Nome: "Atividades",
				Alias: 'atividades',
				Href: "atividades",
				UI: true,
				ListOnSidebar: true,
				Hierarchical: true,
				HierarchyBy: 'AtividadeId',
				filterSubmodel: [{
					model: 'Atividades',
					relation: 'direct',
					filterBy: 'AtividadeFilhas'
				}]
			},
			{
				Nome: "AtividadesTarefa",
				Alias: 'atividadesTarefa',
				Href: "atividadestarefa",
				UI: false,
				ListOnSidebar: false,
				Hierarchical: false
			},
			{
				Nome: "AtividadesEmpresa",
				Alias: "atividadesEmpresa",
				Href: "atividadesempresa",
				UI: false,
				ListOnSidebar: false,
				Hierarchical: false
			},
			{
				Nome: "Areas de Atuação",
				Alias: 'areasAtuacao',
				Href: "areasatuacao",
				UI: true,
				ListOnSidebar: false,
				Hierarchical: false
			},
			{
				Nome: "Empresas",
				Alias: 'empresas',
				Href: "empresas",
				UI: true,
				ListOnSidebar: true,
				Hierarchical: false
			},
			{
				Nome: "Cenários",
				Alias: "cenarios",
				Href: "cenarios",
				UI: true,
				ListOnSidebar: true,
				Hierarchical: false
			},
			{
				Nome: "Relação Cenários e Dia",
				Alias: "cenariosDia",
				Href: "cenariosdia",
				UI: false,
				ListOnSidebar: false,
				Hierarchical: false
			},
			{
				Nome: "Relação Cenário e Valores",
				Alias: "cenarioValores",
				Href: "cenariovalores",
				UI: false,
				ListOnSidebar: false,
				Hierarchical: false
			},
			{
				Nome: "Funções",
				Alias: "funcoes",
				Href: "funcoes",
				UI: true,
				ListOnSidebar: true,
				Hierarchical: false
			},
			{
				Nome: "Levantamentos",
				Alias: "levantamentos",
				Href: "levantamentos",
				UI: false,
				ListOnSidebar: false,
				Hierarchical: false
			},
			{
				Nome: "Obras",
				Alias: "obras",
				Href: "obras",
				UI: true,
				ListOnSidebar: false,
				Hierarchical: true,
				HierarchyBy: 'ObraId'
			},
			{
				Nome: "Portes de Empresas",
				Alias: "portesEmpresa",
				Href: "portesempresa",
				UI: true,
				ListOnSidebar: false,
				Hierarchical: false
			},
			{
				Nome: "Usuários",
				Alias: "usuarios",
				Href: "usuarios",
				UI: true,
				ListOnSidebar: true,
				Hierarchical: false
			},
			{
				Nome: "Serviços Prestados",
				Alias: "servicosPrestados",
				Href: "servicosprestados",
				UI: false,
				ListOnSidebar: false,
				Hierarchical: false
			},
			{
				Nome: "Setores de Atuacao",
				Alias: "setoresAtuacao",
				Href: "setoresatuacao",
				UI: false,
				ListOnSidebar: false,
				Hierarchical: false
			},
			{
				Nome: "Tarefas",
				Alias: "tarefas",
				Href: "tarefas",
				UI: true,
				ListOnSidebar: true,
				Hierarchical: false,
				filterSubmodel: [{
					model: 'Atividades',
					relation: 'indirect',
					filterBy: 'AtividadesTarefa'
				}, {
					model: 'Atributos',
					relation: 'indirect',
					filterBy: 'AtributosProducao'
				}, {
					model: 'Cenario',
					relation: 'indirect',
					filterBy: 'CenariosValor'
				}]
			},
			{
				Nome: "Padrões de Obra",
				Alias: "padroesObra",
				Href: "padroesobra",
				UI: true,
				ListOnSidebar: false,
				Hierarchical: false
			},
			{
				Nome: "TiposObra",
				Alias: "tiposObra",
				Href: "tiposobra",
				UI: true,
				ListOnSidebar: false,
				Hierarchical: false
			},
			{
				Nome: "Tokens",
				Alias: "tokens",
				Href: "tokens",
				UI: false,
				ListOnSidebar: false,
				Hierarchical: false
			}
		])
		;

})(angular);
