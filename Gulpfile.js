'use strict';
var gulp = require('gulp');
var nib = require('nib');
var connect = require('gulp-connect');
var nodemon = require('gulp-nodemon');

gulp.task('connect', function(){
	connect.server({
		root: 'public',
		port: 8081,
		livereload: true
	});
	nodemon();
});

gulp.task('css',function(){
	gulp.src('./public/css/*.css')
	.pipe(connect.reload())
})

gulp.task('html',function(){
	gulp.src('./public/*.html')
	.pipe(connect.reload())
})

gulp.task('js',function(){
	gulp.src('./public/components/*.js')
	.pipe(connect.reload())
})

gulp.task('watch', function(){
	gulp.watch([
		'./public/*.css',
	    './public/components/*.css',
	    './public/components/**/*.css',
	    './public/components/**/**/*.css'
    ],['css']);

	
	gulp.watch([
	  	'./public/*.js',
	    './public/components/*.js',
	    './public/components/**/*.js',
	    './public/components/**/**/*.js',
	    './api/*.js',
	    './api/components/*.js',
	    './api/components/**/*.js',
	    './api/components/**/**/*.js'
 	],['js']);

	
	gulp.watch([
		'./public/*.html',
	    './public/components/*.html',
	    './public/components/**/*.html',
	    './public/components/**/**/*.html'
	],['html']);

})

gulp.task('examen2pg', ['connect','css','html','js','watch'])
