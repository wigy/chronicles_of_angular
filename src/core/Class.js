(function() {

    var module = angular.module('coa.core');

    module.factory('Class', [function() {

        /**
         * @memberof module:core
         * @classdesc Base class for all other classes in <i>CoA</i>.
         *
         * @constructs Class
         */
        function Class() {
        }

        Class.prototype = {};

        return Class;
    }]);

})();
