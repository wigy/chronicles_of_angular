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

        /**
         * @ngdoc method
         * @name toString
         * @methodOf coa.core.class:Class
         * @return {String} A string presentation of this object.
         * @description
         *
         * This is default implementation for stringifying function for all classes.
         * It assumes that prototype sets correct <tt>__class</tt> member to have
         * fully qualified class name. The return value has format <i>ClassName(member=val, member2=val2)</i>,
         * where is property member is listed with their values.
         */
        Class.prototype.toString = function() {
            var ret = this.__class.split('.').pop();
            ret += '(';
            var members = Object.getOwnPropertyNames(this).sort();
            var added = false;
            for (var i = 0; i < members.length; i++) {
                var str = members[i] + "=";
                var member = this[members[i]];
                if (member && member.__class) {
                    str += member.toString();
                } else if (typeof(member) == 'function') {
                    continue;
                } else {
                    str += JSON.stringify(member);
                }
                if (added) {
                    ret +=", "
                }
                ret += str;
                added = true;
            }
            ret += ')';
            return ret;
        };

        return Class;
    }]);

})();
