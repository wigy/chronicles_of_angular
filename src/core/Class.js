(function() {

    var module = angular.module('coa.core');

    module.factory('Class', [function() {

        /**
         * @ngdoc object
         * @name coa.core.class:Class
         * @description
         *
         * A base class for all other classes.
         */
        function Class() {
        }

        Class.prototype = {};

        return Class;
    }]);

})();
