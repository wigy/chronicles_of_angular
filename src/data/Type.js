(function() {

    var module = angular.module('coa.data');

    // TODO: Docs for TypeBaseClass
    module.factory('TypeBaseClass', ['Class', function(Class) {

        function TypeBaseClass() {
            this.name = null;
            this.label = null;
            this.options = null;
        }

        TypeBaseClass.prototype = new Class();

        TypeBaseClass.prototype.init = function(name, label, options) {
            this.name = name;
            this.label = label || name;
            this.options = options || {};
        };

        return TypeBaseClass;
    }]);

    // TODO: Docs for TypeStr
    module.factory('TypeStr', ['TypeBaseClass', function(TypeBaseClass) {

        function TypeStr(definition) {
        }

        TypeStr.prototype = new TypeBaseClass();

        return TypeStr;
    }]);

    module.factory('Type', ['Class', function(Class) {

        /**
         * @ngdoc function
         * @name coa.data.class:Type
         * @description
         *
         * Type description to be used as a prototype for any data container class.
         *
         * @param {Array} definitions
         *
         */
        function Type(definitions) {
            this._members = [];
            this._types = {};
            this._createMembers(definitions);
        }
        Type.prototype = new Class();

        // TODO: Docs for _createMembers.
        Type.prototype._createMembers = function(definitions) {
            if (!(definitions instanceof Array)) {
                d("Invalid arguments", definitions, "for Type");
                return;
            }
            for (var i = 0; i < definitions.length; i++) {
                // More than one key is allowed as well.
                // So all members can be given in a single object, of order is not important.
                var keys = Object.keys(definitions[i]);
                for (var j = 0; j < keys.length; j++) {
                   this._addMember(keys[j], definitions[i][keys[j]]);
                }
            }
        };

        // TODO: Docs for _addMember.
        Type.prototype._addMember = function(name, definition) {
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
         * @methodOf coa.data.class:Type
         * @param {Object} data Initial data to be filled to members.
         * @description
         *
         * Initialize an object instance with new data from a single object. Typically this is called
         * inside a data class constructor
         * <pre>
         * function MyClass(data) {
         *     this.name = null;
         *     this.init(data);
         * }
         *
         * MyClass.prototype = new Type([{name: {type: 'str'}}]);
         * </pre>
         *
         */
        Type.prototype.init = function(data) {

            // TODO: More docs.
            if(data instanceof Object) {
                for(var k in data) {
                    // TODO: Inject data into object via type and validate.
                }
            } else {
                d("Invalid initial values", data, "for", this);
            }
        };

        return Type;
    }]);

})();
