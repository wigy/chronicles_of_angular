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
         * @param {String} name Name of the member this type instance specifies in the data object.
         * @param {any} def Default value for the member.
         * @param {String} label Human readable title for the name (default: human readable version of name).
         * @param {Object} options Type specific options (default: none).
         * @description
         * A boolean value or null.
         *
         * <h1>Options:</h1>
         * <dl>
         *   <dt>required</dt><dd>If set to true, value cannot be null.</dd>
         * </dl>
         */
        TypeBool = function(name, label, def, options) {
            Type.call(this, name, label, def, options);
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
