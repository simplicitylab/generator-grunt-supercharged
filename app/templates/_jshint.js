module.exports = {
    dist: {
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          browser: true,
          globals: {
            jQuery: true
          }
        },
        files: {
            src: ['src/js/app.js']
        }
    }
};