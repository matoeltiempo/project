# Project "Mesto"

Протестировать текущую версию проекта можно [здесь](https://matoeltiempo.github.io/project/)

### Сборка проекта на Webpack
- JS разбит на модули и переведён бабелем из ES6 в ES5.
- CSS-код минимизирован, проставлены вендорные префиксы.
- Установлен вебпак для оптимизации картинкок и шрифтов.
- Подмена REST API сервера: для dev-сборки используется http, для deploy-https.
- Файловая структура БЭМ.

### Установка и запуск проекта
1. Скачайте сборку архивом или используя команду:
```git clone git@github.com:matoeltiempo/project.git```
2. Запустить установку через терминал:
```npm i```
3. Выбрать неообходимый вариант сборки:
```
# production
npm run build
# develop
npm run dev
# gh-pages (предварительно в package.json изменить параметр "homepage")
npm run deploy
```
