(function() {

    // TODO: Docs
    var module = angular.module('coa.store');

    function DBConfig() {

        this.dbs = {
            default: {
                url: 'mem://default',
                engine: null
            }
        };
    }
    DBConfig.prototype = {};

    DBConfig.prototype.set = function(name, url) {
        this.dbs[name] = {};
        this.dbs[name].url = url;
        this.dbs[name].engine = null;
    };

    DBConfig.prototype.has = function(name) {
        return name in this.dbs;
    };

    DBConfig.prototype.get = function(name) {
        if (this.dbs[name]) {
            return this.dbs[name];
        }
        d.fatal("No such database defined as", name);
    };

    module.value('dbconfig', new DBConfig());

})();
