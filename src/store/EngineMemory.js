(function() {

    // TODO: Docs
    var module = angular.module('coa.store');

    var EngineMemory;

    module.factory('EngineMemory', ['Engine', function(Engine) {

        if (EngineMemory) {
            return EngineMemory;
        }

        EngineMemory = function(url) {
            this.init(url);
        };
        EngineMemory.prototype = new Engine();
        EngineMemory.prototype.__class = 'coa.store.EngineMemory';

        EngineMemory.prototype.insert = function(deferred, obj, opts) {
            d("Insert", obj);
            // TODO: Implement
            deferred.resolve();
        };

        EngineMemory.prototype.find = function(deferred, cls, filter, opts) {
            d("Find", cls);
            // TODO: Implement
            deferred.resolve([]);
        };

        return EngineMemory;
    }]);

})();
