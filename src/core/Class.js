(function() {

    var module = angular.module('coa.core');

    var Class;

    module.factory('Class', [function() {

        if (Class) {
            return Class;
        }

        /**
        * @ngdoc function
        * @name coa.core.class:Class
        * @description
        *
        * A base class for all other classes.
        */
        Class = function() {
        };

        Class.prototype = {};
        Class.prototype.__class = 'coa.core.Class';

        // TODO: Docs.
        Class.prototype.toString = function() {
            var ret = this.__class.split('.').pop();
            ret += '(';
            var members = Object.getOwnPropertyNames(this);
            for (var i = 0; i < members.length; i++) {
                if (i) {
                    ret +=", "
                }
                ret += members[i] + "=";
                ret += JSON.stringify(this[members[i]]);
            }
            ret += ')';
            return ret;
        };

        return Class;
    }]);

})();
