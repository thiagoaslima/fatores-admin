;
(function () {

	if (typeof Object.prototype.cefen.defineMethods !== 'function') {

		Object.defineProperty(Object.prototype.cefen, 'defineMethods', {
			enumerable: false,
			value: defineMethods
		});

		var props = {};

		function defineMethods(obj, array) {
			array
				.map(checkArguments)
				.forEach(buildProperties);

			var resp = Object.defineProperties(obj, props);
			props = {};

			return resp;
		}

		////////////////////////////////////////////////

		function checkArguments(val) {
			if (!val.name && (val[0] && !val[0].name) && !val[1]) {
				throw new Error(
					'Function must have a name, or you should pass one as argument');
			}

			if (Array.isArray(val)) {
				return {
					fn: val[0],
					name: val[1] || val[0].name,
					enumerable: !!val[2]
				};
			}

			return {
				fn: val,
				enumerable: false,
				name: val.name
			};
		}

		function buildProperties(obj) {
			props[obj.name] = {
				value: obj.fn,
				enumerable: obj.enumerable
			};
			return props;
		}


		/*
		 * example of use 
		 * Object.defineMethods(Object.prototype, [
		 *	fn1,
		 *	[fn2, name],
		 *	[fn3, name, false]
		 * ]);
		 */
	}

})();