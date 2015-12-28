(function() {

    var module = angular.module('coa.data');

    // The collection of injected constructors indexed by module name and class name.
    var constructors = {};

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
     */
    module.service('factory', [function() {

        /**
        * @ngdoc method
        * @name constructor
        * @methodOf coa.data.service:factory
        * @param {String} mod The name of the module, which defines the class.
        * @param {String} cls Name of the class to look for.
        * @return {Function} A constructor or null if not found.
        * @description
        *
        * Find the constructor for the given class. Alternatively first argument
        * can be fully qualified class name including the module name, for example
        * <code>coa.auth.Class</code>, in which case the second argument can be dropped.
        */
        function constructor(mod, cls) {
            if (arguments.length === 1) {
                var parts = mod.split('.');
                cls = parts.pop();
                mod = parts.join('.');
            }
            if (constructors[mod] && constructors[mod][cls]) {
                return constructors[mod][cls];
            }
            var injector = angular.injector(['ng', mod]);
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
            if (arguments.length < 3) {
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
