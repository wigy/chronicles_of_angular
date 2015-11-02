'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
      build: {
          options: {
              name: "coa",
              external: {
                  lib: ['angular'],
              },
              src: {
                  config: [],
                  models: [],
                  data: [],
                  code: ['src/util.js', 'src/**/index.js', 'src/**/*.js', 'test.js'],
              },
              index: {
                  app: 'index.html',
              },
          }
      },
  });

  grunt.loadTasks('node_modules/chronicles_of_grunt/tasks/');
  grunt.registerTask('default', ['usage']);

};
