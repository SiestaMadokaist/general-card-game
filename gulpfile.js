const gulp = require(`gulp`);
const eslint = require(`gulp-eslint`);
const mocha = require(`gulp-mocha`);

gulp.task("mocha", () => {
    console.log("helo");
  return gulp
    .src("test/**/**/**.js", {read: false})
    .pipe(mocha({reporter: "spec", ui: "bdd"}))
    .once("error", () => {
      process.exit(1);
    })
    .once("end", () => {
      process.exit();
    });
})

gulp.task("lint", () => {
  return gulp
  .src(['**/*.js', '!node_modules/**'])
  .pipe(eslint({
    ecmaFeatures: {
      arrowFunctions: true,
      blockBindings: true,
      classes: true,
      forOf: true,
      generators: true,
      modules: true,
      templateStrings: true,
      jsx: true,
    },
    rules: {
      camelcase: 2,
      semi: 2,
      'no-shadow': 2
    }
  }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
});

