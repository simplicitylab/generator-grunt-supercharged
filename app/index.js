'use strict';


var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  
    // The name `constructor` is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly setup
        yeoman.generators.Base.apply(this, arguments);

    },
    
    /**
     * Creates directories
     **/
    createDirectories: function () {
        
        this.mkdir("grunt");
        
        this.mkdir("src");
        this.mkdir("src/js");
        this.mkdir("src/css");
        
        this.mkdir("dist");
        this.mkdir("dist/js");
        this.mkdir("dist/css");
        
    },
    
    /**
     * Copy files
     **/
    copyFiles: function() {
        
        this.copy("_package.json", "package.json");
        this.copy("_gruntfile.js", "Gruntfile.js");
        
        this.copy("_aliases.yaml", "grunt/aliases.yaml");
        this.copy("_uglify.js"   , "grunt/uglify.js");
    }
    
});