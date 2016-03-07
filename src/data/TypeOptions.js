(function() {

    var module = angular.module('coa.data');

    var TypeOptions;

    module.factory('TypeOptions', ['Type', 'TypeDict', 'Options', function(Type, TypeDict, Options) {

        if (TypeOptions) {
            return TypeOptions;
        }

        /**
         * @ngdoc function
         * @name coa.data.class:TypeOptions
         * @requires coa.data.class:Type
         * @param {Object} options Options for this type.
         * @description
         * A key-value dictionary with validation. This is similar to {@link coa.data.class:TypeDict TypeDict}
         * except that validation is done via {@link coa.core.class:Options Options}.
         * <h1>Options:</h1>
         * <dl>
         *   <dt>default</dt><dd>Default value for the member of this type.</dd>
         *   <dt>label</dt><dd>UI printable description for the member of this type.</dd>
         *   <dt>options</dt><dd>An {@link coa.core.class:Options Options} instance defining allowed values.</dd>
         * </dl>
         */
        TypeOptions = function (options) {
            Type.call(this, options);
        };

        TypeOptions.prototype = new TypeDict();
        TypeOptions.prototype.__class = 'coa.data.TypeOptions';

        TypeOptions.prototype.optionDefinitions = TypeDict.prototype.optionDefinitions.inheritExcept('type', {
            options: {
                text: "Incorrect or missing option value.",
                type: function(value) {
                    return value instanceof Options;
                },
                required: true,
                op: function(option, value) {
                    if (value === null) {
                        return true;
                    }
                    if (option.validate(value)) {
                        return true;
                    }
                    return false;
                }
            },
        });

        /**
         * Allow null and object. No conversion done.
         */
        TypeOptions.prototype.convert = function(value) {
            if (value === null) {
                return value;
            }
            if (value instanceof Object) {
                value = this.options.options.validate(value);
                return value ? value : undefined;
            }
            return undefined;
        };

        /**
         * Options are raw data and can be returned as is, but must create copy to detach references.
         */
        TypeOptions.prototype.toJSON = function(value) {
            if (value === null) {
                return null;
            }
            return angular.extend({}, value);
        };

        return TypeOptions;
    }]);

})();
