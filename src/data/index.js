/**
 * @ngdoc overview
 * @name coa.data
 * @requires coa.core
 * @description
 *
 * Classes needed for storing and presenting data and its meta information.
 *
 * To define new data container, you need to write a constructor for it which
 * defines member variable initial values and then {@link coa.data.class:Type#methods_init initializes} the instance. Then you
 * attach prototype created from {@link coa.data.class:Type Type} class.
 * Each member is defined in the means of member types
 * <pre>
 * function MyClass(data) {
 *     this.name = null;
 *     this.init(data);
 * }
 *
 * MyClass.prototype = new Type([{name: {type: TypeStr, label: "Name of the thing"}}]);
 * </pre>
 *
 * Standard member types are:
 * <dl>
 *   <dt>string</dt><dd>{@link coa.data.class:TypeStr TypeStr}</dd>
 * </dl>
 */
angular.module('coa.data', ['coa.core']);
