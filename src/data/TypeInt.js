(function() {

    var module = angular.module('coa.data');

    var TypeInt;

    module.factory('TypeInt', ['Type', function(Type) {

        if (TypeInt) {
            return TypeInt;
        }

        /**
         * @ngdoc function
         * @name coa.data.class:TypeInt
         * @requires coa.data.class:Type
         * @description
         * An integer number or null.
         *
         * <h1>Options:</h1>
         * <dl>
         *   <dt>required</dt><dd>If set to true, value cannot be null.</dd>
         * </dl>
         */
        TypeInt = function() {
        };

        TypeInt.prototype = new Type();

        TypeInt.prototype.convert = function(value) {
            if (value === null) {
                return null;
            }
            if (typeof(value) !== "number") {
                return undefined;
            }
            if (value !== Math.round(value)) {
                return undefined;
            }
            return value;
        };

        return TypeInt;
    }]);

})();
