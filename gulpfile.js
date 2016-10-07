var gulp    = require('gulp'),
    babel   = require('gulp-babel')
    stylus  = require('gulp-stylus')
    refresh = require('gulp-refresh') 

gulp.task('default', [ 'babel', 'stylus', 'babel:watch', 'stylus:watch' ])

gulp.task('babel', function(){
    gulp.src('./app/**/**.js')
        .pipe(babel({
            presets: ['es2015'],
            plugins: ["transform-runtime"]
        }))
        .pipe(gulp.dest('./dist'))
})

gulp.task('babel:watch', function(){
    gulp.watch('./app/**/**.js', ['babel'])
})

gulp.task('stylus', function () {
  return gulp.src('./assets/styles/styles.styl')
    .pipe(stylus({
        compress: true
    }))
    .pipe(gulp.dest('./assets/styles'));
})

gulp.task('stylus:watch', function(){
    refresh.listen()
    gulp.watch('./app/**/**.js', ['babel'])
    gulp.watch('./assets/styles/**.styl', ['stylus'])
})