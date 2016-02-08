module.exports = function(grunt) {

    grunt.initConfig({
        cog: {
            options: {
                name: "coa",
                title: "Chronicles of Angular",
                external: ['angular'],
                paths: {
                    template: 'sample/templates.js'
                },
                src: {
                    config: ['src/globals.js', 'src/string.js'],
                    models: [],
                    data: [],
                    libs: ['src/**/index.js', 'src/**/*.js'],
                    templates: 'sample/template.html'
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
                docs: {
                    engine: 'ngdocs'
                }
            }
        },
    });

    grunt.loadTasks('node_modules/chronicles_of_grunt/tasks/');
    grunt.registerTask('default', ['usage']);
};
