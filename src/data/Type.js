(function() {

    var module = angular.module('coa.data');

    var Type;
    var TypeBool;
    var TypeStr;
    var TypeInt;
    var TypeObj;

    module.factory('Type', ['Class', function(Class) {

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
        }

        Type.prototype = new Class();

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
            this.label = label || name.code2human();
            this.options = options || {};
            this.default = this.convert(def !==undefined ? def : null);
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
         * @name isValid
         * @methodOf coa.data.class:Type
         * @param {any} value A value to test having already correct kind of type.
         * @return {any} True if the value is valid.
         * @description
         *
         * Test that all restrictions to the value is fulfilled.
         */
        Type.prototype.isValid = function(value) {
            // TODO: Check options from optionHandlers().
            return true;
        };

        /**
         * @ngdoc method
         * @name validateOptions
         * @methodOf coa.data.class:Type
         * @param {Object} options Object containing options for this type.
         * @return {boolean} True if options are valid.
         * @description
         *
         * Validate options for this type. By default only empty set of options is valid.
         */
        Type.prototype.validateOptions = function(options) {
            // TODO: Check options from optionHandlers().
            return Object.keys(options).length === 0;
        };

        Type.prototype.optionHandlers = function() {
            return [{
                required: {
                    message: "Value cannot be a null",
                    type: "boolean",
                    isValid: function(value) {
                        return value !== null && value !== undefined;
                    },
                }
            }];
        };

        Type.prototype.isInvalid = function() {
            // TODO: Implement this returning error list.
            // TODO: Add validation function for Data class collecting all errors.
            return false;
        };

        // TODO: Docs.
        Type.prototype.isValid = function() {
            return !this.isInvalid();
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
         * @param {String} name Name of the member to set.
         * @param {any} value Any value aimed for this type.
         * @return {any} Value that has been set.
         * @description
         *
         * Set the member of the target object using the given value. The value is converted using
         * this type and if not successfull, error is displayed and default value is used instead.
         */
        Type.prototype.set = function(target, name, value) {
            var set = this.convert(value);
            if (set === undefined) {
                d("Invalid kind of value", value, "for member of type", this, "for object", target);
                set = this.default;
            }
            target[name] = set;
            return set;
        };

        return Type;
    }]);

    // TODO: Implement general option 'required', which disables ability to use 'null' as valid value.

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
         */
        TypeBool = function() {
        }

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
         */
        TypeStr = function() {
        }

        TypeStr.prototype = new Type();

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
         * An integer or null.
         */
        TypeInt = function() {
        }

        TypeInt.prototype = new Type();

        TypeInt.prototype.convert = function(value) {
            if (value === undefined) {
                return undefined;
            }
            return value === null ? null : parseInt(value + '');
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
         */
        TypeObj = function () {
        }

        TypeObj.prototype = new Type();

        TypeObj.prototype.validateOptions = function(options) {
            if (Object.keys(options).length !== 1) {
                return false;
            }
            return !!options.class;
        };

        TypeObj.prototype.convert = function(value) {
            if (value === undefined) {
                return undefined;
            }
            return factory.create(this.options.class, value);
        };

        TypeObj.prototype.copy = function(value) {
            return factory.create(this.options.class, value.toJSON());
        };

        return TypeObj;
    }]);

})();
