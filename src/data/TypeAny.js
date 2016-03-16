(function() {

    var module = angular.module('coa.data');

    var TypeAny;

    module.factory('TypeAny', ['Type', function(Type) {

        if (TypeAny) {
            return TypeAny;
        }

        /**
         * @ngdoc function
         * @name coa.data.class:TypeAny
         * @requires coa.data.class:Type
         * @param {Object} options Options for this type.
         * @description
         * Any non-undefined value.
         *
         * <h1>Options:</h1>
         * <dl>
         *   <dt>default</dt><dd>Default value for the member of this type.</dd>
         *   <dt>label</dt><dd>UI printable description for the member of this type.</dd>
         *   <dt>required</dt><dd>If set to true, value cannot be null.</dd>
         * </dl>
         */
        TypeAny = function(options) {
            Type.call(this, options);
        };

        TypeAny.prototype = new Type();
        TypeAny.prototype.__class = 'coa.data.TypeAny';

        TypeAny.prototype.convert = function(value) {
            return value === undefined ? undefined : value;
        };

        return TypeAny;
    }]);

})();
