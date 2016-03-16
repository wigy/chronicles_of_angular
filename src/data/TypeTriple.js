(function() {

    var module = angular.module('coa.data');

    var TypeTriple;

    module.factory('TypeTriple', ['Type', 'TypeTuple', function(Type, TypeTuple) {

        if (TypeTriple) {
            return TypeTriple;
        }

        /**
         * @ngdoc function
         * @name coa.data.class:TypeTriple
         * @requires coa.data.class:Type
         * @requires coa.data.class:TypeTuple
         * @param {Object} options Options for this type.
         * @description
         * An array with two members or null.
         *
         * <h1>Options:</h1>
         * <dl>
         *   <dt>default</dt><dd>Default value for the member of this type.</dd>
         *   <dt>label</dt><dd>UI printable description for the member of this type.</dd>
         *   <dt>required</dt><dd>If set to true, value cannot be null.</dd>
         *   <dt>types</dt><dd>Three <i>Type</i> instances defining the members of pair in order (required).</dd>
         * </dl>
         */
        TypeTriple = function(options) {
            Type.call(this, options);
        };

        TypeTriple.prototype = new TypeTuple();
        TypeTriple.prototype.__class = 'coa.data.TypeTriple';
        TypeTriple.prototype.optionDefinitions = TypeTuple.prototype.optionDefinitions.inherit({});

        var oldValidator = TypeTriple.prototype.optionDefinitions.types.type;
        TypeTriple.prototype.optionDefinitions.types.type = function(options) {
            return oldValidator(options) && options.length === 3;
        };

        return TypeTriple;
    }]);

})();
