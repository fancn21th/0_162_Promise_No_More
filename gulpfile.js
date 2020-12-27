const { parallel, series, src, dest, watch } = require("gulp");
const inject = require("gulp-inject");
const del = require("del");
const browserSync = require("browser-sync").create();

// configs

const buildPath = "./build";

const filesToInject = ["./src/app/**/*.js", "./src/app/**/*.css"];

const filesToWatch = [
  "./src/app/**/*.js",
  "./src/app/**/*.css",
  "./src/index.html",
];

// INJECT TASK
function index(cb) {
  const target = src("./src/index.html");
  const sources = src(filesToInject, {
    read: false,
  });
  return target
    .pipe(inject(sources, { ignorePath: "src" }))
    .pipe(dest(buildPath));
}

// CLEAN TASK
function clean(cb) {
  return del([buildPath], { force: true });
}

// COPY TASK
function copyAppCss(cb) {
  return src("./src/**/*.css").pipe(dest(buildPath));
}

function copyAppJs(cb) {
  return src("./src/**/app/**/*.js").pipe(dest(buildPath));
}

const copyTasks = [copyAppJs, copyAppCss];

// BUILD TASK
const build = series(clean, parallel(...copyTasks), index);

// RELOAD
function sync(cb) {
  browserSync.reload();
  cb();
}

// SERVE
function serve(cb) {
  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: buildPath,
    },
  });

  watch(filesToWatch, { delay: 500 }, series(build, sync));
}

exports.build = build;

// default task
exports.default = series(build, index, serve);
