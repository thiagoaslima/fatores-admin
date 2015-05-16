;(function (angular, undefined) {
	'use strict';
	
	angular
		.module('app.directives')
		.directive('collapseButton', directive);
		
	function directive() {
		
		var template = [
				'<span class="collapse_button" ng-click="dadosCadastraisCollapsed = !dadosCadastraisCollapsed">',
					'<svg class="btn-collapse" ng-class="{\'closed\': dadosCadastraisCollapsed}">',
						'<use xlink:href="#arrow-down" />',
					'</svg>',
				'</span>'
			].join('');
		
		return {
			restrict: 'AE',
			template: template,
			link: function(scope, element, attrs) {
				var prop = attrs.scopeProp || attrs.collapseButton;
				
				if (typeof attrs.startsClosed !== 'undefined') {
					scope.$parent[prop] = true;
				}
				
				element.on('click', function(evt) {
					return scope.$apply(function() {
						return scope.$parent[prop] = !scope.$parent[prop];
					});
				});
			}
		}
	}
}(angular));