Getting PUG to work in Webpack
=
* Need to npm install gulp-pug
* Need to npm install gulp-changed-in-place
* Need to npm install pug-html-loader
* Need to npm install pug

* [Add PUG rules to the webpack.config.js file](https://github.com/jods4/aurelia-webpack-build/issues/22)

* [Add convertOriginToViewUrl to Aurelia bootstrapper](https://github.com/aurelia/skeleton-navigation/issues/396#issuecomment-207823852)

## Make the Aurelia CLI available on your computer

1. Clone the aurelia-cli: `git clone https://github.com/aurelia/cli.git`
2. Go into the cli directory: `cd cli`
3. Run `npm install`
4. Link the cli with: `npm link`
5. Still in the cli directory, run `npm install git+https://git@github.com/gulpjs/gulp.git#4.0`
6. Also in the cli directory, run `npm install babel-polyfill babel-register typescript`
7. Create a new project with `au new` or use an existing project. The linked CLI will be used to create the project.
8. In the project directory, run `npm link aurelia-cli`. The linked CLI will then be used for `au` commands such as `au run`
