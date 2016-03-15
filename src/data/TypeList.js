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
         * @param {Object} options Options for this type.
         * @description
         * An array of other elements of the same type.
         * <h1>Options:</h1>
         * <dl>
         *   <dt>default</dt><dd>Default value for the member of this type (defaults to empty []).</dd>
         *   <dt>label</dt><dd>UI printable description for the member of this type.</dd>
         *   <dt>required</dt><dd>If set to true, there must be at least one item in the array.</dd>
         *   <dt>type</dt><dd>A <i>Type</i> instance defining allowed elements.</dd>
         * </dl>
         */
        TypeList = function (options) {
            Type.call(this, options);
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
                text: "Incorrect value in the list.",
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
        TypeList.prototype.optionDefinitions.default.default = [];

        /**
         * Allow null and array. Convert values via type.
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

        TypeList.prototype.toJSON = function(value) {
            if (value === null) {
                return null;
            }
            var ret = [];
            for (var i=0; i < value.length; i++) {
                ret.push(this.options.type.toJSON(value[i]));
            }
            return ret;
        };

        return TypeList;
    }]);

})();
