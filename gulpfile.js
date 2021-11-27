const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');

const rev = require('gulp-rev');

const uglify = require('gulp-uglify'); 



let /** @type {import("gulp-imagemin")} */ imagemin;
let /** @type {import("imagemin-jpegtran")} */ imageminJpegtran;
let /** @type {import("imagemin-pngquant").default} */ imageminPngquant;

const startup = async () => {
    // @ts-ignore
    imagemin = (await import("gulp-imagemin")).default;
    // @ts-ignore
    imageminJpegtran = (await import("imagemin-jpegtran")).default;
    imageminPngquant = (await import("imagemin-pngquant")).default;
};

// run this task before any that require imagemin
gulp.task("startup", async () => {
    await startup();
});

//const imagemin = require('gulp-imagemin');
const del = require('del');


gulp.task('css' , function( done ){
    console.log('minifying css......');
    
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(cssnano())
    .pipe( gulp.dest('./assets.css'));

    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe( gulp.dest('./public/assets') )
    .pipe( rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


gulp.task('js' , function( done ){
    console.log('miinifying js.........');

    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();

});


gulp.task('images' , function(done){
    console.log('compressing image files.......');

    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)' )
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
    
});

//empty the public/assets directory
gulp.task('clean:assets' , function(done){
    del.sync('./public/assets');
    done();
});

gulp.task( 'build' , gulp.series('clean:assets' , 'css' , 'js', 'startup' , 'images') , function(done){
    console.log('Building assets');
    done();
})