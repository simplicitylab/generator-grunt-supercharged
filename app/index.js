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
     * Prompt for optional package selection
     **/
    promptOptionalPackages: function () {
      var done = this.async();
      
      this.prompt({
        type    : 'checkbox',
        name    : 'optional_packages',
        message : 'Choose optional packages',
        choices: [
            {
                name: 'grunt-contrib-clean',
                value: 'clean'
            }, 
            {
                name: 'grunt-contrib-watch',
                value: 'watch'
            }         
        ]

      }, function (answers) {
        
          // store optional packages
          this.optional_packages = answers.optional_packages;
        
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
      
        this.copy("_gruntfile.js", "Gruntfile.js");
        this.copy("_uglify.js"   , "grunt/uglify.js");
      
        //
        //  handle optional packages
        //
      
        var txt_npm_plugin_clean   = ''; 
        var txt_alias_plugin_clean = '';
        var txt_npm_plugin_watch   = '';
        var txt_alias_plugin_watch = '';
        var txt_yaml_newline       = '';
        
        // handle option grunt-contrib-clean
        if ( this.optional_packages.indexOf('clean') != -1 ) {

            txt_npm_plugin_clean   = ',\n\t\t"grunt-contrib-clean" : "~0.5.0"';
            txt_alias_plugin_clean = "\n    - 'clean'";
            
            this.copy("_clean.js", "grunt/clean.js");
            
        }

        // handle option grunt-contrib-watch
        if ( this.optional_packages.indexOf('watch') != -1 ) {
            
            txt_npm_plugin_watch   = ',\n\t\t"grunt-contrib-watch" : "~0.5.0"';
            txt_alias_plugin_watch = "\n    - 'watch'";
            
            this.copy("_watch.js", "grunt/watch.js");
        }
      
        var package_context = { 
            app_name : this.app_name,
            app_description: this.app_description,
            plugin_clean: txt_npm_plugin_clean,
            plugin_watch: txt_npm_plugin_watch
        };
      
        this.template("_package.json", "package.json", package_context);
      
        var aliases_context = {
            plugin_clean: txt_alias_plugin_clean,
            plugin_watch: txt_alias_plugin_watch,
        };
        
        console.log(aliases_context);
      
        this.template("_aliases.yaml", "grunt/aliases.yaml", aliases_context);
      
    }
    
});