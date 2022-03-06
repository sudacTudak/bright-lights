import versionNumber from "gulp-version-number";
import webpack from 'webpack-stream';
import fs from 'fs';
import { path } from './../config/path.js';

const srcFolder = path.srcFolder;

const PAGES = fs.readdirSync(`${srcFolder}`).filter(filename => filename.endsWith('.html'));

const getFilename = (extension) => app.isDev? `[name].min.${extension}`: `[name].min.${extension}`

const renderEntries = () => {
    const entries = {};

    entries.main = ['@babel/polyfill' ,`${srcFolder}/js/main.js`];

    PAGES.forEach(page => {
        if (page === 'index.html') {return};

        const pageName = page.replace(/\.html/, '');
        entries[`${pageName}`] = ['@babel/polyfill' ,`${srcFolder}/js/${pageName}.js`];
    })

    return entries;
}

export const js = () => {
    return app.gulp.src(app.path.src.js, {sourcemaps: app.isDev})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(webpack({
            mode: app.isBuild ? 'production' : 'development',
            entry: renderEntries(),
            output: {
                filename: getFilename('js'),
            },
            module: {
                rules: [{
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    targets: 'defaults'
                                }]
                            ],
                            plugins: ["@babel/plugin-proposal-class-properties"]
                        }
                    }
                }]
            }
        }))
        .on('error', function (err) {
            console.error('WEBPACK ERROR', err);
            this.emit('end');
        })
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream());
}