var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  
    // The name `constructor` is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly setup
        yeoman.generators.Base.apply(this, arguments);

    },
    
    method1: function () {
        console.log('method 1 just ran');
    },
    method2: function () {
        console.log('method 2 just ran');
    }
    
});