'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
      build: {
          options: {
              name: "coa",
              external: {
                  lib: ['angular'],
                  css: ['bootstrap'],
                  fonts: ['bootstrap'],
              },
              src: {
                  config: [],
                  models: [],
                  data: [],
                  code: ['lib/**/*.js'],
              },
              index: {
                  app: 'test.html',
              },
          }
      },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadTasks('node_modules/chronicles_of_grunt/tasks/');

  // Default task.
  grunt.registerTask('default', ['usage']);
};
