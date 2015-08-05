
var FilePatterns = require('./file_patterns.js').FilePatterns;

module.exports = function(grunt) {
    'use strict';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({

        vars: {
            // configurable variables
            src: 'app',
            tmp: 'tmp',
            tmpdist: 'target-grunt',
            vendorFileName: 'vendor.js',
            appName: 'search',
            sourceFileName: '<%= vars.appName %>.js',
            dist: 'target/searchApp',
            archiveName: 'searchApp',
            minifiedName: '',
            sourceName: ''
        },

        jshint: {
            files: FilePatterns.javascript.jshint,
            options: {
                bitwise: true,      // prohibit use of bitwise operators such as ^ (XOR), | (OR) and others
                curly: false,       // requires you to always put curly braces around blocks in loops and conditionals
                eqeqeq: false,      // prohibits the use of == and != in favor of === and !==
                eqnull: true,       // suppresses warnings about == null comparisons
                forin: true,        // requires all for in loops to filter object's items
                indent: 4,          // char size of indents
                latedef: "nofunc",  // prohibits the use of a variable before it was defined
                undef: true,        // prohibits the use of explicitly undeclared variables
                strict: true,       // requires all functions to run in ECMAScript 5's strict mode
                trailing: true,     // makes it an error to leave a trailing whitespace in your code
                maxerr: 50,         // maximum amount of warnings JSHint will produce before giving up
                smarttabs: false,   // suppresses warnings about mixed tabs and spaces when the latter are used for alignment only
                loopfunc: true,
                unused: "strict",   // warns against the non-use of declared variables and parameters
                globals: {
                    $: true,
                    window: true,
                    require: true,
                    module: true,
                    angular: true,
                    jasmine: true,
                    beforeEach: true,
                    afterEach: true,
                    describe: true,
                    inject: true,
                    expect: true,
                    it: true,
                    console: true,
                    spyOn: true
                }
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= vars.tmp %>',
                        '<%= vars.dist %>/*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= vars.dist %>/index.html',
            options: {
                dest: '<%= vars.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= vars.dist %>/{,*/}*.html'],
            css: ['<%= vars.dist %>/css/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= vars.dist %>']
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        cssmin: {
            add_banner: {
                options: {
                    banner: '/* CITC minified css file */'
                },
                files: {
                    '<%= vars.dist %>/styles/application.css': ['<%= vars.tmp %>/styles/*.css']
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= vars.dist %>',
                    src: ['*.html', 'app/{,*/}*.html'],
                    dest: '<%= vars.dist %>'
                }]
            }
        },

        uglify: {
            my_target: {
                files: {
                    '<%= vars.dist %>/app/application.js': ['tmp/<%= vars.sourceFileName %>']
                }
            }
        },

        // Copies files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    // Application source that will not be concatenated and/or minified
                    expand: true,
                    dot: true,
                    cwd: '.',
                    dest: '<%= vars.dist %>',
                    src: [
                        '*.html'
                    ]
                }, {
                    // App images
                    expand: true,
                    cwd: 'tmp/images',
                    dest: '<%= vars.dist %>/images',
                    src: ['generated/*']
                }, {
                    // App HTML templates
                    expand: true,
                    cwd: './',
                    dest: '<%= vars.dist %>',
                    src: grunt.file.expand(FilePatterns.html)
                }]
            },
            dependencies: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['.tmp/concat/scripts/vendor.js'],
                    dest: '<%= vars.dist %>',
                    filter: 'isFile'
                },{
                    // App fonts
                    expand: true,
                    flatten: true,
                    src: grunt.file.expand(FilePatterns.fonts),
                    dest: '<%= vars.dist %>/fonts',
                    filter: 'isFile'
                }]
            },
            styles: {
                files: [{
                    expand: true,
                    cwd: '<%= vars.src %>/styles',
                    dest: 'tmp/styles/',
                    src: '{,*/}*.css'
                }]
            }
        },

        concat: {
            options: {
                stripBanners: true
            },
            js: {
                src: grunt.file.expand(FilePatterns.javascript.concat),
                dest: '<%= vars.dist %>/app/application.js'
            },
            depJs: {
                src: grunt.file.expand(FilePatterns.javascript.concatDeps),
                dest: '<%= vars.dist %>/app/<%= vars.vendorFileName %>'
            },
            depCss: {
                src: grunt.file.expand(FilePatterns.javascript.concatDepsCSS),
                dest: '<%= vars.dist %>/styles/vendor.css'
            }
        },

        // make a zipfile
        compress: {
            main: {
                options: {
                    archive: '<%= vars.dist %>/<%= vars.archiveName %>.zip'
                },
                files: [
                    {src: ['path/**'], dest: '<%= vars.dist %>', filter: 'isFile'}, // includes files in path
                    {expand: true, cwd: '<%= vars.dist %>', src: ['**'] /*, dest: '<%= vars.dist %>' */} // makes all src relative to cwd
//                    {flatten: true, src: ['path/**'], dest: 'internal_folder4/', filter: 'isFile'} // flattens results to a single level
                ]
            }
        },

        bowerInstall: {
            target: {
                src: ['app/index.html'],
                jsPattern: '<script type="text/javascript" src="{{filePath}}"></script>',
                cssPattern: '<link href="{{filePath}}" rel="stylesheet" />'
            }
        },

        bump: {
            options: {
                commit: true,
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false
            }
        }
    });

    grunt.registerTask('label', function() {
        var buildLabel = grunt.option('buildLabel');
        if (buildLabel) {
            grunt.file.write('build/buildLabel', buildLabel);
        }
    });

    grunt.registerTask('default', []);
    grunt.registerTask('versionIt', ['stringReplace']);

    grunt.registerTask('cucumberjs', ['connect:headless', 'exec:cucumberjs']);
    grunt.registerTask('dev', ['karma:unit:start', 'watch:test']);
    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'copy:styles',
        'concat',
        'copy:dist',
        'cssmin',
        'usemin',
        'copy:dependencies',
        'compress'
    ]);
};
