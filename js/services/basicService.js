;(function (angular, undefined) {
	'use strict';

	angular
		.module('app.services')
		.service('BasicService', [
			'$q',
			'API',
			'isFilter',
			'sortFilter',
			srv
		]);

	function srv($q, API, is, sort) {

		/*
		 * BasicService
		 * @get {object}	obj.Model -> construtor da entidade
		 *					obj.url -> endereço da entidade
		 *					obj.nameProp -> propriedade onde fica o nome
		 */
		function BasicService(obj) {
			this._map = {};
			this._list = [];

			this.nameProp = obj.nameProp || "Nome";
			setModel(this, obj.Model);
			setAPI(this, obj.url);

			return this;
		}

		function setModel(_this, Model) {
			_this.new = Model ? newInstance : angular.noop;
			_this.modelName = Model ? Model.name.toLowerCase() : '';
			return _this;

			function newInstance(obj) {
				return _this.queue(new Model(obj));
			}
		}

		function setAPI(_this, url) {
			if (url) {
				_this.api = new API(url);
			}
			return _this;
		}



		// Prototype
		// ------------------------------------------------------------

		Object.cefen.defineMethods(BasicService.prototype, [
			query,
			get,
			save,
			update,
			[erase, 'delete'],
			queue,
			unqueue
		]);


		function query(params, force) {
			var _this = this;

			var defer = $q.defer();
			var createInstance = _createInstance.bind(_this);
			var updateList = _updateList.bind(_this);

			_this.api.listar(params).then(function(resp){
				defer.resolve(resp);
			});
			/*
			var promise = _this.api.listar(params).then(createInstance);
			var resp = $q.when(promise).then(updateList);
			defer.resolve(resp);
			*/
			return defer.promise;
		}

		function get(id, params, force) {
			var _this = this;

			if (!force && _this._map[id]) {
				return _this._map[id];
			}

			var defer = $q.defer();
			var createInstance = _createInstance.bind(_this);
			var updateList = _updateList.bind(_this);
			var returnInstance = get.bind(_this, id);

			var promise = _this.api.detalhar(id, params).then(createInstance);
			defer.resolve($q.when(promise).then(updateList).then(returnInstance));
			return defer.promise;
		}

		function save(obj) {
			var _this = this;
			var id = obj.Id;

			var createInstance = _createInstance.bind(_this);
			var updateList = _updateList.bind(_this);
			var returnInstance = get.bind(_this, id);
			var retrieveInstance = get.bind(_this, id, {}, true);

			return _this.api.save(obj)
				.then(createInstance)
				.then(updateList)
				.then(returnInstance)
				.catch(retrieveInstance);
		}

		function update(obj) {
			var _this = this;
			var id = obj.Id;

			var createInstance = _createInstance.bind(_this);
			var updateList = _updateList.bind(_this);
			var returnInstance = get.bind(_this, id);
			var retrieveInstance = get.bind(_this, id, {}, true);

			return _this.api.update(obj)
				.then(createInstance)
				.then(updateList)
				.then(returnInstance)
				.catch(retrieveInstance);
		}

		function erase(obj) {
			var _this = this;
			var id = obj.Id;

			var createInstance = _createInstance.bind(_this);
			var updateList = _updateList.bind(_this);
			var returnEmpty = function () {
				return null;
			};
			var retrieveInstance = get.bind(_this, id, {}, true);

			return _this.api.delete(obj)
				.then(_this.unqueue)
				.then(updateList)
				.then(returnEmpty)
				.catch(retrieveInstance);
		}

		function queue(instance) {
			this._map[instance.Id] = instance;
			return instance;
		}

		function unqueue(instance) {
			this._map[instance.Id] = null;
			return instance;
		}



		// Low-level functions
		// ------------------------------------------------------------

		function _createInstance(array) {
			var _this = this;
			array = is.array(array) ? array : [array];

			array.forEach(function (empresa) {
				_this.new(empresa);
			});
			
			return array;
		}

		function _updateList() {
			_eraseList.call(this);
			return _buildList.call(this);
		}

		function _eraseList() {
			this._list = [];
			return this._list;
		}

		function _buildList() {
			var _this = this;

			var _list = Object.keys(_this._map).map(function (id) {
				return _this._map[id];
			}).filter(function (item) {
				return !!item;
			});

			_this._list = sort(_list, _this.nameProp);
			return _this._list;
		}
		
			
		function respData(resp) {
			return (resp.data) ? resp.data.value || resp.data : resp;
		}

		function respError(error) {
			return error;
		}
		
		return BasicService;
	}

})(angular);
