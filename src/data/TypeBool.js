(function() {

    var module = angular.module('coa.data');

    var TypeBool;

    module.factory('TypeBool', ['Type', function(Type) {

        if (TypeBool) {
            return TypeBool;
        }

        /**
         * @ngdoc function
         * @name coa.data.class:TypeBool
         * @requires coa.data.class:Type
         * @description
         * A boolean value or null.
         *
         * <h1>Options:</h1>
         * <dl>
         *   <dt>required</dt><dd>If set to true, value cannot be null.</dd>
         * </dl>
         */
        TypeBool = function() {
        };

        TypeBool.prototype = new Type();

        TypeBool.prototype.toString = function() {
            return "TypeBool()";
        };

        TypeBool.prototype.convert = function(value) {
            if (value === null || value === false || value === true) {
                return value;
            }
            return undefined;
        };

        return TypeBool;
    }]);

})();
