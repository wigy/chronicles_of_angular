module.exports = function(grunt) {

    grunt.initConfig({
        cog: {
            options: {
                name: "coa",
                title: "Chronicles of Angular",
                external: ['angular'],
                src: {
                    config: ['src/globals.js', 'src/string.js'],
                    models: [],
                    data: [],
                    code: ['src/**/index.js', 'src/**/*.js'],
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
