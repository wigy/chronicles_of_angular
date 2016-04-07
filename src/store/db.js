(function() {

    // TODO: Docs
    var module = angular.module('coa.store');

    /**
     * @ngdoc service
     * @name coa.store.service:db
     * @description
     *
     * This service provides higher level interface for storing and fetching object instances.
     * An object must be an instance of {@link coa.data.class:Data Data} class. The service
     * finds out the {@link coa.store.value:dbconfig configuration} for the currently selected
     * database. The appropriate {@link coa.store.class:Engine storage engine} is instantiated
     * if not yet used before. Then the conversion between {@link coa.data.class:Data Data} instance
     * and JSON is performed when the object is either stored or retrieced from the engine.
     */
    module.service('db', ['$q', '$rootScope', 'dbconfig', 'EngineMemory', function($q, $rootScope, dbconfig, EngineMemory) {

        // Name of the default DB to use.
        var defaultDb = 'default';

        function engine(url) {
            // TODO: Parse url
            // TODO: Module debug here
            return new EngineMemory(url);
        }

        /**
         * Helper function to instantiate and initialize engine.
         * If the named engine is not yet set in `dbconfig`, it is
         * created and inserted there. Note that every time `dbconfig`
         * is changed, the engine is nullified and new one is instantiated
         * on the first use.
         */
        function getEngine(name) {
            var conf = dbconfig.get(name);
            if (!conf.engine) {
                conf.engine = engine(conf.url);
            }
            return conf.engine;
        }

        // TODO: Implement.
        function insert(db, obj, opts) {
            if (typeof(db) !== 'string') {
                opts = obj;
                obj = db;
                db = defaultDb;
            }
            var engine = getEngine(db);
            var q = $q.defer();
            // TODO: Verify that it is Data
            // TODO: Module debug here
            engine.insert(q, obj.__class, obj.toJSON(), opts);
            // TODO: Chain promises to insert ID into object
            return q.promise;
        }

        // TODO: Implement.
        function find(db, cls, filter, opts) {
            if (typeof(db) !== 'string') {
                opts = filter;
                filter = cls;
                cls = db;
                db = defaultDb;
            }
            var engine = getEngine(db);
            var q = $q.defer();
            // TODO: Check for correct cls
            // TODO: Convert from JSON. What if partial data?
            engine.find(q, cls.prototype.__class, filter, opts);

            // TODO: Need to chain promises here to convert JSON to objects
            return q.promise;
        }

        function flush() {
            $rootScope.$apply();
        }

        function using(name) {
            if (!dbconfig.has(name)) {
                d.warning("Switching to database that does not exist:", name);
            }
            defaultDb = name;
        }

        return {
            find: find,
            insert: insert,
            flush: flush,
            using: using,
        };
    }]);

})();
