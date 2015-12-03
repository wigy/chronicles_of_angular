'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
      cog: {
          options: {
              name: "coa",
              external: ['angular'],
              src: {
                  config: [],
                  models: [],
                  data: [],
                  code: ['src/globals.js', 'src/**/index.js', 'src/**/*.js'],
              },
              media: {
                  sounds: 'sounds/*.mp3',
              },
              test: {
                  unit: {
                      tests: 'test/**/*_spec.js',
                      lib: ['jasmine', 'angular-mock'],
                      css: ['jasmine']
                  }
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
