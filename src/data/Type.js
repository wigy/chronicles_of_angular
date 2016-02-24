(function() {

    var module = angular.module('coa.data');

    var Type;

    module.factory('Type', ['Class', 'Options', function(Class, Options) {

        if (Type) {
            return Type;
        }

        /**
         * @ngdoc function
         * @name coa.data.class:Type
         * @requires coa.core.class:Class
         * @param {String} name Name of the member this type instance specifies in the containing data object.
         * @param {any} def Default value for the member.
         * @param {String} label Human readable title for the name (default: human readable version of name).
         * @param {Object} options Type specific options (default: none).
         * @description
         * A base class for all member type definition classes. These classes
         * are used when initializing {@link coa.data.class:Data Data}
         * instances as prototypes for data container classes.
         */
        Type = function(name, label, def, options) {
            // TODO: Drop the name, label and default. Move label and default inside options.
            if (name !== undefined) {
                this.init(name, label, def, options);
            } else {
                this.label = null;
                this.default = null;
                this.options = null;
            }
        };

        Type.prototype = new Class();
        Type.prototype.__class = 'coa.data.Type';
        Type.prototype.optionDefinitions = new Options({
            required: {
                text: "This value is required.",
                type: "boolean",
                default: false,
                required: false,
                op: function(option, value) {
                    return !(option && value === null);
                },
            }
        });

        // TODO: Change toString so that it displays directly options.

        Type.prototype.toJSON = function(value) {
            return value;
        };

        /**
         * @ngdoc method
         * @name init
         * @methodOf coa.data.class:Type
         * @param {String} name Name of the member this type instance specifies in the containing data object.
         * @param {any} def Default value for the member.
         * @param {String} label Human readable title for the name (default: human readable version of name).
         * @param {Object} options Type specific options (default: none).
         * @description
         *
         * Initialize member type definition.
         */
        Type.prototype.init = function(name, def, label, options) {
            this.default = undefined;
            this.label = label || (name || '').code2human();
            this.options = {};

            var validatedOptions = this.optionDefinitions.validate(options || {});
            if (!validatedOptions) {
                d("Invalid options", options, "for type", this);
                return;
            }
            this.options = validatedOptions;

            this.default = this.convert(def !== undefined ? def : null);
        };

        /**
         * @ngdoc method
         * @name convert
         * @methodOf coa.data.class:Type
         * @param {any} value A value to convert.
         * @return {any} Value in the format used internally or undefined if not able to convert.
         * @description
         *
         * Convert any value to this type. This function only converts to the allowed value space
         * in the internal format. It does not validate any further details.
         */
        Type.prototype.convert = function(value) {
            return value;
        };

        /**
         * @ngdoc method
         * @name isInvalid
         * @methodOf coa.data.class:Type
         * @param {any} value A value to test.
         * @return {Array} Null if the value is valid or an array with failure messages.
         * @description
         *
         * Test that all restrictions to the value are fulfilled and collect failures.
         */
        Type.prototype.isInvalid = function(value) {

            if (this.convert(value) === undefined) {
                return ['Value has not correct type.'];
            }

            var errors = this.optionDefinitions.test(this.options, value);

            return errors.length ? errors : false;
        };

        /**
         * @ngdoc method
         * @name isValid
         * @methodOf coa.data.class:Type
         * @param {any} value A value to test having already correct kind of type.
         * @return {any} True if the value is valid or false otherwise.
         * @description
         *
         * Test that all restrictions to the value are fulfilled.
         */
        Type.prototype.isValid = function(value) {
            return !this.isInvalid(value);
        };

        /**
         * @ngdoc method
         * @name toJSON
         * @methodOf coa.data.class:Type
         * @param {any} value A legal value to convert.
         * @return {any} Value in the JSON-format, i.e. either an atom, an array or an object.
         * @description
         *
         * Convert valid data value to storable JSON-value. By default, it returns the value as is.
         */
        Type.prototype.toJSON = function(value) {
            return value;
        };

        /**
         * @ngdoc method
         * @name copy
         * @methodOf coa.data.class:Type
         * @param {any} value A legal value to clone.
         * @return {any} A clone of the value.
         * @description
         *
         * Create a duplicate of a value. This function is used when a clone of an original
         * value has to be created. By default, it assumes atomic value and returns it as is.
         */
        Type.prototype.copy = function(value) {
            return value;
        };

        /**
         * @ngdoc method
         * @name set
         * @methodOf coa.data.class:Type
         * @param {Data} target Target object.
         * @param {any} value Any value aimed for this type.
         * @return {any} Value that has been set.
         * @description
         *
         * Set the member of the target object using the given value. The value is converted using
         * this type and if not successfull, error is displayed and default value is used instead.
         */
        Type.prototype.set = function(target, key, value) {
            var set = this.convert(value);
            if (set === undefined) {
                d("Invalid kind of value", value, "for member of type", this, "for object", target);
                set = this.default;
            }
            target[key] = set;
            return set;
        };

        return Type;
    }]);

})();
