(function() {

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
    module.service('db', ['$q', '$rootScope', 'dbconfig', 'Options', 'Lookup', function($q, $rootScope, dbconfig, Options, Lookup) {

        // Name of the DB to use.
        var defaultDb = 'default';

        /**
         * Parse URI and instantiate appropriate storage engine.
         */
        function engine(url) {
            var ret;

            var parts = /^(\w+):/.exec(url);
            if (!parts) {
                d.fatal("Invalid engine URI", url);
            }
            try {
                var Engine = angular.injector(['ng', 'coa.store']).get('Engine' + parts[1].ucfirst());
                ret = new Engine(url);
            } catch(e) {
                d.fatal("Unable to instantiate engine for URI", url, e);
            }

            d('STORE', 'Creating an engine for URI', url, ':', ret);

            return ret;
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
        function insert(obj, opts) {

            var q = $q.defer();

            // Valid options for insert().
            var insertOptions = new Options({
            });

            // Validate data.
            if (!('toJSON' in obj)) {
                d.error("Cannot store objects that does not have toJSON():", obj);
                q.reject("Cannot store objects that does not have toJSON().");
                return q.promise;
            }
            if (!obj.__class) {
                d.error("Cannot store objects that does not define __class:", obj);
                q.reject("Cannot store objects that does not define __class.");
                return q.promise;
            }

            // Validate options.
            var options = insertOptions.validate(opts);
            if (!options) {
                d.warning("Invalid options", opts, "for storage insert(). Using defaults.");
                options = insertOptions.validate({});
            }

            // Get engine and store it.
            var engine = getEngine(defaultDb);
            var json = obj.toJSON();
            var name = obj.__class;

            d('STORE', 'Insert', json, 'to collection', name, 'in store', defaultDb);
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
        * @param {Function|string} Cls A constructor or name of some {@link coa.data.class:Data Data} class.
        * @param {Object|String|Lookup} filter Filtering conditions. See {@link coa.store.class:Lookup Lookup}.
        *   If this argument is not <i>Lookup</i> object, it is instantiated using the argument as constructor parameter.
        * @param {Object} opts Options for the operation (none so far).
        * @return {Promise} An Angular promise object resolved once data retrieved.
        * @description
        * A lookup is done to the storage and promise is resolved with an array of resulting JSON data.
        */
        function find(Cls, filter, opts) {

            var q = $q.defer();

            // Valid options for find().
            var findOptions = new Options({
            });

            // Validate options.
            var options = findOptions.validate(opts);
            if (!options) {
                d.warning("Invalid options", opts, "for storage find(). Using defaults.");
                options = findOptions.validate({});
            }

            // Validate arguments.
            var name;
            if (typeof(Cls) === "function") {
                name = Cls.prototype.__class;
            } else if(typeof(Cls) === "string") {
                name = Cls;
            } else {
                d.error("Invalid class for finding objects", Cls);
                q.reject("Invalid class for finding objects.");
                return q.promise;
            }

            if (!name) {
                d.error("Target object constructor for storing does not define class:", Cls);
                q.reject("Target object constructor for storing does not define class.");
                return q.promise;
            }
            filter = new Lookup(filter || {});

            // Fetch data.
            var engine = getEngine(defaultDb);
            engine.find(q, name, filter, opts);

            // Convert to targets.
            return q.promise.then(function(data){

                var ret = [];

                if (options.raw) {
                    ret = data;
                } else {
                    for (var i = 0; i < data.length; i++) {
                        ret.push(data[i]);
                    }
                }

                d('STORE', 'Find', filter, 'from collection', name, 'in store', defaultDb, ':', ret);
                return ret;
            });
        }

        /**
        * @ngdoc method
        * @name update
        * @methodOf coa.store.service:db
        * @param {Function|string} Cls A constructor or name of some {@link coa.data.class:Data Data} class.
        * @param {Object|String|Lookup} filter Filtering conditions for objects to update. See {@link coa.store.class:Lookup Lookup}.
        *    If this argument is not <i>Lookup</i> object, it is instantiated using the argument as constructor parameter.
        * @param {Object} changes An object containing new values to set.
        * @param {Object} opts Options for the operation (currently none).
        * @return {Promise} An Angular promise object resolved once update operation is complete.
        * @description
        * An update is executed to the objects matching the filter. The values defined is written into objects
        * matching the filter.
        */
        function update(Cls, filter, changes, opts) {

            var q = $q.defer();

            // Valid options for update().
            var updateOptions = new Options({
            });

            // Validate options.
            var options = updateOptions.validate(opts);
            if (!options) {
                d.warning("Invalid options", opts, "for storage update(). Using defaults.");
                options = updateOptions.validate({});
            }

            // Validate arguments.
            var name;
            if (typeof(Cls) === "function") {
                name = Cls.prototype.__class;
            } else if(typeof(Cls) === "string") {
                name = Cls;
            } else {
                d.error("Invalid class for finding objects", Cls);
                q.reject("Invalid class for finding objects.");
                return q.promise;
            }

            if (!name) {
                d.error("Target object constructor for storing does not define class:", Cls);
                q.reject("Target object constructor for storing does not define class.");
                return q.promise;
            }
            if ('_id' in changes) {
                d.error("Cannot change _id of", name, "with update", changes);
                q.reject("Cannot change _id with update().");
                return q.promise;
            }
            filter = new Lookup(filter || {});

            // Update data.
            var engine = getEngine(defaultDb);
            engine.update(q, name, filter, changes, opts);

            return q.promise;
        }

        /**
        * @ngdoc method
        * @name flush
        * @methodOf coa.store.service:db
        * @description
        * Since Angular promises do not trigger necessarily immediately, this function can be called
        * in order to force handling of the pending promises that has been already resolved.
        */
        function flush() {
            $rootScope.$apply();
        }

        /**
        * @ngdoc method
        * @name destroy
        * @methodOf coa.store.service:db
        * @description
        * Destroy everything in the store. This may not be implemented for all engines.
        */
        function destroy() {
            return getEngine(defaultDb).destroy($q.defer());
        }

        /**
        * @ngdoc method
        * @name using
        * @methodOf coa.store.service:db
        * @param {String} name Name of the storage.
        * @return {String} Name of the previous storage.
        * @description
        * Change the default storage to the named one.
        */
        function using(name) {
            var old = defaultDb;
            if (!dbconfig.has(name)) {
                d.warning("Switching to database that does not exist:", name);
            }
            d('STORE', 'Switching to storage', name);
            defaultDb = name;
            return old;
        }

        return {
            find: find,
            insert: insert,
            update: update,
            flush: flush,
            using: using,
            destroy: destroy,
        };
    }]);

})();
