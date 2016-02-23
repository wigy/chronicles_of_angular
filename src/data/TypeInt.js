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
         * @param {String} name Name of the member this type instance specifies in the data object.
         * @param {any} def Default value for the member.
         * @param {String} label Human readable title for the name (default: human readable version of name).
         * @param {Object} options Type specific options (default: none).
         * @description
         * An integer number or null.
         *
         * <h1>Options:</h1>
         * <dl>
         *   <dt>required</dt><dd>If set to true, value cannot be null.</dd>
         * </dl>
         */
        TypeInt = function(name, label, def, options) {
            Type.call(this, name, label, def, options);
        };

        TypeInt.prototype = new Type();

        TypeInt.prototype.toString = function() {
            return "TypeInt()";
        };

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
