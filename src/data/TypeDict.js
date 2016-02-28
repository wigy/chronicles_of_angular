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
         * A key-value dictionary, i.e. an ordinary Javascript object.
         * <h1>Options:</h1>
         * <dl>
         *   <dt>keytype</dt><dd>A <i>Type</i> instance defining allowed key elements.</dd>
         *   <dt>valuetype</dt><dd>A <i>Type</i> instance defining allowed value elements.</dd>
         *   <dt>required</dt><dd>If set to true, there must be at least one item in the dictionary.</dd>
         * </dl>
         */
        TypeDict = function (options) {
            Type.call(this, options);
        };

        TypeDict.prototype = new Type();
        TypeDict.prototype.__class = 'coa.data.TypeDict';
        TypeDict.prototype.optionDefinitions = Type.prototype.optionDefinitions.inherit({
            required: {
                text: "At least one is required.",
                type: "boolean",
                op: function(option, value) {
                    if (!option) {
                        return true;
                    }
                    if (value instanceof Object) {
                        return Object.keys(value).length > 0;
                    }
                    return false;
                }
            },
            keytype: {
                text: "Incorrect value as a key in this collection.",
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
                        if (!option.isValid(keys[i])) {
                            return false;
                        }
                    }
                    return true;
                }
            },
            valuetype: {
                text: "Incorrect value in this collection.",
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
                    k = this.options.keytype.convert(keys[i]);
                    v = this.options.valuetype.convert(value[keys[i]]);
                    if (k === undefined || v === undefined) {
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
                k = this.options.keytype.toJSON(keys[i]);
                v = this.options.valuetype.toJSON(value[keys[i]]);
                ret[k] = v;
            }
            return ret;
        };

        return TypeDict;
    }]);

})();
