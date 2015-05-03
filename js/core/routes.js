;
(function (angular, undefined) {
	'use strict';
	angular
		.module('app.routes', [])
		.config([
			'$stateProvider',
			'$urlRouterProvider',
			'APP_URLS',
			routing
		])
		;

	function routing($stateProvider, $urlRouterProvider, URLS) {

		$urlRouterProvider.otherwise('/admin');
		
		$stateProvider
			.state('root', {
				url: '/admin',
				templateUrl: URLS.views.shells + 'base.html',
				controller: 'appController'
			})

			.state('model', {
				parent: 'root',
				url: '/:model/:id',
				views: {
					'model': {
						templateUrl: URLS.views.shells + 'model-shell.html',
						controller: 'modelController',
						resolve: {
							items: ['$q', '$stateParams', '$injector',
								function ($q, params, $injector) {
									var model = params.model;
									var service = $injector.get(model + 'Service');
									var defer = $q.defer();
									$q.when(service.query()).then(function (resp) {
										defer.resolve(resp, service);
									});
									return defer.promise;
								}
							]
						}
					},
					'formulario@model': {
						templateUrl: function (params) {
							return URLS.views.forms + params.model + '.html';
						},
						controllerProvider: ['$stateParams', function (params) {
								return params.model + 'Controller as ' + params.model;
							}],
						resolve: {
							modelItem: ['$q', '$stateParams', '$injector',
								function ($q, params, $injector) {
									var model = params.model;
									var id = params.id;

									if (!model || !id) {
										return;
									}

									var service = $injector.get(model + 'Service');
									var defer = $q.defer();

									if (isNaN(parseInt(id, 10))) {
										defer.resolve(service.new());
									} else {
										$q.when(service.get(id)).then(function (resp) {
											defer.resolve(resp);
										});
									}

									return defer.promise;
								}
							]
						}
					}
				}

			})

			.state('submodel', {
				parent: 'model',
				url: '/:submodel/:subid',
				views: {
					'submodel@root': {
						templateUrl: URLS.views.shells + 'submodel-shell.html',
						controller: 'submodelController',
						resolve: {
							subitems: ['$q', '$stateParams', '$injector',
								function ($q, params, $injector) {
									var model = params.submodel;

									if (!model) {
										return;
									}

									var service = $injector.get(model + 'Service');
									var defer = $q.defer();
									$q.when(service.query()).then(function (resp) {
										defer.resolve(resp);
									});
									return defer.promise;
								}
							]
						}
					},
					'formulario2@submodel': {
						templateUrl: function (params) {
							return URLS.views.forms + params.submodel + '.html';
						},
						controllerProvider: ['$stateParams', function (params) {
								return params.submodel + 'Controller as ' + params.submodel;
							}],
						resolve: {
							modelItem: ['$q', '$stateParams', '$injector',
								function ($q, params, $injector) {
									var model = params.submodel;
									var id = params.subid;

									if (!model || !id) {
										return;
									}

									var service = $injector.get(model + 'Service');
									var defer = $q.defer();

									if (isNaN(parseInt(id, 10))) {
										defer.resolve(service.new());
									} else {
										$q.when(service.get(id)).then(function (resp) {
											defer.resolve(resp);
										});
									}

									return defer.promise;
								}
							]
						}
					}
				}

			})
			;
			
	}

})(window.angular);