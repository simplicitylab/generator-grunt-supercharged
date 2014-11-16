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
                name: 'grunt-contrib-uglify',
                value: 'uglify'
            },
            {
                name: 'grunt-contrib-clean',
                value: 'clean'
            }, 
            {
                name: 'grunt-contrib-watch',
                value: 'watch'
            }, 
            {
                name: 'grunt-contrib-sass',
                value: 'sass'
            }, 
            {
                name: 'grunt-contrib-jshint',
                value: 'jshint'
            }, 
            {
                name: 'grunt-contrib-concat',
                value: 'concat'
            }, 
            {
                name: 'grunt-contrib-jslint',
                value: 'jslint'
            }, 
            {
                name: 'grunt-contrib-csslint',
                value: 'csslint'
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
      
        // copy gruntfile
        this.copy("_gruntfile.js", "Gruntfile.js");
      
        // copy app.js dummy file
        this.copy("_app.js", "src/js/app.js");
        
        //
        //  handle optional packages
        //

        var txt_npm_plugin_uglify   = ''; 
        var txt_alias_plugin_uglify = '';
        
        var txt_npm_plugin_clean   = ''; 
        var txt_alias_plugin_clean = '';
        
        var txt_npm_plugin_watch   = '';
        var txt_alias_plugin_watch = '';
        
        var txt_npm_plugin_sass   = '';
        var txt_alias_plugin_sass = '';        

        var txt_npm_plugin_jshint   = '';
        var txt_alias_plugin_jshint = '';        

        var txt_npm_plugin_concat   = '';
        var txt_alias_plugin_concat = '';  
        
        var txt_npm_plugin_jslint   = '';
        var txt_alias_plugin_jslint = '';  
        
        var txt_npm_plugin_csslint   = '';
        var txt_alias_plugin_csslint = '';  
        
        
        var txt_yaml_newline       = '';
                
        // handle option grunt-contrib-uglify
        if ( this.optional_packages.indexOf('uglify') != -1 ) {
            
            txt_npm_plugin_uglify   = ',\n\t\t"grunt-contrib-uglify" : "~0.5.0"';
            txt_alias_plugin_uglify = "\n    - 'uglify:dist'";
            
            this.copy("_uglify.js", "grunt/uglify.js");
        }   
        
        // handle option grunt-contrib-clean
        if ( this.optional_packages.indexOf('clean') != -1 ) {

            txt_npm_plugin_clean   = ',\n\t\t"grunt-contrib-clean" : "~0.6.0"';
            txt_alias_plugin_clean = "\n    - 'clean'";
            
            this.copy("_clean.js", "grunt/clean.js");
            
        }


        // handle option grunt-contrib-watch
        if ( this.optional_packages.indexOf('watch') != -1 ) {
            
            txt_npm_plugin_watch   = ',\n\t\t"grunt-contrib-watch" : "~0.6.1"';
            txt_alias_plugin_watch = "\n    - 'watch'";
            
            this.copy("_watch.js", "grunt/watch.js");
        }
        
        // handle option grunt-contrib-sass
        if ( this.optional_packages.indexOf('sass') != -1 ) {
            
            txt_npm_plugin_sass   = ',\n\t\t"grunt-contrib-sass" : "~0.8.1"';
            txt_alias_plugin_sass = "\n    - 'sass'";
            
            this.copy("_sass.js", "grunt/sass.js");
            
            // create scss and copy empty scss directory
            this.mkdir("src/scss");
            this.copy("_main.scss", "src/scss/main.scss");
        }
      
        // handle option grunt-contrib-jshint
        if ( this.optional_packages.indexOf('jshint') != -1 ) {
            
            txt_npm_plugin_jshint   = ',\n\t\t"grunt-contrib-jshint" : "~0.10.0"';
            txt_alias_plugin_jshint = "\n    - 'jshint'";
            
            this.copy("_jshint.js", "grunt/jshint.js");
        }
        
        // handle option grunt-contrib-concat
        if ( this.optional_packages.indexOf('concat') != -1 ) {
            
            txt_npm_plugin_concat   = ',\n\t\t"grunt-contrib-concat" : "~0.5.0"';
            txt_alias_plugin_concat = "\n    - 'concat'";
            
            this.copy("_concat.js", "grunt/concat.js");
        }        
    
        // handle option grunt-contrib-jslint
        if ( this.optional_packages.indexOf('jslint') != -1 ) {
            
            txt_npm_plugin_jslint   = ',\n\t\t"grunt-jslint" : "~1.1.12"';
            txt_alias_plugin_jslint = "\n    - 'jslint'";
            
            this.copy("_jslint.js", "grunt/jslint.js");
        } 
        
        // handle option grunt-contrib-jslint
        if ( this.optional_packages.indexOf('csslint') != -1 ) {
            
            txt_npm_plugin_csslint   = ',\n\t\t"grunt-contrib-csslint" : "~0.3.1"';
            txt_alias_plugin_csslint = "\n    - 'csslint'";
            
            this.copy("_csslint.js", "grunt/csslint.js");
        }         
                
        var package_context = { 
            app_name : this.app_name,
            app_description: this.app_description,
            plugin_uglify: txt_npm_plugin_uglify,
            plugin_clean: txt_npm_plugin_clean,
            plugin_watch: txt_npm_plugin_watch,
            plugin_sass: txt_npm_plugin_sass,
            plugin_jshint: txt_npm_plugin_jshint,
            plugin_concat: txt_npm_plugin_concat,
            plugin_jslint: txt_npm_plugin_jslint,
            plugin_csslint: txt_npm_plugin_csslint
        };
      
        this.template("_package.json", "package.json", package_context);
      
        var aliases_context = {
            plugin_uglify: txt_alias_plugin_uglify,
            plugin_clean: txt_alias_plugin_clean,
            plugin_watch: txt_alias_plugin_watch,
            plugin_sass: txt_alias_plugin_sass,
            plugin_jshint: txt_alias_plugin_jshint,
            plugin_concat: txt_alias_plugin_concat,
            plugin_jslint: txt_alias_plugin_jslint,
            plugin_csslint: txt_alias_plugin_csslint
        };
              
        this.template("_aliases.yaml", "grunt/aliases.yaml", aliases_context);
      
    }
    
});