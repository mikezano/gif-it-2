Getting PUG to work in Webpack
=
*In webpack.config.js:
* Modify AurelaPlugin instantiation to  ```new AureliaPlugin({viewsExtensions: '.pug'})```
* Add rule: ```{ test: /\.pug$/i, loader: [ 'html-loader', 'pug-html-loader' ] }```

*You may need to:```npm install pug-html-loader --save-dev```*

*In main.ts configure() add: 
```
    ViewLocator.prototype.convertOriginToViewUrl = function (origin) {
      let moduleId = origin.moduleId;
      let id = (moduleId.endsWith('.js') || moduleId.endsWith('.ts')) ? 
        moduleId.substring(0, moduleId.length - 3) : 
        moduleId;
      return id + '.pug';
    }
```

Getting SCSS to work in PUG 
=
*In webpack.config.js modify the scss rule (*adding .pug*)
```
      {
        test: /\.scss$/,
        use: ['css-loader', 'sass-loader'],
        issuer: /\.pug|html?$/i
      }
```

References
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
