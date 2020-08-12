var gulp = require('gulp')
var concat = require('gulp-concat');

gulp.task('scripts', function() {
  return gulp.src([
    'src/Pixel.js',
    'src/Game.js',
    'src/Layer.js',
    'src/Entity.js',
    'src/Pixel.js'
    //'src/Tile.js'
    ])
    .pipe(concat('pixel.js'))
    .pipe(gulp.dest('./example/public/lib/')); //TODO : Change dest to ./build/
});
