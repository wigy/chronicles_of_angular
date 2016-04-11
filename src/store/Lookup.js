(function() {

    var module = angular.module('coa.store');

    var Lookup;

    module.factory('Lookup', ['Class', function(Class) {

        if (Lookup) {
            return Lookup;
        }

        /**
        * @ngdoc function
        * @name coa.store.class:Lookup
        * @requires coa.core.class:Class
        * @param {String|Object} search Search condition.
        * @description
        *
        * The default implementation can find simple matches based on the exact values given for
        * members. For example
        * <pre>
        *    var found = (new Lookup({name: 'Foo Bar'})).find(collection);
        * </pre>
        * will find all values with the name `Foo Bar`. If the search value is a string, then the
        * name of the member is assumed to be `_id`.
        */
        Lookup = function(search) {

            if (typeof(search) === 'string') {
                search = {_id: search};
            } else if(!arguments.length) {
                search = {};
            } else if(typeof(search) !== 'object' || search === null) {
                d.error("Invalid lookup", search);
                search = {};
            }

            this.lookup = search;
        };
        Lookup.prototype = new Class();
        Lookup.prototype.__class = 'coa.store.Lookup';

        /**
        * @ngdoc method
        * @name search
        * @methodOf coa.store.class:Lookup
        * @param {Array|Object} collection A collection of objects to search from.
        * @return {Array} An array containing references to matching objects.
        */
        Lookup.prototype.find = function(collection) {
            var ret = [];

            for (var k in collection) {
                var match = true;
                for (var f in this.lookup) {
                    if (collection[k][f] !== this.lookup[f]) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    ret.push(collection[k]);
                }
            }

            return ret;
        };

        return Lookup;
    }]);

})();
