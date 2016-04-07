(function() {

    // TODO: Docs
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

        Engine.prototype.insert = function(promise, name, json, opts) {
            // TODO: Warning
        };

        Engine.prototype.find = function(promise, name, filter, opts) {
            // TODO: Warning
        };

        return Engine;
    }]);

})();
