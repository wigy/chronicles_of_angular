(function() {

    var module = angular.module('coa.data');

    module.factory('Type', ['Class', function(Class) {

        /**
         * @ngdoc object
         * @name coa.data.class:Type
         * @description
         *
         * Type description to be used as a prototype for any data container class.
         *
         * @param {Object} definition
         * The definition object is an object containing all data members of the class
         * as keys and their definitions as values.
         */
        function Type(definition) {
        }

        Type.prototype = new Class();

        /**
         * @ngdoc method
         * @name init
         * @methodOf coa.data.class:Type
         * @description
         *
         * Initialize an object instance with new data.
         * @param {Object} data Initial data to be filled in when instantiating members.
         */
        Type.prototype.init = function(data) {
            d(data);
        };

        return Type;
    }]);

})();
