/**
 * @ngdoc overview
 * @name coa.store
 * @requires coa.core
 * @description
 *
 * The store module provides implementations for storing objects either temporarily
 * or permanently. Different storage engines can be configured and accessed by their
 * names. Essintially any object can stored that fullfills the following conditions:
 *
 * <ol>
 *   <li>It has {@link coa.core.class:Class Class} as its prototype.
 *   <li>It implements `toJSON()` to extract data for storing.
 *   <li>It can be reconstructed with `new`-operator by using the JSON-data given out by `toJSON`.
 * </ol>
 *
 * Available storage engines are:
 * <dl>
 *   <dt>In-memory storage</dt><dd>{@link coa.store.class:EngineMemory An engine storing data to the browser memory}</dd>
 * </dl>
 *
 * Typically storage access is done via methods in {@link coa.data.class:Data Data} class. However, it is also
 * possible to access storage interface directly. Assume that <i>Project</i> is a constructor of some <i>Data</i>
 * class. Then we can create new instances with {@link coa.store.service:db#methods_insert insert()}
 * <pre>
 *     var p1 = new Project({name: "Project 1", description: "This is one."});
 *     var p2 = new Project({name: "Project 2", description: "This is two."});
 *     db.insert(p1).then(function(id1){
 *         db.insert(p2).then(function(id2) {
 *             d("Created new Projects with IDs", id1, "and", id2);
 *         });
 *     });
 * </pre>
 *
 * Note that inserting is asynchronous. Similarly fetching data is asynchronous. To find all instances in the store
 * you can use {@link coa.store.service:db#methods_find find()}
 * <pre>
 *     db.find(Project).then(function(data) {
 *          d("We have now projects", data);
 *     });
 * </pre>
 */
angular.module('coa.store', ['coa.core']);

angular.module('coa.store').run(function(){
    d.channels({
        STORE: null
    });
})
