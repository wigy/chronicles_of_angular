(function() {

    var module = angular.module('coa.data');

    var TypePair;

    module.factory('TypePair', ['Type', 'TypeTuple', function(Type, TypeTuple) {

        if (TypePair) {
            return TypePair;
        }

        /**
         * @ngdoc function
         * @name coa.data.class:TypePair
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
         *   <dt>types</dt><dd>Two <i>Type</i> instances defining the members of pair in order (required).</dd>
         * </dl>
         */
        TypePair = function(options) {
            Type.call(this, options);
        };

        TypePair.prototype = new TypeTuple();
        TypePair.prototype.__class = 'coa.data.TypePair';
        TypePair.prototype.optionDefinitions = TypeTuple.prototype.optionDefinitions.inherit({});

        var oldValidator = TypePair.prototype.optionDefinitions.types.type;
        TypePair.prototype.optionDefinitions.types.type = function(options) {
            return oldValidator(options) && options.length === 2;
        };

        return TypePair;
    }]);

})();
