var grunt = require('grunt');
grunt.loadNpmTasks('grunt-express-server');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.initConfig({
    express: {
        options: {

        },
        dev: {
            options: {
                script: './app.js'
            }
        }
    },
    watch: {
        frontend: {
            options: {
                livereload: true
            },
            files: [
                // triggering livereload when the .css file is updated
                // (compared to triggering when sass completes)
                // allows livereload to not do a full page refresh
                '/public/**/*'
            ]
        },
        dev: {
            files: [
                'app.js'
            ],
            tasks: [
                'express:dev'
            ],
            options: {
                nospawn: true, //Without this option specified express won't be reloaded
                atBegin: true,
            }
        }
    }
});
grunt.registerTask('serve',[ 'watch' ])