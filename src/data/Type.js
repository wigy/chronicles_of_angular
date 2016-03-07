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
         * @param {Object} options Type specific options.
         * @description
         * A base class for all member type definition classes. These classes
         * are used when initializing {@link coa.data.class:Data Data}
         * instances as prototypes for data container classes.
         */
        Type = function(options) {
            if (options === undefined) {
                this.options = this.optionDefinitions.validate({}) || {};
            } else {
                this.init(options);
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
            },
            default: {
                default: null,
                op: function(option, value) {
                    return true;
                },
            },
            label: {
                type: 'string',
                default: null,
                op: function(option, value) {
                    return true;
                },
            },
        });

        Type.prototype.toString = function() {
            // Drop all null values.
            var keys = Object.keys(this.options);
            var print = {};
            for (var k=0; k < keys.length; k++) {
                if (this.options[keys[k]] !== null) {
                    print[keys[k]] = this.options[keys[k]];
                }
            }
            return this.__class.split('.').pop() + '(' + Class.prototype.toString.call(print) + ')';
        };

        Type.prototype.toJSON = function(value) {
            return value;
        };

        /**
         * @ngdoc method
         * @name init
         * @methodOf coa.data.class:Type
         * @param {Object} options Type specific options.
         * @description
         *
         * Initialize member type definition.
         */
        Type.prototype.init = function(options) {
            this.options = {};

            var validatedOptions = this.optionDefinitions.validate(options || {});
            if (!validatedOptions) {
                d("Invalid options", options, "for type", this);
                return;
            }
            this.options = validatedOptions;
            var def = this.convert(this.options.default);
            if (def === undefined) {
                d("Invalid default value", this.options.default, "for", this);
                def = null;
            }
            this.options.default = def;
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
         * @name getDefault
         * @methodOf coa.data.class:Type
         * @return {any} Default value for this type.
         */
        Type.prototype.getDefault = function() {
            return this.options.default;
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
                d("Invalid value", value, "for member of type", this, "for object", target);
                set = this.getDefault();
            }
            target[key] = set;
            return set;
        };

        return Type;
    }]);

})();
