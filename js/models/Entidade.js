;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.factory('Entidade', [
			'isFilter',
			'handleNetdateFilter',
			factory
		]);

	function factory(is, handleDate) {

		function Entidade(obj, array) {
			Entidade.handleDates(obj, (array || []));
			
			this.Id = (obj && obj.Id) || 0;
			this.Status = true;
			this.DataCriacao = (obj && obj.DataCriacao) || handleDate(new Date());
			this.DataAtualizacao = (obj && obj.DataAtualizacao) || handleDate(new Date());
			this.UserId = (obj && obj.UserId) || 'd01d29b0-ac15-4f00-9ab0-db224ef599d7';

			return this;
		}

		Entidade.handleDates = handleDates;
		
		function handleDates(obj, array) {
			['DataCriacao', 'DataAtualizacao'].concat(array).forEach(function(property) {
				if (obj && obj[property]) {
					obj[property] = handleDate(obj[property]);
				}
			});
			return obj;
		};

		/*
		 * private methods
		 * ----------------------------------------------------------
		 */

//		function _formatDate(value) {
//			if (!value) {
//				return false;
//			}
//
//			if (value.indexOf('\/Date(') === 0) {
//				value = value.replace('\/Date(', '').replace(')\/', '');
//				value = new Date(parseInt(value, 10));
//			}
//
//			if (!is.date(value) &&
//				!is.date.formatted.as.isoString(value)) {
//
//				throw Error(
//					'Entidade must receive a Date or an ISO String Date as parameter');
//			}
//
//			if (is.date.formatted.as.isoString(value)) {
//				return value;
//			}
//
//			return value.toISOString();
//		}

		/////////////////////////////////////////////

		return Entidade;
	}
})(window.angular);