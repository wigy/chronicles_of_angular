(function() {

    var module = angular.module('coa.data');

    var TypeStr;

    module.factory('TypeStr', ['Type', function(Type) {

        if (TypeStr) {
            return TypeStr;
        }

        /**
         * @ngdoc function
         * @name coa.data.class:TypeStr
         * @requires coa.data.class:Type
         * @param {String} name Name of the member this type instance specifies in the data object.
         * @param {any} def Default value for the member.
         * @param {String} label Human readable title for the name (default: human readable version of name).
         * @param {Object} options Type specific options (default: none).
         * @description
         * A string or null.
         *
         * <h1>Options:</h1>
         * <dl>
         *   <dt>required</dt><dd>If set to true, value cannot be null.</dd>
         *   <dt>pattern</dt><dd>If set to regex, value must match the expression.</dd>
         * </dl>
         */
        TypeStr = function(name, label, def, options) {
            Type.call(this, name, label, def, options);
        };

        TypeStr.prototype = new Type();
        TypeStr.prototype.__class = 'coa.data.TypeStr';
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
            if (value === null || typeof(value) === 'string') {
                return value;
            }
            return undefined;
        };

        return TypeStr;
    }]);

})();
