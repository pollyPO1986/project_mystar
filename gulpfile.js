//gulp plugins
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var gulpSequence = require('gulp-sequence'); 
var autoprefixer = require('autoprefixer');
var mainBowerFiles = require('main-bower-files');
var browserSync = require('browser-sync').create();
var minimist = require('minimist');

// Error Helper
function onError(err) {
  console.log(err);
}

//開發環境切換
var devOption = {
	string: 'dev',
	default: { dev: 'develop'}
}

var options = minimist(process.argv.slice(2), devOption)
console.log(options)

//Clean Task (在完成後，拿來清除之前開發中新刪修所編譯出的檔案，重新再把新的編譯出來做最後final給後端)
gulp.task('clean', function () {
  return gulp.src(['./.tmp', './bulid'], {read: false})
    .pipe($.clean());
});
   
//Server Task
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./bulid"
    },
    reloadDebounce: 2000
  })
});

//Jade Task
gulp.task('jade', function() {
  gulp.src('./source/**/!(_)*.jade')
  	.pipe($.plumber())
  	.pipe($.changed('bulid', {
  		extension: '.html'
  	}))
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest('./bulid'))
    .pipe(browserSync.stream()) //要在輸出之後
    .pipe($.notify({
      message: 'Jade task complete'
    }));
});

//Sass Task
gulp.task('sass', function() {
	var plugins = [
      autoprefixer({browsers: ['last 3 version', '> 5%']})
  ];
  return gulp.src('./source/scss/**/*.scss')
  	.pipe($.plumber())
  	.pipe($.sourcemaps.init())
    .pipe($.sass({
    	outputStyle: 'compact',
    	includePaths: [
    		'./vendors/bootstrap-sass/assets/stylesheets/',
    		'./vendors/font-awesome/scss/',
    		'./vendors/sweetalert2/src/',
    		'./vendors/owl.carousel/src/scss/'
    	]
    }).on('error', $.sass.logError))
    //已編譯完成CSS
    .pipe($.postcss(plugins))
		.pipe($.concat('style.css'))
		.pipe($.if(options.dev === 'production', $.cleanCss()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./bulid/css'))
    .pipe(browserSync.stream()) //要在輸出之後
    .pipe($.notify({
      message: 'Sass task complete'
    }));
});

//Font Task
gulp.task('fonts', function() {
  return gulp.src(['./vendors/bootstrap-sass/assets/fonts/bootstrap/*','./vendors/font-awesome/fonts/*', './source/fonts/*'])
    .pipe(gulp.dest('./bulid/fonts'))
    .pipe($.notify({
      message: 'fonts task complete'
    }));
});

//Script Task
gulp.task('scripts', function() {
  gulp.src('./source/js/**/*.js') // 原始 JS目錄
    .pipe($.sourcemaps.init())
    .pipe($.concat('style.js'))
    .pipe($.if(options.dev === 'production', $.uglify()))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./bulid/js')) // 最小化後JS目錄
    .pipe(browserSync.stream()) //要在輸出之後
    .pipe($.notify({
      message: 'Scripts task complete'
  	}));
});

//bower
gulp.task('bower', function() {
  return gulp.src(mainBowerFiles({
  	"overrides": {
        "footable": {
						"main": ["compiled/footable.js", "compiled/footable.bootstrap.scss"]
        },
        "sweetalert2": {
						"main": ["dist/sweetalert2.min.js","src/sweetalert2.scss"]
        },
        "owl.carousel": {
						"main": ["dist/owl.carousel.min.js","src/scss/owl.carousel.scss"]
        }
    }
  }))
    .pipe(gulp.dest('./.tmp/vendors'));
    cb(err);
});

//併到bulid資料夾
gulp.task('vendorJs', ['bower'], function(){
	return gulp.src('./.tmp/vendors/**/**.js')
		.pipe($.order([
	    'jquery.js',
	    'bootstrap.js',
	    'bootstrap-select.js',
	    'jquery.fancybox.min.js',
	    'sweetalert2.min.js',
	    'owl.carousel.min.js',
	    'footable.js'
	  ]))
		.pipe($.concat('vendors.js'))
		.pipe($.if(options.dev === 'production', $.uglify()))
		.pipe(gulp.dest('./bulid/js'))
});

//Images Task
gulp.task('images', function() {
  return gulp.src('./source/images/**/*')
    .pipe($.if(options.dev === 'production', $.imagemin()))//因為很花時間，所以在開發時先不壓縮圖片
    .pipe(gulp.dest('./bulid/images'))
});


//Watch Task
gulp.task('watch', function() {
  gulp.watch('./source/**/*.jade', ['jade']);
  gulp.watch('./source/scss/**/*.scss', ['sass']);
  gulp.watch('./source/js/**/*.js', ['scripts']);
});

//Sequence Task
gulp.task('public', gulpSequence('clean', 'jade', 'sass', 'fonts', 'images', 'scripts', 'vendorJs'))

gulp.task('default', ['jade', 'sass', 'fonts', 'images', 'scripts', 'vendorJs', 'browser-sync', 'watch']);