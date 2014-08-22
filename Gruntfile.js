module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    compass: true
                },
                files: {
                    'grid.min.css': 'src/**/*.scss'
                }
            }
        },
        uglify: {
            js: {
                files: {
                    'grid.min.js': ['src/**/*.js']
                }
            }
        },
        watch: {
            files: ['src/**/*'],
            tasks: ['sass', 'uglify']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'uglify', 'watch']);

};
