(function() {

    var module = angular.module('coa.data');

    module.factory('Type', ['Class', function(Class) {

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
            this.options = null;
        }

        Type.prototype = new Class();

        /**
         * @ngdoc method
         * @name init
         * @methodOf coa.data.class:Type
         * @param {String} name Name of the member this type instance specifies in the data object.
         * @param {String} label Human readable title for the name (default: human readable version of name).
         * @param {Object} options Type specific options (default: none).
         * @description
         *
         * Initialize member type definition.
         */
        Type.prototype.init = function(name, label, options) {
            this.name = name;
            // TODO: Add files to globals providing extensions to basic types.
            // TODO: Convert name to human readable using String.code2human.
            this.label = label || name;
            this.options = options || {};
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
         * @name set
         * @methodOf coa.data.class:Type
         * @param {Data} target Target object.
         * @param {String} name Name of the member to set.
         * @param {any} value Any value aimed for this type.
         * @return {any} Value after the conversion.
         * @description
         *
         * Set the member of the target object using the given value. The value is converted using
         * this type and if not successfull, error is displayed and null value used instead.
         */
        Type.prototype.set = function(target, name, value) {
            var set = this.convert(value);
            if (set === undefined) {
                d("Invalid value", value, "for member of type", this, "for object", target);
                set = null;
            }
            target[name] = set;
            return set;
        };

        return Type;
    }]);

    module.factory('TypeStr', ['Type', function(Type) {

        /**
         * @ngdoc function
         * @name coa.data.class:TypeStr
         * @requires coa.data.class:Type
         * @description
         * A string or null.
         */
        function TypeStr(definition) {
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

    module.factory('Data', ['Class', function(Class) {

        /**
         * @ngdoc function
         * @name coa.data.class:Data
         * @requires coa.core.class:Class
         * @description
         *
         * Data description to be used as a prototype for any data container class.
         *
         * @param {Array} definitions A list of <i>member definitions</i>.
         * An array can contain one ore more objects with definitions. Each member definition has
         * the following format:
         * <pre>
         * {
         *   name: {
         *      type: TypeStr,
         *      label: 'Name of the foo',
         *      options: {
         *      }
         *   }
         * }
         * </pre>
         * The <code>type</code> is one of the member type definition classes.
         * The <code>label</code> defines user readable label for that member and <code>options</code>
         * are type specific options.
         *
         * For the list of standard types and examples, see {@link coa.data}.
         */
        function Data(definitions) {
            // This is list of members in order.
            this._members = [];
            // This is mapping from member names to the types listed in _members.
            this._types = {};
            if (arguments.length) {
                this._createMembers(definitions);
            }
        }
        Data.prototype = new Class();

        /**
         * Create member types based on the definitions.
         */
        Data.prototype._createMembers = function(definitions) {
            if (!(definitions instanceof Array)) {
                d("Invalid arguments", definitions, "for Data");
                return;
            }
            for (var i = 0; i < definitions.length; i++) {
                // More than one key is allowed as well.
                // So all members can be given in a single object, if order is not important.
                var keys = Object.keys(definitions[i]);
                for (var j = 0; j < keys.length; j++) {
                   this._addMember(keys[j], definitions[i][keys[j]]);
                }
            }
        };

        /**
         * Add a member instantiating appropriate type.
         */
        Data.prototype._addMember = function(name, definition) {
            if (typeof(name) !== "string") {
                d("Invalid name for a data member", name, "with definition", definition);
                return;
            }
            if (typeof(definition.type) !== "function") {
                d("Invalid type for", name, "given in definition", definition);
                return;
            }
            var type = new (definition.type)();
            type.init(name, definition.label, definition.options);
            this._members.push(type);
            this._types[name] = type;
        };

        /**
         * @ngdoc method
         * @name init
         * @methodOf coa.data.class:Data
         * @param {Object} data Initial data to be filled to members.
         * @description
         *
         * This function is used in constructors of data classes. It takes an object with raw
         * data having member names as keys. The values are then transformed using member types
         * and assigned to the object itself.
         */
        Data.prototype.init = function(data) {

            if(data instanceof Object) {
                for(var k in data) {
                    var t = this._types[k];
                    if (t) {
                        t.set(this, k, data[k]);
                    } else {
                        d("Invalid member name", name, "in initial data", data, "for", this);
                    }
                }
            } else {
                d("Invalid initial values", data, "for", this);
            }
        };

        return Data;
    }]);

})();
