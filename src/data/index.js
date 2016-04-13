/**
 * @ngdoc overview
 * @name coa.data
 * @requires coa.core
 * @requires coa.store
 * @description
 *
 * Classes needed for storing and presenting data and its meta information.
 *
 * To define new data container, you need to write a constructor which
 * {@link coa.data.class:Data#methods_init initializes} the instance. Then you
 * attach prototype created from {@link coa.data.class:Data Data} class.
 * Each member is defined in the means of member types derived from {@link coa.data.class:Type Type}
 * <pre>
 * function MyClass(data) {
 *     this.init(data);
 * }
 *
 * MyClass.prototype = new Data([{
 *     name: {
 *              new TypeStr({
 *                  default: "default name",
 *                  label: "Name of the thing",
 *                  required: true
 *              }),
 *     }
 * }]);
 * </pre>
 *
 * In addition to defined members, there is an implicit member `_id`, which is set by
 * the storage, if an object is stored there. You can read more about storages {@link coa.store here}.
 * Also {@link coa.data.class:Data Data class} itself has simple interface for fetching ans storing
 * object instances. For example, to create new enrty:
 * <pre>
 *   var my = new MyClass({name: 'Zork'});
 *   my.save().then(function(id) {
 *       d("Saved with ID", id);
 *   });
 * </pre>
 *
 * In order to lookup for specific field matches, we can use
 * <pre>
 *   MyClass.find({name: 'Zork'}).then(function(list){
 *       d("Found", list");
 *   });
 * </pre>
 *
 * or to load an object with the specific ID
 * <pre>
 *   var my = new MyClass();
 *   my.load(id).then(function(){
 *      d("Now we have loaded", my);
 *   });
 * </pre>
 *
 * Standard member types are:
 * <dl>
 *   <dt>{@link coa.data.class:TypeAny TypeAny}</dt><dd>can contain any value</dd>
 *   <dt>{@link coa.data.class:TypeBool TypeBool}</dt><dd>boolean value</dd>
 *   <dt>{@link coa.data.class:TypeDict TypeDict}</dt><dd>an object</dd>
 *   <dt>{@link coa.data.class:TypeInt TypeInt}</dt><dd>integer number</dd>
 *   <dt>{@link coa.data.class:TypeList TypeList}</dt><dd>an array of objects with specified type</dd>
 *   <dt>{@link coa.data.class:TypeObj TypeObj}</dt><dd>any other Data object</dd>
 *   <dt>{@link coa.data.class:TypeOptions TypeOptions}</dt><dd>an object containing value for Options</dd>
 *   <dt>{@link coa.data.class:TypePair TypePair}</dt><dd>two values with specified types</dd>
 *   <dt>{@link coa.data.class:TypeStr TypeStr}</dt><dd>a string</dd>
 *   <dt>{@link coa.data.class:TypeTriple TypeTriple}</dt><dd>three values with specified types</dd>
 *   <dt>{@link coa.data.class:TypeTuple TypeTuple}</dt><dd>any number of values with specified types</dd>
 * </dl>
 */
angular.module('coa.data', ['coa.core', 'coa.store']);
