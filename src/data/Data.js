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
        * @param {String} name The fully qualified name of the module and class, e.g. <code>coa.auth.User</code>.
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
        Data = function(name, definitions, options) {
            // TODO: Consider prefixing private variables and functions with '$$' instead (check Angular recommendation).
            // The fully qualified name of the module and class.
            this._class = name;
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
         * Present name of the module and class with JSON content.
         */
        Data.prototype.toString = function() {
            return this._class + JSON.stringify(this.toJSON());
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
         * @param {Object} data Initial data to be filled to members.
         * @description
         *
         * This function is used in constructors of data classes. It takes an object with raw
         * data having member names as keys. The values are then transformed using member types
         * and assigned to the object itself.
         */
        Data.prototype.init = function(data) {

            this.reset();

            if (data === undefined) {
                return;
            }

            if (data === null) {
                data = {};
            }

            // TODO: Support for atoms and primary_field.
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
