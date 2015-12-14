(function() {

    var module = angular.module('coa.core');

    /**
     * @ngdoc function
     * @name coa.core.class:Class
     * @description
     *
     * A base class for all other classes.
     */
    function Class() {
    }

    module.factory('Class', [function() {

        Class.prototype = {};

        return Class;
    }]);

})();
