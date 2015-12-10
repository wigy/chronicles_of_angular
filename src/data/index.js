/**
 * @ngdoc overview
 * @name coa.data
 * @requires coa.core
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
 * MyClass.prototype = new Data([{name: {type: TypeStr, default: "default name", label: "Name of the thing"}}]);
 * </pre>
 *
 * Standard member types are:
 * <dl>
 *   <dt>string</dt><dd>{@link coa.data.class:TypeStr TypeStr}</dd>
 * </dl>
 */
angular.module('coa.data', ['coa.core']);
