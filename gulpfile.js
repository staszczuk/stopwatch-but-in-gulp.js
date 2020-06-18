var gulp = require("gulp");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var sync = require("browser-sync");
var cssnano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');

gulp.task("reload", function(done) {
    sync.reload();
    done();
});

gulp.task("uglify", function(done) {
    gulp.src("src/js/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("final/js"));
    done();
});

gulp.task("sass", function(done) {
    gulp.src("src/sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest("final/css"));
    done();
})

gulp.task("copy", function(done) {
    gulp.src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("final"));
    done();
})

gulp.task("default", gulp.parallel("uglify", "sass", "copy"));

gulp.task("sync", function() {
    sync({
        server: "final"
    });

    gulp.watch("src/*.html", gulp.series("copy", "reload"));
    gulp.watch("src/js/**/*.js", gulp.series("uglify", "reload"));
    gulp.watch("src/sass/**/*.scss", gulp.series("sass", "reload"));
});
