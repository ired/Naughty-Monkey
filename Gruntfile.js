// Generated on 2014-06-30 using generator-webapp 0.4.9
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    //require('load-grunt-tasks')(grunt);

    require('jit-grunt')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            sass: {
                files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['sass:server', 'autoprefixer']
            },
            styles: {
                files: ['<%= config.app %>/styles/{,*/}*.css'],
                tasks: ['autoprefixer']
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                      '<%= config.app %>/{,*/}*.html',
                      '<%= config.app %>/{,*/}*.css',
                      '<%= config.app %>/{,*/}*.js',
                      '<%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                    ]
                },
                options: {
                    watchTask: true,
                    ghostMode: {
                        clicks: true,
                        scroll: false,
                        links: false,
                        forms: false
                    },
                    server: {
                      baseDir: "<%= config.app %>"
                      // index: "index.html"
                    }
                }
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        sass: {
            options: {
                outputStyle : 'nested'
                // includePaths: [
                //     'bower_components'
                // ]
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles',
                    src: ['*.scss'],
                    dest: '<%= config.app %>/styles',
                    ext: '.css'
                }]
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 3 versions','ie 8']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles/',
                    src: '{,*/}*.css',
                    dest: '<%= config.app %>/styles/'
                }]
            }
        },

    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'sass:server',
            'autoprefixer',
            'browserSync:dev',
            'watch'
        ]);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });


    grunt.registerTask('default', [
        'serve'
    ]);
};
