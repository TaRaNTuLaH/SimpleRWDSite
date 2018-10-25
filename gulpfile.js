const gulp = require("gulp");
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const plumber =  require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer'); //autoprefixy do webkitów
const browserSync = require('browser-sync').create();
const c = require('ansi-colors');
const notifier = require('node-notifier');


function showError(err){
    notifier.notify(
        {
            title: 'Błąd kompliacji SASS',
            message: err.messageFormatted
        });
    console.log(c.red("------------------------------"));
    console.log(c.red(err.messageFormatted));
    console.log(c.red("-------------------------------"));
    this.emit("end");
}
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('sass', function () {
    return gulp.src('./scss/main.scss')
        .pipe(plumber({
            errorHandler : showError //funkcja, ktora bedzie nam pokazywac bledy
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed" //kompresja do jednej linii
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
        }))
        .pipe(sourcemaps.write(".")) // usuwa komentarz w css
        .pipe(gulp.dest('./css'))//destination
        .pipe(browserSync.stream()); //Aktualizacja css na stronie
});

gulp.task('watch', function(){
    gulp.watch("./scss/**/*scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
})


gulp.task('default',function(){
    console.log(" ============= Rozpoczynam Pracę ============");
    gulp.start(['browser-sync','sass','watch']); //w tablicy podajemy polecenia
})