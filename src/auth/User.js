(function() {

    var module = angular.module('coa.auth');

    module.factory('User', ['Data', function(Data) {

        /**
         * @ngdoc function
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

        User.prototype = new Data({'name' : {}});

        return User;
    }]);

})();
