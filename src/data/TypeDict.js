(function() {

    var module = angular.module('coa.data');

    var TypeDict;

    module.factory('TypeDict', ['Type', function(Type) {

        if (TypeDict) {
            return TypeDict;
        }

        /**
         * @ngdoc function
         * @name coa.data.class:TypeDict
         * @requires coa.data.class:Type
         * @param {Object} options Options for this type.
         * @description
         * A key-value dictionary, i.e. an ordinary Javascript object with string keys.
         * <h1>Options:</h1>
         * <dl>
         *   <dt>default</dt><dd>Default value for the member of this type (defaults to empty {}).</dd>
         *   <dt>label</dt><dd>UI printable description for the member of this type.</dd>
         *   <dt>type</dt><dd>A  {@link coa.data.class:Type Type} instance defining allowed value instances (required).</dd>
         * </dl>
         */
        TypeDict = function (options) {
            Type.call(this, options);
        };

        TypeDict.prototype = new Type();
        TypeDict.prototype.__class = 'coa.data.TypeDict';
        TypeDict.prototype.optionDefinitions = Type.prototype.optionDefinitions.inheritExcept('required', {
            type: {
                text: "Incorrect value in the collection.",
                type: function(value) {
                    return value instanceof Type;
                },
                required: true,
                op: function(option, value) {
                    if (value === null) {
                        return true;
                    }
                    var keys =  Object.keys(value);
                    for (var i = 0; i < keys.length; i++) {
                        if (!option.isValid(value[keys[i]])) {
                            return false;
                        }
                    }
                    return true;
                }
            },
        });
        TypeDict.prototype.optionDefinitions.default.default = {};

        /**
         * Allow null and object. Convert values via types.
         */
        TypeDict.prototype.convert = function(value) {
            if (value === null) {
                return value;
            }
            if (value instanceof Object) {
                var keys =  Object.keys(value);
                var ret = {};
                var k, v;
                for (var i=0; i < keys.length; i++) {
                    k = keys[i];
                    v = this.options.type.convert(value[k]);
                    if (v === undefined) {
                        return undefined;
                    }
                    ret[k] = v;
                }
                return ret;
            }
            return undefined;
        };

        TypeDict.prototype.toJSON = function(value) {
            if (value === null) {
                return null;
            }
            var keys =  Object.keys(value);
            var ret = {};
            var k, v;
            for (var i=0; i < keys.length; i++) {
                k = keys[i];
                v = this.options.type.toJSON(value[k]);
                ret[k] = v;
            }
            return ret;
        };

        return TypeDict;
    }]);

})();
