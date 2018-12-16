const del = require(`del`);
const gulp = require(`gulp`);
const sass = require(`gulp-sass`);
const plumber = require(`gulp-plumber`);
const postcss = require(`gulp-postcss`);
const autoprefixer = require(`autoprefixer`);
const server = require(`browser-sync`).create();
const mqpacker = require(`css-mqpacker`);
const minify = require(`gulp-csso`);
const rename = require(`gulp-rename`);
const svgstore = require(`gulp-svgstore`);
const rollup = require(`gulp-better-rollup`);
const sourcemaps = require(`gulp-sourcemaps`);
const commonjs = require(`rollup-plugin-commonjs`);
const babel = require(`rollup-plugin-babel`);

gulp.task(`scripts`, () => {
    return gulp.src('src/js/**/*.js')
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
      .pipe(gulp.dest(`build/js`));
  });

gulp.task(`copy-html`, () => {
    return gulp.src(`src/*.{html,ico,json}`).
        pipe(gulp.dest(`build`)).
        pipe(server.stream());
  });

  gulp.task(`copy`, [`copy-html`, `scripts`], () => {
      return gulp.src(`src/misc/**/*.*`).
      pipe(gulp.dest(`build/misc`))
  });

  gulp.task("clean", function () {
    return del("build");
  });

  gulp.task(`assemble`, [`clean`], () => {
    gulp.start(`copy`);
  });

  gulp.task(`js-watch`, [`scripts`], (done) => {
    server.reload();
    done();
  });

gulp.task(`serve`, [`assemble`], () => {
    server.init({
      server: `./build`,
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
})