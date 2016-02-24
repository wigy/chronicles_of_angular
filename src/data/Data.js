(function() {

    var module = angular.module('coa.data');

    var Data;

    module.factory('Data', ['Class', 'Options', function(Class, Options) {

        if (Data) {
            return Data;
        }

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
        * @param {Object} options Optional options for this Data class. Supported options are
        * <dl>
        *  <dt>primary_field</dt><dd>If defined, the class can be instantiated with the single atom
        *                            parameter, which is inserted into the named field.</dd>
        * </dl>
        */
        Data = function(definitions, options) {
            // TODO: Change the _members so that it is a list of names. Then change access to types so that it does not use type.name.
            // This is list of members in order.
            this._members = [];
            // This is mapping from member names to the types listed in _members.
            this._types = {};
            // Options for this Data container.
            this._options = this.optionDefinitions.validate(options);

            if (!this._options) {
                this.optionDefinitions.validate({});
                d("Invalid options", options, "for Data", this, "(using defaults instead).");
            }
            this._createMembers(definitions);
        };

        Data.prototype = new Class();
        Data.prototype.__class = 'coa.data.Data';
        Data.prototype.optionDefinitions = new Options({
            primary_field: {
                text: "Default field to fill when a single atom value is given to the constructor.",
                type: "string"
            }
        });

        /**
         * Concstruct an object of memebers.
         */
        Data.prototype.toJSON = function() {
            var ret = {};
            for (var k = 0; k < this._members.length; k++ ) {
                ret[this._members[k].name] = this._members[k].toJSON(this[this._members[k].name]);
            }
            return ret;
        };

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
            type.init(name, definition.default, definition.label, definition.options || {});

            if (this._types[name]) {
                d("Trying to define member", name, "as", type, "but it has been already defined as", this._types[name], "in", this);
                return;
            }

            this._members.push(type);
            this._types[name] = type;
        };

        /**
         * @ngdoc method
         * @name reset
         * @methodOf coa.data.class:Data
         * @description
         * Reset all member values to defaults.
         */
        Data.prototype.reset = function() {
            for (var k = 0; k < this._members.length; k++ ) {
                this[this._members[k].name] = this._members[k].copy(this._members[k].default);
            }
        };

        /**
         * @ngdoc method
         * @name copy
         * @methodOf coa.data.class:Data
         * @param {Data} target Another .
         * @description
         * Clone the target object into this.
         */
        Data.prototype.copy = function(target) {
            for (var k = 0; k < this._members.length; k++ ) {
                this[this._members[k].name] = this._members[k].copy(target[this._members[k].name]);
            }
        };

        /**
         * @ngdoc method
         * @name init
         * @methodOf coa.data.class:Data
         * @param {Any} data Initial data to be filled to members.
         * @description
         *
         * This function is used in constructors of data classes. It takes an object with raw
         * data having member names as keys. The values are then transformed using member types
         * and assigned to the object itself.
         *
         * If this class has an option <code>primary_field</code> set, then also atom values
         * are supported. If atom value is given, then it is assigned to the primary field.
         *
         * Also another instance of the same class can be given. In that case, a clone of data
         * is created before it is used for initializing this object instance.
         */
        Data.prototype.init = function(data) {

            var type;

            this.reset();

            if (data instanceof Data) {
                if (data.__class !== this.__class) {
                    d("Cannot initialize '" + this.__class + "' object", this, " from '" + data.__class + "' object", data);
                    return;
                }
                // Create clean copy of data.
                data = data.toJSON();
            }

            if (data === undefined) {
                return;
            }

            if(data instanceof Object) {
                for(var k in data) {
                    type = this._types[k];
                    if (type) {
                        type.set(this, data[k]);
                    } else {
                        d("Invalid member name", name, "in initial data", data, "for", this);
                    }
                }
                return;
            }

            if (this._options.primary_field) {
                type = this._types[this._options.primary_field];
                if (!type) {
                    d("Invalid primary field '" + this._options.primary_field + "' defined for", this);
                    return;
                }
                type.set(this, data);
                return;
            }

            d("Invalid initial values", data, "for", this);
        };

        /**
         * @ngdoc method
         * @name getModuleAndClass
         * @methodOf coa.data.class:Data
         * @return {String} Fully qualified name of the module and class.
         */
        Data.prototype.getModuleAndClass = function() {
            return this.__class;
        };

        /**
         * @ngdoc method
         * @name getMembers
         * @methodOf coa.data.class:Data
         * @return {Array} A list of member type defintions.
         */
        Data.prototype.getMembers = function() {
            return this._members;
        };

        /**
         * @ngdoc method
         * @name getTypes
         * @methodOf coa.data.class:Data
         * @return {Object} An object containing all member types using names of the members as keys.
         */
        Data.prototype.getTypes = function() {
            return this._types;
        };

        /**
         * @ngdoc method
         * @name getType
         * @methodOf coa.data.class:Data
         * @param {String} name Name of the member.
         * @return {Type} A type instance for the member or null if not found.
         */
        Data.prototype.getType = function(name) {
            var ret = this._types[name];
            if (!ret) {
                return null;
            }
            return ret;
        };

        /**
         * @ngdoc method
         * @name isInvalid
         * @methodOf coa.data.class:Data
         * @return {Boolean | Object} False if no invalid fields or otherwise the following structure
         * containing all invalid fields with messages:
         * <pre>
         * {
         *    field1: ["Error message 1.", "Error message 2."],
         *    field2: ["Error message 3."],
         * }
         * </pre>
         */
        Data.prototype.isInvalid = function() {
            var errors = {};
            var failed = false;
            for (var i=0; i < this._members.length; i++) {
                var errs = this._members[i].isInvalid(this[this._members[i].name]);
                if (errs) {
                    errors[this._members[i].name] = errs;
                    failed = true;
                }
            }

            return failed ? errors : false;
        };

        /**
         * @ngdoc method
         * @name isValid
         * @methodOf coa.data.class:Data
         * @return {Boolean} True if all fields are valid, false otherwise.
         */
        Data.prototype.isValid = function() {
            return !this.isInvalid();
        };

        return Data;
    }]);

})();
