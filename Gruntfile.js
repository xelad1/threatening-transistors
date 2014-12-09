module.exports = function(grunt) {
  grunt.initConfig({
    explainjs: {
      dynamic_mappings: {
          files : [
          {
            expand: true,
            cwd: 'public/',
            src:['**/*.js'],
            dest: 'documentation/',
            ext: '.html',
            extDot: 'first'
          }
          ]
        },
      dist: {
        options: {
          showFilename: true // default is false
        },
        // files: [{
        //   src: ['<%= filename %>.js'],
        //   dest: 'doc/explainjs/<%= filename %>.html'
        // }]
      },
    },
    jshint: {
      files: ['Gruntfile.js', './*.js', 'public/*.js', 'public/app/**.*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-explainjs');

  grunt.registerTask('buildDocs', ['explainjs']); 
  grunt.registerTask('hint', ['jshint']);
  grunt.registerTask('preflight', ['jshint', 'explainjs']);
};

