#!/usr/bin/env node

var express = require('express');
var angularcontext = require('angularcontext');
var d = require('neat-dump');

/**
 * Set up Angular.
 */
var context = angularcontext.Context();
context.runFiles(
    [
        // TODO: Auto-generate server index. Need separate production server and development server using minified dist files.
        'dist/lib/neat-dump.min.js',
        'dist/lib/angular.min.js',
        'dist/coa.min.js'
    ],
    function (result, error) {
        if (error) {
            d.fatal("Failed to load Angular context:", error);
            return;
        } else {

            var $injector = context.injector(['ng', 'coa.auth', 'coa.data']);
            $injector.invoke(
                function ($http, User) {
                    d(new User())
                }
            );
        }
    }
);

/**
 * Launch application.
 */
var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(3000, function () {
  d('Example app listening on port 3000!');
});
