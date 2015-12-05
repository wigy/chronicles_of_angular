(function() {

    var module = angular.module('coa.auth');

    module.factory('User', ['Type', function(Type) {

        /**
         * @ngdoc object
         * @name coa.auth.class:User
         * @description
         *
         * A class describing user data.
         */
        function User(data) {
            // Name of the user.
            this.name = null;

            this.init(data);
        }

        User.prototype = new Type({'name' : {}});

        return User;
    }]);

})();
