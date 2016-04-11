(function() {

    var module = angular.module('coa.store');

    var EngineMemory;

    // This structure stores every memory storage content.
    var storage = {};

    module.factory('EngineMemory', ['Engine', function(Engine) {

        if (EngineMemory) {
            return EngineMemory;
        }

        /**
        * @ngdoc function
        * @name coa.store.class:EngineMemory
        * @requires coa.store.class:Engine
        * @param {String} url Resource URI defined in the configuration for this engine.
        * @description
        *
        * A database storage {@link coa.store.class:Engine engine} storing data into memory. Storing happens immediately
        * on call, but all data vanishes for example on browser refresh.
        */
        EngineMemory = function(url) {
            this.init(url);
            if (!(this.server in storage)) {
                storage[this.server] = {};
            }
        };
        EngineMemory.prototype = new Engine();
        EngineMemory.prototype.__class = 'coa.store.EngineMemory';

        Engine.prototype.insert = function(deferred, name, json, opts) {

            if (!(name in storage[this.server])) {
                storage[this.server][name] = {};
            }

            var id = 'mem' + (Object.keys(storage[this.server][name]).length + 1).toString();
            storage[this.server][name][id] = angular.copy(json);
            storage[this.server][name][id]._id = id;

            deferred.resolve(id);
        };

        EngineMemory.prototype.find = function(deferred, name, filter, opts) {
            var ret = [];
            if (name in storage[this.server]) {
                var keys = Object.keys(storage[this.server][name]);
                for (var id in storage[this.server][name]) {
                    ret.push(angular.copy(storage[this.server][name][id]));
                }
                ret = filter.search(ret);
            }
            deferred.resolve(ret);
        };

        EngineMemory.prototype.destroy = function(deferred) {
            storage[this.server] = {};
            deferred.resolve();
        };

        return EngineMemory;
    }]);

})();
