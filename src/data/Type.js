(function() {

    var module = angular.module('coa.data');

    var Type;
    var TypeBool;
    var TypeStr;
    var TypeInt;
    var TypeObj;

    module.factory('Type', ['Class', 'Options', function(Class, Options) {

        if (Type) {
            return Type;
        }

        /**
         * @ngdoc function
         * @name coa.data.class:Type
         * @requires coa.core.class:Class
         * @description
         * A base class for all member type definition classes. These classes
         * are used when initializing {@link coa.data.class:Data Data}
         * instances as prototypes for data container classes.
         */
        Type = function() {
            this.name = null;
            this.label = null;
            this.default = null;
            this.options = null;
        };

        Type.prototype = new Class();
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

        /**
         * @ngdoc method
         * @name init
         * @methodOf coa.data.class:Type
         * @param {String} name Name of the member this type instance specifies in the data object.
         * @param {any} def Default value for the member.
         * @param {String} label Human readable title for the name (default: human readable version of name).
         * @param {Object} options Type specific options (default: none).
         * @description
         *
         * Initialize member type definition.
         */
        Type.prototype.init = function(name, def, label, options) {
            this.name = name;
            this.default = undefined;
            this.label = label || name.code2human();
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
         * @param {any} value A value to test having already correct kind of type.
         * @return {Array} Null if the value is valid or an array with failure messages.
         * @description
         *
         * Test that all restrictions to the value are fulfilled and collect failures.
         */
        Type.prototype.isInvalid = function(value) {

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
        Type.prototype.set = function(target, value) {
            var set = this.convert(value);
            if (set === undefined) {
                d("Invalid kind of value", value, "for member of type", this, "for object", target);
                set = this.default;
            }
            target[this.name] = set;
            return set;
        };

        return Type;
    }]);


    module.factory('TypeBool', ['Type', function(Type) {

        if (TypeBool) {
            return TypeBool;
        }

        /**
         * @ngdoc function
         * @name coa.data.class:TypeBool
         * @requires coa.data.class:Type
         * @description
         * A boolean value or null.
         *
         * <h1>Options:</h1>
         * <dl>
         *   <dt>required</dt><dd>If set to true, value cannot be null.</dd>
         * </dl>
         */
        TypeBool = function() {
        };

        TypeBool.prototype = new Type();

        TypeBool.prototype.convert = function(value) {
            if (value === null || value === false || value === true) {
                return value;
            }
            return undefined;
        };

        return TypeBool;
    }]);


    module.factory('TypeStr', ['Type', function(Type) {

        if (TypeStr) {
            return TypeStr;
        }

        /**
         * @ngdoc function
         * @name coa.data.class:TypeStr
         * @requires coa.data.class:Type
         * @description
         * A string or null.
         *
         * <h1>Options:</h1>
         * <dl>
         *   <dt>required</dt><dd>If set to true, value cannot be null.</dd>
         *   <dt>pattern</dt><dd>If set to regex, value must match the expression.</dd>
         * </dl>
         */
        TypeStr = function() {
        };

        TypeStr.prototype = new Type();
        TypeStr.prototype.optionDefinitions = Type.prototype.optionDefinitions.inherit({
            pattern: {
                text: "Value does not have correct format.",
                type: function(option) {
                    return option === null || (option instanceof RegExp);
                },
                required: false,
                default: null,
                op: function(option, value) {
                    if (value === null || !option) {
                        return true;
                    }
                    return option.test(value);
                }
            }
        });

        TypeStr.prototype.convert = function(value) {
            if (value === undefined) {
                return undefined;
            }
            return value === null ? null : value + '';
        };

        return TypeStr;
    }]);


    module.factory('TypeInt', ['Type', function(Type) {

        if (TypeInt) {
            return TypeInt;
        }

        /**
         * @ngdoc function
         * @name coa.data.class:TypeInt
         * @requires coa.data.class:Type
         * @description
         * An integer number or null.
         *
         * <h1>Options:</h1>
         * <dl>
         *   <dt>required</dt><dd>If set to true, value cannot be null.</dd>
         * </dl>
         */
        TypeInt = function() {
        };

        TypeInt.prototype = new Type();

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


    module.factory('TypeObj', ['Type', 'Data', 'factory', function(Type, Data, factory) {

        if (TypeObj) {
            return TypeObj;
        }

        /**
         * @ngdoc function
         * @name coa.data.class:TypeObj
         * @requires coa.data.class:Type
         * @description
         * An instance of another class. Required option is <code>class</code>, which is fully
         * qualified class name including module, for example <code>"coa.auth.User"</code>.
         *
         * <h1>Options:</h1>
         * <dl>
         *   <dt>class</dt><dd>Fully qualified class name of the object.</dd>
         *   <dt>required</dt><dd>If set to true, value cannot be null.</dd>
         * </dl>
         */
        TypeObj = function () {
        };

        TypeObj.prototype = new Type();
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
