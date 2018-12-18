const del = require(`del`);
const gulp = require(`gulp`);
const sass = require(`gulp-sass`);
const plumber = require(`gulp-plumber`);
const postcss = require(`gulp-postcss`);
const autoprefixer = require(`autoprefixer`);
const server = require(`browser-sync`).create();
const rename = require(`gulp-rename`);
const rollup = require(`gulp-better-rollup`);
const sourcemaps = require(`gulp-sourcemaps`);
const babel = require(`rollup-plugin-babel`);
const cssmin = require('gulp-cssmin');

gulp.task(`style`, function() {
  gulp.src(`src/scss/style.scss`)
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(cssmin())
    .pipe(rename({suffix: `.min`}))
    .pipe(gulp.dest(`dist/css`))
    .pipe(server.stream());
});

gulp.task(`scripts`, () => {
    return gulp.src(`src/js/**/*.js`)
      .pipe(plumber())
      .pipe(rollup({
        plugins: [
          babel({
            presets: [
              [
                `es2015`,
                {modules: false}
              ]
            ],
            exclude: 'node_modules/**',
          })
        ]
      }, `iife`))
      .pipe(sourcemaps.write(``))
      .pipe(gulp.dest(`dist/js`));
  });

gulp.task(`copy-html`, () => {
    return gulp.src(`src/*.{html,ico,json}`).
        pipe(gulp.dest(`dist`)).
        pipe(server.stream());
  });

  gulp.task(`copy`, [`copy-html`, `scripts`, `style`], () => {
      return gulp.src(`src/misc/**/*.*`).
      pipe(gulp.dest(`dist/misc`))
  });

  gulp.task("clean", function () {
    return del("dist");
  });

  gulp.task(`assemble`, [`clean`], () => {
    gulp.start(`copy`, `style`);
  });

  gulp.task(`js-watch`, [`scripts`], (done) => {
    server.reload();
    done();
  });

gulp.task(`serve`, [`assemble`], () => {
    server.init({
      server: `./dist`,
      notify: false,
      open: true,
      port: 3000,
      ui: false
    });

    gulp.watch(`src/*.html`).on(`change`, (e) => {
        if (e.type !== `deleted`) {
          gulp.run(`copy-html`);
        }
      });
    gulp.watch(`src/js/**/*.{js,jsx}`, [`js-watch`]);
    gulp.watch(`src/scss/**/*.{scss,sass}`, [`style`]);
});
