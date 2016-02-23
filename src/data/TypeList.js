(function() {

    var module = angular.module('coa.data');

    var TypeList;

    module.factory('TypeList', ['Type', function(Type) {

        if (TypeList) {
            return TypeList;
        }

        /**
         * @ngdoc function
         * @name coa.data.class:TypeList
         * @requires coa.data.class:Type
         * @description
         * An array of other elements of the same type.
         * <h1>Options:</h1>
         * <dl>
         *   <dt>type</dt><dd>A <i>Type</i> instance defining allowed elements.</dd>
         *   <dt>required</dt><dd>If set to true, there must be at least one item in the array.</dd>
         * </dl>
         */
        TypeList = function () {
        };

        TypeList.prototype = new Type();
    }]);

})();
