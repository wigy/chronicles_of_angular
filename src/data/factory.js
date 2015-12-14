(function() {

    var module = angular.module('coa.data');

    /**
     * @ngdoc service
     * @name coa.data.service:factory
     * @description
     *
     * Service to construct instances from arbitrary data class in any module.
     * <pre>
     *     ['factory', function(factory) {
     *         var user = factory.create('coa.auth', 'User', {name: 'Wigy'});
     *     }]
     * </pre>
     * Note that constructor provided by the <i>factory</i> is not the same than the one, which
     * is injected directly from the corresponding module. You need explicitly get the constructor
     * from this service in order to use <code>instanceof</code>. For example
     * <pre>
     *     ['User', 'factory', function(User, factory) {
     *         var user = factory.create('coa.auth', 'User', {name: 'Wigy'});
     *         user instanceof User; // false
     *         user instanceof factory.constructor('coa.auth', 'User'); // true
     *
     *         var user = new User;
     *         user instanceof User; // true
     *         user instanceof factory.constructor('coa.auth', 'User'); // false
     *     }
     * </pre>
     */
    module.service('factory', [function() {

        var constructors = {};

        /**
        * @ngdoc method
        * @name constructor
        * @methodOf coa.data.service:factory
        * @param {String} mod The name of the module, which defines the class.
        * @param {String} cls Name of the class to look for.
        * @return {Function} A constructor or null if not found.
        * @description
        *
        * Find the constructor for the given class.
        */
        function constructor(mod, cls) {
            if (constructors[mod] && constructors[mod][cls]) {
                return constructors[mod][cls];
            }
            var injector = angular.injector([mod]);
            if (!injector.has(cls)) {
                d("There is no such class than", cls, "defined in the module", mod);
                return null;
            }
            if (!constructors[mod]) {
                constructors[mod] = {};
            }
            constructors[mod][cls] = injector.get(cls);
            return constructors[mod][cls];
        }

        /**
        * @ngdoc method
        * @name create
        * @methodOf coa.data.service:factory
        * @param {String} mod The name of the module, which defines the class.
        * @param {String} cls Name of the class to instantiate.
        * @param {Object} data Initial data structure for an instance.
        * @return {Data} An instance created or null if class not found.
        * @description
        *
        * Create an instance from the given class. Alternatively first argument
        * can be fully qualified class name including the module name, for example
        * <code>coa.auth.Class</code>, in which case the second argument can be dropped.
        */
        function create(mod, cls, data) {
            if (arguments.length === 2) {
                var parts = mod.split('.');
                data = cls;
                cls = parts.pop();
                mod = parts.join('.');
            }
            var Cons = constructor(mod, cls);
            return Cons ? new Cons(data) : null;
        }

        return {
            constructor: constructor,
            create: create
        };
    }]);

})();
