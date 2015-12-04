(function() {

    var module = angular.module('coa.core');

    module.factory('Class', [function() {

        /**
         * Base class for all other classes in <i>CoA</i>.
         * @class core.Class
         * @memberof core
         */
        function Class() {
        }

        Class.prototype = {};

        return Class;
    }]);

})();
