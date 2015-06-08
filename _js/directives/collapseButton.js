;(function (angular, undefined) {
	'use strict';
	
	angular
		.module('app.directives')
		.directive('collapseButton', directive);
		
	function directive() {
		
		var template = [
				'<span class="collapse_button">',
					'<svg class="btn-collapse">',
						'<use xlink:href="#arrow-down" />',
					'</svg>',
				'</span>'
			].join('');
		
		return {
			restrict: 'AE',
			template: template,
			link: function(scope, element, attrs) {
				var prop = attrs.scopeProp || attrs.collapseButton;
				var svg = element.find('svg');
				var isClosed = false;
				
				if (typeof attrs.startsClosed !== 'undefined') {
					isClosed = true;
					svg.addClass('closed');
					scope.$parent[prop] = isClosed;
				}
				
				element.on('click', function(evt) {
					isClosed = !isClosed;
					
					if (isClosed) {
						svg.addClass('closed');
					} else {
						svg.removeClass('closed');
					}
					
					return scope.$apply(function() {
						return scope.$parent[prop] = isClosed;
					});
				});
			}
		}
	}
}(angular));