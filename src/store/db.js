(function() {

    // TODO: Docs
    var module = angular.module('coa.store');

    module.service('db', ['$q', 'dbconfig', 'EngineMem', function($q, dbconfig, EngineMem) {

        function engine(url) {
            // TODO: Parse url
            // TODO: Module debug here
            return new EngineMem(url);
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
                db = 'default';
            }
            var engine = getEngine(db);
            var q = $q.defer();
            // TODO: Convert to JSON
            // TODO: Module debug here
            engine.insert(q, obj, opts);

            return q.promise;
        }

        // TODO: Implement.
        function find(db, cls, filter, opts) {
            if (typeof(db) !== 'string') {
                opts = filter;
                filter = cls;
                cls = db;
                db = 'default';
            }
            var engine = getEngine(db);
            var q = $q.defer();
            // TODO: Convert from JSON
            engine.find(q, cls, filter, opts);
            return q.promise;
        }

        return {
            find: find,
            insert: insert,
        };
    }]);

})();
