var gulp = require("gulp");
var concat = require("gulp-concat");

gulp.task("app-scripts", function () {
  // Compile scripts and write to dist.
  return gulp.src("./src/**/*.js")
    .pipe(concat("./example-accounts.js"))
    .pipe(gulp.dest("./"));
});

gulp.task("default", ["app-scripts"]);
