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
         * @param {Object} options Options for this type.
         * @description
         * A boolean value or null.
         *
         * <h1>Options:</h1>
         * <dl>
         *   <dt>required</dt><dd>If set to true, value cannot be null.</dd>
         * </dl>
         */
        TypeBool = function(name, options) {
            Type.call(this, options);
        };

        TypeBool.prototype = new Type();
        TypeBool.prototype.__class = 'coa.data.TypeBool';

        TypeBool.prototype.convert = function(value) {
            if (value === null || value === false || value === true) {
                return value;
            }
            return undefined;
        };

        return TypeBool;
    }]);

})();
