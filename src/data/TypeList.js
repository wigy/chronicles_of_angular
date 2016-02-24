(function() {

    var module = angular.module('coa.data');

    var TypeList;

    module.factory('TypeList', ['Type', function(Type) {

        if (TypeList) {
            return TypeList;
        }

        /**
         * @ngdoc function
         * @name coa.data.class:TypeList
         * @requires coa.data.class:Type
         * @param {String} name Name of the member this type instance specifies in the data object.
         * @param {any} def Default value for the member.
         * @param {String} label Human readable title for the name (default: human readable version of name).
         * @param {Object} options Type specific options (default: none).
         * @description
         * An array of other elements of the same type.
         * <h1>Options:</h1>
         * <dl>
         *   <dt>type</dt><dd>A <i>Type</i> instance defining allowed elements.</dd>
         *   <dt>required</dt><dd>If set to true, there must be at least one item in the array.</dd>
         * </dl>
         */
        TypeList = function (name, label, def, options) {
            Type.call(this, name, label, def, options);
        };

        TypeList.prototype = new Type();
        TypeList.prototype.__class = 'coa.data.TypeList';
        TypeList.prototype.optionDefinitions = Type.prototype.optionDefinitions.inherit({
            required: {
                text: "At least one is required.",
                type: "boolean",
                op: function(option, value) {
                    if (!option) {
                        return true;
                    }
                    if (value instanceof Array) {
                        return value.length > 0;
                    }
                    return false;
                }
            },
            type: {
                text: "Incorrect value in this collection.",
                type: function(value) {
                    return value instanceof Type;
                },
                required: true,
                op: function(option, value) {
                    if (value === null) {
                        return true;
                    }
                    for (var i = 0; i < value.length; i++) {
                        if (!option.isValid(value[i])) {
                            return false;
                        }
                    }
                    return true;
                }
            },
        });

        /**
         * Allow null and array.
         */
        TypeList.prototype.convert = function(value) {
            if (value === null) {
                return value;
            }
            if (value instanceof Array) {
                var ret = new Array(value.length);
                for (var i=0; i < value.length; i++) {
                    ret[i] = this.options.type.convert(value[i]);
                }
                return ret;
            }
            return undefined;
        };

        return TypeList;
    }]);

})();
