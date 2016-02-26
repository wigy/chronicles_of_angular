(function() {

    var module = angular.module('coa.auth');

    var User;

    module.factory('User', ['Data', 'TypeStr', function(Data, TypeStr) {

        if (User) {
            return User;
        }

        /**
        * @ngdoc function
        * @name coa.auth.class:User
        * @param {Object} data Initial data:
        * <pre>
        * {
        *     // Code name of the user in lowercase.
        *     name: 'my_name'
        * }
        * </pre>
        * @description
        *
        * A class describing user data.
        */
        User = function(data) {
            this.init(data);
        };

        User.prototype = new Data([
            {name: new TypeStr({required: true})}
        ]);
        User.prototype.__class = 'coa.auth.User';

        return User;
    }]);

})();
