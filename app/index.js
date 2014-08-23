'use strict';


var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  
    // The name `constructor` is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly setup
        yeoman.generators.Base.apply(this, arguments);

    },
    
    /**
     * Prompt for app name
     **/
    promptAppName: function () {
      var done = this.async();
      
      this.prompt({
        type    : 'input',
        name    : 'name',
        message : 'Your project name',
        default : this.appname // Default to current folder name
      }, function (answers) {
        
        // store app name 
        this.app_name = answers.name;
        
        done();
      }.bind(this));
    },

    /**
     * Prompt for app description
     **/
    promptAppDescription: function () {
      var done = this.async();
      
      this.prompt({
        type    : 'input',
        name    : 'description',
        message : 'Your project description',
        default : ''
      }, function (answers) {
        
        // store app description
        this.app_description = answers.description;
        
        done();
      }.bind(this));
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
        
        var context = { 
            app_name : this.app_name,
            app_description: this.app_description
        };
      
        this.template("_package.json", "package.json", context);
        this.copy("_gruntfile.js", "Gruntfile.js");
        
        this.copy("_aliases.yaml", "grunt/aliases.yaml");
        this.copy("_uglify.js"   , "grunt/uglify.js");
    }
    
});