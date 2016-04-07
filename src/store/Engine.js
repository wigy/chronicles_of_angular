(function() {

    // TODO: Docs
    var module = angular.module('coa.store');

    var Engine;

    module.factory('Engine', ['Class', function(Class) {

        if (Engine) {
            return Engine;
        }

        Engine = function(url) {
            this.url = null;
        };
        Engine.prototype = new Class();
        Engine.prototype.__class = 'coa.store.Engine';

        Engine.prototype.init = function(url) {
            this.url = url;
        }

        Engine.prototype.insert = function(promise, obj, opts) {
            // TODO: Warning
        };

        Engine.prototype.find = function(promise, cls, filter, opts) {
            // TODO: Warning
        };

        return Engine;
    }]);

})();
