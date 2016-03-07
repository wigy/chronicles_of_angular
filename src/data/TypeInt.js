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
         * @param {Object} options Options for this type.
         * @description
         * An integer number or null.
         *
         * <h1>Options:</h1>
         * <dl>
         *   <dt>default</dt><dd>Default value for the member of this type.</dd>
         *   <dt>label</dt><dd>UI printable description for the member of this type.</dd>
         *   <dt>required</dt><dd>If set to true, value cannot be null.</dd>
         * </dl>
         */
        TypeInt = function(options) {
            Type.call(this, options);
        };

        TypeInt.prototype = new Type();
        TypeInt.prototype.__class = 'coa.data.TypeInt';

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
