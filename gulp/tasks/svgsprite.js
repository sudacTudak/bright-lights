import svgSpritePlug from "gulp-svg-sprite";
import svgMin from "gulp-svgmin";

export const svgSprite = () => {
    return app.gulp.src(app.path.src.svgicons)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVGSPRITE",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(
            app.plugins.if(
                app.isBuild,
                svgMin({
                    js2svg: {
                        pretty: true,
                    }
                })
            )
        )
        .pipe(svgSpritePlug({
            mode: {
                stack: {
                    sprite: `../sprite/sprite.svg`,
                    example: true,
                }
            }
        }))
        .pipe(app.gulp.dest(app.path.build.images))
}