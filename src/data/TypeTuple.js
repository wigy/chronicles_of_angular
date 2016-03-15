(function() {

    var module = angular.module('coa.data');

    var TypeTuple;

    module.factory('TypeTuple', ['Type', function(Type) {

        if (TypeTuple) {
            return TypeTuple;
        }

        /**
         * @ngdoc function
         * @name coa.data.class:TypeTuple
         * @requires coa.data.class:Type
         * @param {Object} options Options for this type.
         * @description
         * A fixed sized array of other values or null.
         *
         * <h1>Options:</h1>
         * <dl>
         *   <dt>default</dt><dd>Default value for the member of this type.</dd>
         *   <dt>label</dt><dd>UI printable description for the member of this type.</dd>
         *   <dt>required</dt><dd>If set to true, value cannot be null.</dd>
         *   <dt>types</dt><dd>One or more <i>Type</i> instances defining the members of tuple in order (required).</dd>
         * </dl>
         */
        TypeTuple = function(options) {
            Type.call(this, options);
        };

        TypeTuple.prototype = new Type();
        TypeTuple.prototype.__class = 'coa.data.TypeTuple';
        TypeTuple.prototype.optionDefinitions = Type.prototype.optionDefinitions.inherit({
            types: {
                text: "Invalid tuple members.",
                type: function(option) {
                    if (option instanceof Array) {
                        for (var i=0; i < option.length; i++) {
                            if (!(option[i] instanceof Type)) {
                                return false;
                            }
                        }
                        return true;
                    }
                    return false;
                },
                required: true,
                op: function(option, value) {
                    if (value === null) {
                        return true;
                    }
                    if (value instanceof Array) {
                        if (option.length != value.length) {
                            return false;
                        }
                        for (var i=0; i < option.length; i++) {
                            if (!option[i].isValid(value[i])) {
                                return false;
                            }
                        }
                        return true;
                    }
                    return false;
                }
            }
        });

        TypeTuple.prototype.convert = function(value) {
            if (value === null) {
                return null;
            }
            if (value instanceof Array) {
                return value;
            }
            return undefined;
        };

        return TypeTuple;
    }]);

})();
