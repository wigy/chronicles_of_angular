(function() {

    var module = angular.module('coa.data');

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
            // TODO: Check if it is possible to record initial values from 'this' object as well.
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

            if (data === undefined) {
                // TODO: Call here reset function, which initializes all variables.
                return;
            }

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
         * @name getTypes
         * @methodOf coa.data.class:Data
         * @return {Object} An object containing all member types using names of the members as keys.
         */
        Data.prototype.getTypes = function() {
            return this._types;
        }

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
        }

        return Data;
    }]);

})();
