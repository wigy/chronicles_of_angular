(function() {

    var module = angular.module('coa.store');

    var Engine;

    module.factory('Engine', ['Class', function(Class) {

        if (Engine) {
            return Engine;
        }

        /**
        * @ngdoc function
        * @name coa.store.class:Engine
        * @requires coa.core.class:Class
        * @param {String} url Resource URI defined in the configuration for this engine.
        * @description
        *
        * The base class for database engine implementations. Engine is responsible for
        * storing and retrieving JSON-documents from the storage with the given name.
        */
        Engine = function(url) {
            this.url = null;
            this.server = null;
        };
        Engine.prototype = new Class();
        Engine.prototype.__class = 'coa.store.Engine';

        /**
        * @ngdoc method
        * @name init
        * @methodOf coa.store.class:Engine
        * @param {String} url Resource URI defined in the configuration for this engine.
        * @description
        * Split `url` to parts and set internal members `server`, `port`, `path`, `query` and `hash`
        * if applicapable.
        */
        Engine.prototype.init = function(url) {
            this.url = url;
            var parts = /^(memory):\/\/([^:\/\s#]+)$/.exec(url);
            if (!parts) {
                d.fatal("Invalid resource URI for database Engine:", url);
            }
            if (parts[2]) {
                this.server = parts[2];
            }
        }

        /**
        * @ngdoc method
        * @name insert
        * @methodOf coa.store.class:Engine
        * @param {Deferred} deferred Angular deferred instance to be signaled after storing performed.
        * @param {String} name Name of the collection.
        * @param {Object} json JSON data to store.
        * @param {Object} options Options for the operation.
        * @description
        * Engine needs to implement this method to provide services for storing objects.
        * By default this function gives warning and rejects the deferred's promise.
        * When implemented, on successful insertion the success handler of the promise is called with
        * the ID of the newly created stored item.
        */
        Engine.prototype.insert = function(deferred, name, json, opts) {
            d.warning("No implementation for insert() in", this.__class);
            deferred.reject("No implementation for insert().");
        };

        /**
        * @ngdoc method
        * @name find
        * @methodOf coa.store.class:Engine
        * @param {Deferred} deferred Angular deferred instance to be signaled after data retrieved.
        * @param {Lookup} filter An Lookup instance. See {@link coa.store.class:Lookup Lookup}.
        * @param {Object} options Options for the operation.
        * @description
        * Fetch data from the given storage matching the filter.
        * By default this function gives warning and rejects the deferred's promise.
        * When implemented, on successful lookup the success handler of the promise is called with the
        * resulting data.
        */
        Engine.prototype.find = function(deferred, name, filter, opts) {
            d.warning("No implementation for find() in", this.__class);
            deferred.reject("No implementation for find().");
        };

        return Engine;
    }]);

})();
