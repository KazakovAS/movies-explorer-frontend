[![linting](https://github.com/KazakovAS/movies-explorer-frontend/actions/workflows/linting.yml/badge.svg)](https://github.com/KazakovAS/movies-explorer-frontend/actions/workflows/linting.yml)
[![deploy](https://github.com/KazakovAS/movies-explorer-frontend/actions/workflows/deploy.yml/badge.svg)](https://github.com/KazakovAS/movies-explorer-frontend/actions/workflows/deploy.yml)

# Movies Explorer

Фронтенд SPA-приложения Movie Explorer.

## Ссылки:

-   [Демо](https://lerush.nomoredomains.sbs).
-   [Макет](https://www.figma.com/file/qDwSTl3buKJ24gYRk4oOzw/Diploma-(Copy)?node-id=891%3A3857).
-   [Movies Explorer Backend](https://github.com/KazakovAS/movies-explorer-api).

## Окружение и инструменты:

-   [Node.js](https://nodejs.org/en/) `16.17.0` и версия npm идущая в комплекте, если у вас установлена другая версия Node.js, вы можете использовать [nvm](https://github.com/nvm-sh/nvm) для переключения на нужную.
-   [React](https://ru.reactjs.org/) `18.1.0`

## Как запустить локально:

1. Клонировать репозиторий.
2. Установить зависимости командой `npm i`.
3. Запустить локальный веб-сервер командой `npm run dev`.

## Команды:

`npm run dev` - Запуск локальной разработки с hot-reload на 3000 порту.

`npm run build` - Сборка проекта.

[comment]: <> (`npm run deploy` - Деплой на прод.)

[comment]: <> (`npm run editorconfig` - Линтинг файлов согласно editorconfig.)

[comment]: <> (`npm run eslint` - Линтинг javascript.)

[comment]: <> (`npm run lint` - Линтинг всех видов.)

[comment]: <> (`npm run test` - Прогнать unit-тесты.)

## API

| Роут        | Защищен | Описание                                                                                                                                |
| :---------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------- |
| /users/me   | Да      | Возвращает информацию о текущем пользователе (email и имя)                                                                              |
| /users/me   | Да      | Обновляет информацию текущего пользователя (email и имя)                                                                                |
| /movies/:id | Да      | Удаляет сохранённый фильм по id                                                                                                         |
| /movies     | Да      | Возвращает все сохранённые текущим пользователем фильмы                                                                                 |
| /movies     | Да      | Создаёт фильм с переданными в теле: country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail и movieId |
| /signup     | Нет     | Создаёт пользователя с переданными в теле: email, password и name                                                                       |
| /signin     | Нет     | Проверяет переданные в теле почту и пароль, возвращает JWT и авторизирует пользователя                                                  |

## Файловая структура:

-   `components` - Компоненты.
-   `Shared` - Общие стили.
-   `vendor` - Сторонние файлы, такие как шрифты, плагины и ect.
-   `images` - Графика.
-   `routes` - Роуты.

[comment]: <> (-   `utils` - Утилитарные функции и глобальные константы.)
-   `index.js` - Точка входа.

## Соглашения:

-   [JS Style Guide](https://github.com/airbnb/javascript)
-   [CSS Style Guide](https://github.com/airbnb/css)
