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
            d('STORE', 'Creating an engine for', url);
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

        /**
        * @ngdoc method
        * @name insert
        * @methodOf coa.store.service:db
        * @param {Data} obj An object instance to store.
        * @param {Object} opts Options for the operation (currently none).
        * @return {Promise} An Angular promise object resolved once stored.
        * @description
        * This creates new instance to the collection. The name of the collection will
        * be the name of the class of the object to store. If successful, the ID of the
        * newly created object is set into the target object. It is also parameter for
        * the success-function of the promise, when resolved.
        */
        function insert(db, obj, opts) {

            // Figure out arguments.
            if (typeof(db) !== 'string') {
                opts = obj;
                obj = db;
                db = defaultDb;
            }

            // Validate data.
            if (!('toJSON' in obj)) {
                d.error("Cannot store objects that does not have toJSON():", obj);
                return;
            }
            if (!obj.__class) {
                d.error("Cannot store objects that does not define __class:", obj);
                return;
            }

            // Get engine and store it.
            var engine = getEngine(db);
            var q = $q.defer();
            var json = obj.toJSON();
            var name = obj.__class;

            d('STORE', 'Insert', json, 'to collection', name, 'in', db);
            engine.insert(q, name, json, opts);

            // Mark ID to the object.
            return q.promise.then(function(id){
                obj._id = id;
                return id;
            });
        }

        /**
        * @ngdoc method
        * @name find
        * @methodOf coa.store.service:db
        * @param {Function} Cls A constructor of some {@link coa.data.class:Data Data} class.
        * @param {Object} opts Options for the operation (currently none).
        * @return {Promise} An Angular promise object resolved once data retrieved.
        * @description
        * A lookup is done to the storage and promise is resolved with an array of results all
        * instantiated as a members of the target class.
        */
        function find(db, Cls, filter, opts) {

            // TODO: Support single fetch when ID given as a string.
            // Figure out arguments.
            if (typeof(db) !== 'string') {
                opts = filter;
                filter = Cls;
                Cls = db;
                db = defaultDb;
            }

            // Validate arguments.
            // TODO: Check for correct cls
            var name = Cls.prototype.__class;
            filter = filter || {};

            // Fetch data.
            var engine = getEngine(db);
            var q = $q.defer();
            engine.find(q, name, filter, opts);

            // TODO: Option to keep data raw.

            // Convert to targets.
            return q.promise.then(function(data){
                var ret = [];
                for (var i = 0; i < data.length; i++) {
                    ret.push(new Cls(data[i]));
                }
                d('STORE', 'Find', filter, 'from collection', name, 'in', db, ':', ret);
                return ret;
            });
        }

        // TODO: Docs
        function flush() {
            $rootScope.$apply();
        }

        // TODO: Docs
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
