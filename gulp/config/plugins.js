import replace from "gulp-replace"; // Контекстный поиск и контекстная замена
import plumber from "gulp-plumber"; // Обработка ошибок
import notify from "gulp-notify"; // Собщения (подсказки)
import browsersync from "browser-sync"; // Локальный сервер
import newer from "gulp-newer"; // Проверка обновления
import ifPlugin from "gulp-if";

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin,
}