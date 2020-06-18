var gulp = require("gulp");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var sync = require("browser-sync");

gulp.task("reload", function() {
    sync.reload();
});

gulp.task("uglify", function() {
    gulp.src("src/js/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("final/js"));
});

gulp.task("sass", function() {
    gulp.src("src/sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("final/css"));
})

gulp.task("copy", function() {
    gulp.src("src/*.html")
    .pipe(gulp.dest("final"));
})

gulp.task("default", gulp.parallel("uglify", "sass", "copy"));

gulp.task("sync", function() {
    sync({
        server: "final"
    });

    gulp.watch("src/*.html", gulp.parallel("copy", "reload"));
    gulp.watch("src/js/**/*.js", gulp.parallel("uglify", "reload"));
    gulp.watch("src/sass/**/*.scss", gulp.parallel("sass", "reload"));
});
