(function() {

    var module = angular.module('coa.store');

    /**
     * @ngdoc object
     * @name coa.store.value:dbconfig
     * @description
     *
     * Global database configuration as Angular value.
     * To configure databases in the application's `run()` method, one can
     * set named database instances by
     * <pre>
     *     MyApp.run(['dbconfig', function(dbconfig) {
     *         dbconfig.set('server', 'mongodb://localhost:8000');
     *     }
     * </pre>
     *
     * Supported resource URIs are
     *
     *   * `memory://name` - Store to the memory in the callection with the given *name*.
     *
     * The default database is in-memory database called `default`.
     */
    function DBConfig() {

        this.dbs = {
            default: {
                url: 'memory://default',
                engine: null
            }
        };
    }
    DBConfig.prototype = {};

    /**
     * Set the URI for database. Engine link will be reseted.
     */
    DBConfig.prototype.set = function(name, url) {
        if (!name.match(/^[_a-zA-Z0-9]+$/)) {
            d.fatal("Trying to configure invalid storage name", name, "Must use only characters and numbers.");
        }
        this.dbs[name] = {};
        this.dbs[name].url = url;
        this.dbs[name].engine = null;
    };

    /**
     * Check if the named connection exists.
     */
    DBConfig.prototype.has = function(name) {
        return name in this.dbs;
    };

    /**
     * Get the configuration for the given connection or raise an error if not set.
     */
    DBConfig.prototype.get = function(name) {
        if (this.dbs[name]) {
            return this.dbs[name];
        }
        d.fatal("No such database defined as", name);
    };

    module.value('dbconfig', new DBConfig());

})();
