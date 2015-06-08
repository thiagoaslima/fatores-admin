/* globals angular:false */
;(function(angular) {
	'use strict';
	
	angular
		.module('app.services')
		.service('CardService', service);
		
	function service() {
		var Card = {
			_type: 'none',
			_prop: 'none',
			_valores: [],
			_lastValores: [],

			Id: 0,
			Nome: '',
			Cenario: null,
			Model: null,

			set: function (prop, value) {
				this[prop] = value;
			},

			get Type() {
				return this._type || 'none';
			},

			set Type(str) {
				if (['atributo', 'cenario', 'none'].indexOf(str) < 0) {
					throw new Error('Invalid Type Value:' + str);
				}

				var valores = angular.copy(this.Valores);
				removeValoresOnModel.call(this, valores);

				this._type = str;
				this.Prop = str;
				includeValoresOnModel.call(this, valores);

				return str;
			},

			get Prop() {
				return this._prop || 'none';
			},

			set Prop(str) {
				var values = {
					'none': function () {
						return 'none';
					},
					'cenario': function () {
						return 'CenariosValor';
					},
					'atributo': function () {
						return 'AtributosProducao';
					},
					'error': function () {
						throw new Error('Invalid Type Value:' + str);
					}
				};

				this._prop = values[str]();
				return this._prop;
			},

			get Valores() {
				return this._valores || [];
			},
			set Valores(array) {
				var _this = this;

				var unselectedValues = this._lastValores.filter(function (id) {
					return array.indexOf(id) === -1;
				});
				var selectedValues = array.filter(function (id) {
					return _this._lastValores.indexOf(id) === -1;
				});

				removeValoresOnModel.call(this, unselectedValues);
				includeValoresOnModel.call(this, selectedValues);

				this._valores = array;
				this._lastValores = this._valores.slice();

				return this._valores;
			}
		};
		
		// functions
		// --------------------------------------------------

		function removeValoresOnModel(valores) {
			var prop = this.Prop;
			var model = this.Model;
			
			if (prop === 'none') {
				return;
			}

			valores.forEach(function (id) {
				var idx = model[prop].indexOf(id);
				if (idx > -1) {
					model[prop].splice(idx, 1);
				}
			});

			return model[prop].sort(function (a, b) {
				return b - a >= 0 ? -1 : 1;
			});
		}

		function includeValoresOnModel(valores) {
			var prop = this.Prop;
			var model = this.Model;
			
			if (prop === 'none') {
				return;
			}

			valores.forEach(function (id) {
				var idx = model[prop].indexOf(id);
				if (idx === -1) {
					model[prop].push(id);
				}
			});

			return model[prop].sort(function (a, b) {
				return b - a >= 0 ? -1 : 1;
			});
		}
		
		return Card;
	}
})(angular);