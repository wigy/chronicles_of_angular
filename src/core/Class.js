(function() {

    var module = angular.module('coa.core');

    var Class;

    module.factory('Class', [function() {

        if (Class) {
            return Class;
        }

        /**
        * @ngdoc function
        * @name coa.core.class:Class
        * @description
        *
        * A base class for all other classes.
        */
        Class = function() {
        };

        Class.prototype = {};

        return Class;
    }]);

})();
