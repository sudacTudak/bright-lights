import { htmlValidator } from "gulp-w3c-html-validator";

export const htmlValidate = () => {
    return app.gulp.src(`${app.path.build.html}/*.html`)
        .pipe(htmlValidator.analyzer())
        .pipe(htmlValidator.reporter());
}