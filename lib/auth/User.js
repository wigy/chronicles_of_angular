(function() {

	var module = angular.module('coa.auth', ['coa.data']);

	module.factory('User', ['Type', function(Type) {

		function User(data) {
			// Name of the user.
			this.name = null;

			this.init(data);
		}

		User.prototype = new Type({'name' : {}});

		return User;
	}]);

})();
