(function() {

    var module = angular.module('coa.auth');

    module.factory('User', ['Data', 'TypeStr', function(Data, TypeStr) {

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

        User.prototype = new Data('User', 'coa.auth', [{name: {type: TypeStr}}]);

        return User;
    }]);

})();
