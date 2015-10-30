(function() {

	var module = angular.module('coa.data', []);

	// TODO: Document code conventions (Uppercase models, module directories).
	// TODO: Model template generator for Grunt.

	module.factory('Type', [function() {

		function Type(data) {
		};

		Type.prototype = new Object();

		Type.prototype.init = function(data) {
			// TODO: Implement.
			d(data);
		};

		return Type;
	}]);

})();
