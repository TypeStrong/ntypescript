module.exports = function(grunt) {

    grunt.initConfig({
        ntypescript: {
            options: {
                project: '.'
            },
            default: {},
            pass: {
                options: {
                    project: './tasks/tests/pass'
                }
            },
            fail: {
                options: {
                    project: './tasks/tests/fail'
                }
            },
        },
    });

    grunt.loadTasks('tasks');
    // They would do:
    // grunt.loadNpmTasks('ntypescript');

    grunt.registerTask('default', ['ntypescript:default']);
};