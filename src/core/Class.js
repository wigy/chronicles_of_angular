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
         * fully qualified class name. The return value has format <i>ClassName({member: val, member2: val2})</i>,
         * where is property member is listed with their values. The names starting with underscore or dollar
         * are skipped.
         */
        Class.prototype.toString = function() {

            var args = '';
            var members = Object.getOwnPropertyNames(this).sort();
            var added = false;
            for (var i = 0; i < members.length; i++) {
                if (members[i][0] === '_' || members[i][0] === '$') {
                    continue;
                }
                var str = members[i] + ": ";
                var member = this[members[i]];
                if (member && member.__class) {
                    str += member.toString();
                } else if (typeof(member) === 'function') {
                    continue;
                } else if (member instanceof Array) {
                    str += '[';
                    for (var j=0; j < member.length; j++) {
                        if (j) {
                            str += ', ';
                        }
                        if (member[j] instanceof Class) {
                            str += member[j].toString();
                        } else {
                            str += JSON.stringify(member[j]);
                        }
                    }
                    str += ']';
                } else {
                    str += JSON.stringify(member);
                }
                if (added) {
                    args +=", ";
                }
                args += str;
                added = true;
            }

            if (!this.__class) {
                // Support direct calls with non-Class objects.
                return '{' + args + '}';
            }
            if (args) {
                args = '{' + args + '}';
            }
            return this.__class.split('.').pop() + '(' + args + ')';
        };

        return Class;
    }]);

})();
