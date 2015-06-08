;(function(angular, undefined) {
	'use strict';
	
	angular
		.module('app.controllers')
		.controller('loginController', [
			'$scope',
			'$window',
			'$sce',
			'$http',
			'page',
			controller
		])
		;
		
	function controller ($scope, $window, $sce, $http, page) {
		var doc = $window.document;
		var frag = doc.createDocumentFragment();
		var div = doc.createElement('div');
		frag.appendChild(div);
		
		var idx = page.indexOf('<body');
		page = page.substr(idx);
		page = page.replace(/<body[^>]*>/ , '').replace('</body>', '').replace('</html>', '').trim();
		div.innerHTML = page;
		
		var form = div.querySelector('form');
		form.setAttribute('id', 'login-screen-form');
		var h4 = div.getElementsByTagName('h4')[0];
		var p = div.getElementsByTagName('p')[0];
		h4.parentNode.removeChild(h4);
		p.parentNode.removeChild(p);
		
		var submit = form.querySelector('[type="submit"]');
		submit.setAttribute('type', 'button');
		submit.setAttribute('id', 'submit-login-btn');
		
		var hidden = form.querySelector('[type="hidden"]');
		var token = hidden.getAttribute('value');
		
		var div2 = doc.createElement('div');
		div2.appendChild(form);
		
		form.removeAttribute('action');
		form.removeAttribute('method');
		
		$scope.formulario = $sce.trustAsHtml(div2.innerHTML);
		
		
			
			$http.post('https://fatoresweb.azurewebsites.net/Account/Login', {
					'__RequestVerificationToken': token,
					'UserName': 'thlima',
					'Password': 'thlima'
				
			}).then(function(resp) {
				console.log(resp);
			});
		
	}
	
 })(angular);
