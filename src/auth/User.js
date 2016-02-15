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
        * @description
        *
        * A class describing user data.
        */
        User = function(data) {
            this.init(data);
        };

        User.prototype = new Data('coa.auth.User', [
            {name: {type: TypeStr, options: {required: true}}}
        ]);

        return User;
    }]);

})();
