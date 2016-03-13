(function() {

    var module = angular.module('coa.data');

    var TypeObj;

    module.factory('TypeObj', ['Type', 'Data', 'factory', function(Type, Data, factory) {

        if (TypeObj) {
            return TypeObj;
        }

        /**
         * @ngdoc function
         * @name coa.data.class:TypeObj
         * @requires coa.data.class:Type
         * @requires coa.data.class:Data
         * @requires coa.data.service:factory
         * @param {Object} options Options for this type.
         * @description
         * An instance of another class. Required option is <code>class</code>, which is fully
         * qualified class name including module, for example <code>"coa.auth.User"</code>.
         *
         * <h1>Options:</h1>
         * <dl>
         *   <dt>class</dt><dd>Fully qualified class name of the object.</dd>
         *   <dt>default</dt><dd>Default value for the member of this type.</dd>
         *   <dt>label</dt><dd>UI printable description for the member of this type.</dd>
         *   <dt>required</dt><dd>If set to true, value cannot be null.</dd>
         * </dl>
         */
        TypeObj = function (options) {
            Type.call(this, options);
        };

        TypeObj.prototype = new Type();
        TypeObj.prototype.__class = 'coa.data.TypeObj';
        TypeObj.prototype.optionDefinitions = Type.prototype.optionDefinitions.inherit({
            class: {
                text: "Value must belong to %o class.",
                type: "string",
                required: true,
                op: function(option, value) {
                    if (value instanceof Data) {
                        return option === value.getModuleAndClass();
                    }
                    return value === null;
                },
            }
        });

        /**
         * Valid values are null, Data instances and Object instances that are converted to class instances.
         */
        TypeObj.prototype.convert = function(value) {
            if (value === undefined) {
                return undefined;
            }
            if (value === null || (value instanceof Data)) {
                return value;
            }
            if (value instanceof Object) {
                return factory.create(this.options.class, value);
            }
            return undefined;
        };

        TypeObj.prototype.copy = function(value) {
            if (value === null) {
                return null;
            }
            return factory.create(this.options.class, value.toJSON());
        };

        TypeObj.prototype.toJSON = function(value) {
            if (value === null) {
                return null;
            }
            return value.toJSON();
        };

        return TypeObj;
    }]);

})();
