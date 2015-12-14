(function() {

    var module = angular.module('coa.data');

    /**
     * @ngdoc function
     * @name coa.data.class:Type
     * @requires coa.data.class:Class
     * @description
     * A base class for all member type definition classes. These classes
     * are used when initializing {@link coa.data.class:Data Data}
     * instances as prototypes for data container classes.
     */
    function Type() {
        this.name = null;
        this.label = null;
        this.default = null;
        this.options = null;
    }

    module.factory('Type', ['Class', function(Class) {

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
         * @name validateOptions
         * @methodOf coa.data.class:Type
         * @param {Object} options Object containing options for this type.
         * @return {boolean} True if options are valid.
         * @description
         *
         * Validate options for this type. By default only empty set of options is valid.
         */
        Type.prototype.validateOptions = function(options) {
            return Object.keys(options).length === 0;
        };

        /**
         * @ngdoc method
         * @name convert
         * @methodOf coa.data.class:Type
         * @param {any} value The value to convert.
         * @return {any} Value in the format used internally or undefined if not able to convert.
         * @description
         *
         * Convert any value to this type.
         */
        Type.prototype.convert = function(value) {
            return value;
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
         * this type and if not successfull, error is displayed and null value used instead.
         */
        Type.prototype.set = function(target, name, value) {
            var set = this.convert(value);
            if (set === undefined) {
                d("Invalid value", value, "for member of type", this, "for object", target);
                set = this.default;
            }
            target[name] = set;
            return set;
        };

        return Type;
    }]);

    /**
     * @ngdoc function
     * @name coa.data.class:TypeStr
     * @requires coa.data.class:Type
     * @description
     * A string or null.
     */
    function TypeStr(definition) {
    }

    module.factory('TypeStr', ['Type', function(Type) {

        TypeStr.prototype = new Type();

        TypeStr.prototype.convert = function(value) {
            if (value === undefined) {
                return undefined;
            }
            return value === null ? null : value + '';
        };

        return TypeStr;
    }]);

    /**
     * @ngdoc function
     * @name coa.data.class:TypeInt
     * @requires coa.data.class:Type
     * @description
     * An integer or null.
     */
    function TypeInt(definition) {
    }

    module.factory('TypeInt', ['Type', function(Type) {

        TypeInt.prototype = new Type();

        TypeInt.prototype.convert = function(value) {
            if (value === undefined) {
                return undefined;
            }
            return value === null ? null : parseInt(value + '');
        };

        return TypeInt;
    }]);

    /**
     * @ngdoc function
     * @name coa.data.class:TypeObj
     * @requires coa.data.class:Type
     * @description
     * An instance of another class. Required option is <code>class</code>, which is fully
     * qualified class name including module, for example <code>"coa.auth.User"</code>.
     */
    function TypeObj(definition) {
    }

    module.factory('TypeObj', ['Type', 'Data', 'factory', function(Type, Data, factory) {

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
