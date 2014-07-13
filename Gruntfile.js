module.exports = function (grunt) {

  var cssFiles =  [
    'flat-ui/css/jquery.mobile.internal-png.css',
    'flat-ui/css/jquery.mobile.structure.css',
    'flat-ui/css/jquery.mobile.structure.custom.css',
    'flat-ui/css/jquery.mobile.theme.css',
    'flat-ui/css/swatches.css',
    'flat-ui/css/fonts.css'
  ];

  grunt.initConfig({
    concat: {
      css: {
        src: cssFiles,
        dest: 'css/jquery.mobile.flatui.css'
      }
    },
    stylus: {
      compile: {
        files: {
          'flat-ui/css/swatches.css': ['flat-ui/stylus/swatches/*.styl']
        }
      }
    },
    copy: {
      main: {
        files: [
          { expand: true, src: ['images/**'], cwd: 'flat-ui/css/', dest: 'css/' },
          { expand: true, src: ['fonts/**'], cwd: 'flat-ui/css/', dest: 'css/' }
        ]
      }
    },
    cssmin: {
      compress: {
        files: {
          'css/jquery.mobile.flatui.min.css': 'css/jquery.mobile.flatui.css'
        }
      }
    },
    watch: {
      stylus: {
        files: ['flat-ui/stylus/**/*.styl'],
        tasks: ['stylus', 'concat', 'copy', 'cssmin']
      },
      css: {
        files: cssFiles,
        tasks: ['concat', 'copy', 'cssmin']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['stylus', 'concat', 'copy', 'cssmin']);
};
