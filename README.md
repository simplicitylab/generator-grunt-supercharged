# Grunt-Supercharged

A GruntJS generator for Yeoman that creates an optimized GruntJS project inspired by the HTML5rocks article '[Supercharging your Gruntfile](http://www.html5rocks.com/en/tutorials/tooling/supercharging-your-gruntfile/)'

### Optimization 1 : autoloading grunt plugins

<br />

By using the gruntjs module '[load-grunt-tasks](https://www.npmjs.org/package/load-grunt-tasks)' you don't need to manually load each task which can be cumbersome.

This module will read the dependencies in your package.json  and load grunt tasks that match the provided patterns.

#### before

	grunt.loadNpmTasks('grunt-recess');
	grunt.loadNpmTasks('grunt-sizediff');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-styl');
	grunt.loadNpmTasks('grunt-php');
	...
	
#### after
	require('load-grunt-tasks')(grunt);

### Optimization 2 : Splitting configuration in individual files






### Optimization 3 : only process modified files

