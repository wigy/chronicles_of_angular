'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
      build: {
          options: {
              name: "coa",
              external: {
                  lib: ['angular'],
                  unittestlib: ['jasmine'],
                  unittestcss: ['jasmine'],
              },
              src: {
                  config: [],
                  models: [],
                  data: [],
                  code: ['src/globals.js', 'src/**/index.js', 'src/**/*.js'],
              },
              test: {
                  unit: 'test/*_spec.js'
              },
              index: {
                  app: 'index.html',
                  test: 'test.html'
              },
          }
      },
  });

  grunt.loadTasks('node_modules/chronicles_of_grunt/tasks/');
  grunt.registerTask('default', ['usage']);

};
