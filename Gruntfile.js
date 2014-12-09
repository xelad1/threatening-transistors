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
  })

  grunt.loadNpmTasks('grunt-explainjs');

  grunt.registerTask('buildDocs', ['explainjs']); 
}

