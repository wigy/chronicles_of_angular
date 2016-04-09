/**
 * @ngdoc overview
 * @name coa.store
 * @requires coa.core
 * @description
 *
 * The store module provides implementations for storing objects either temporarily
 * or permanently. Different storage engines can be configured.
 *
 * TODO: List of engines.
 *
 * <pre>
 *  TODO: Example about store use with direct API.
 *  TODO: Example about store use from Data class members.
 * </pre>
 */
angular.module('coa.store', ['coa.core']);

angular.module('coa.store').run(function(){
    d.channels({
        STORE: null
    });
})
