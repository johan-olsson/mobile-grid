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
                    'grid.min.css': 'style/*.scss'
                }
            }
        },
        uglify: {
            js: {
                files: {
                    'grid.min.js': ['js/*!(min).js']
                }
            }
        },
        watch: {
            files: ['style/*.scss', 'js/*!(min).js'],
            tasks: ['sass', 'uglify']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'uglify', 'watch']);

};
