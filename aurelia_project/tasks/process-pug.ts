import * as gulp from 'gulp';
import * as changedInPlace from 'gulp-changed-in-place';
import * as sourcemaps from 'gulp-sourcemaps';
import * as pug from 'gulp-pug';
import * as project from '../aurelia.json';
import {build} from 'aurelia-cli';

export default function processPug() {
console.log("~~~~~~~~~~~~~~ Process PUG ~~~~~~~~~~~~~~~~");
  return gulp.src(project.pugProcessor.source)
    .pipe(changedInPlace({firstPass:true}))
    .pipe(sourcemaps.init())
    .pipe(pug())
    .pipe(build.bundle());
}

//Modified some isntructions from here
//https://github.com/aurelia/cli/issues/223