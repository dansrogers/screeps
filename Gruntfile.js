module.exports = function(grunt) {
  var config = require('./.screeps.json');
  var branch = grunt.option('branch') || config.branch;
  var email = grunt.option('email') || config.email;
  var password = grunt.option('password') || config.password;
  var ptr = grunt.option('ptr') ? true : config.ptr;

  grunt.loadNpmTasks('grunt-screeps');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-file-append');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');

  var currentdate = new Date();

  // Output the current date and branch.
  grunt.log.subhead('Task Start: ' + currentdate.toLocaleString());
  grunt.log.writeln('Branch: ' + branch);

  grunt.initConfig({
    screeps: {
      options: {
        email: email,
        password: password,
        branch: branch,
        ptr: ptr,
      },
      dist: {
        src: ['dist/*.js' ],
      },
    },

    // Remove all files from the dist folder.
    clean: {
      'dist': ['dist' ],
    },

    // Copy all source files into the dist folder, flattening the folder
    // structure by converting path delimiters to underscores
    copy: {
      // Pushes the game code to the dist folder so it can be modified
      // before being send to the screeps server.
      screeps: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: [
              '**/*.js',
              'screeps_modules/sos/Kernel.js',
              'screeps_modules/sos/os_utils.js',
            ],
            dest: 'dist/',
            filter: 'isFile',
            rename: function(dest, src) {
            // Change the path name utilize underscores for folders
              return dest + src.replace(/\//g, '_');
            },
          },
          {
            expand: true,
            cwd: 'screeps_modules',
            src: [
              'sos/Kernel.js',
              'sos/os_utils.js',
            ],
            dest: 'dist/',
            filter: 'isFile',
            rename: function(dest, src) {
            // Change the path name utilize underscores for folders
              return dest + src.replace(/\//g, '_');
            },
          },
        ],
      },
    },

    // Add version variable using current timestamp.
    file_append: {
      versioning: {
        files: [{
          append: "\nmodule.exports.SCRIPT_VERSION = " + currentdate.getTime() + ";\n",
          input: 'dist/version.js',
        }],
      },
    },

    eslint: { // configure the task
      options: {
        configFile: '.eslintrc.js',
        fix: true,
      },
      target: [ // some example files
        'Gruntfile.js',
        'src/**/*.js',
        '.eslintrc.js',
      ],

    },
  });

  grunt.registerTask('default', ['eslint', 'clean', 'copy:screeps', 'file_append:versioning', 'screeps']);
  grunt.registerTask('test', ['eslint']);
  grunt.registerTask('pretty', ['eslint']);
};
