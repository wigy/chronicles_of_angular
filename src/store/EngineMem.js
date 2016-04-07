(function() {

    // TODO: Docs
    var module = angular.module('coa.store');

    var EngineMem;

    module.factory('EngineMem', ['Engine', function(Engine) {

        if (EngineMem) {
            return EngineMem;
        }

        EngineMem = function(url) {
            this.init(url);
        };
        EngineMem.prototype = new Engine();
        EngineMem.prototype.__class = 'coa.store.EngineMem';

        EngineMem.prototype.insert = function(deferred, obj, opts) {
            d("Insert", obj);
            // TODO: Implement
            deferred.resolve();
        };

        EngineMem.prototype.find = function(deferred, cls, filter, opts) {
            d("Find", cls);
            // TODO: Implement
            deferred.resolve([]);
        };

        return EngineMem;
    }]);

})();
