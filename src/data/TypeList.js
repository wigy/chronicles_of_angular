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
    }]);

})();
