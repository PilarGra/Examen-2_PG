'use strict';
var gulp = require('gulp');
var nib = require('nib');
var connect = require('gulp-connect');
// var nodemon = require('gulp-nodemon');  levantar mongo.

gulp.task('connect', function(){
	connect.server({
		root: './',
		port: 8000,
		livereload: true
	});
//	nodemon();
});

gulp.task('css',function(){
	gulp.src('./css/*.css')
	.pipe(connect.reload())
})

gulp.task('html',function(){
	gulp.src('./*.html')
	.pipe(connect.reload())
})

gulp.task('js',function(){
	gulp.src('./*.js')
	.pipe(connect.reload())
})

gulp.task('watch', function(){
	gulp.watch([
		'./css/*.css'],['css']);

	gulp.watch([
		'./*.html',
		'./components/*.html',
		'./components/**/**/*.html'
	],['html']);

	gulp.watch([
		'./*.js',
		'./components/*.js',
		'./components/**/**/*.js',
		'.components/**/*.js'
	],['js']);
})

gulp.task('examen1-pg', ['connect','css','html','js','watch'])
