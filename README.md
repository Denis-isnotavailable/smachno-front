## Запуск проєкту

```
npm install - встановлюємо залежності
npm start - запуск проєкту
```
----

## Скрипти

- `npm run start` - Запуск прєкта на Next
- `npm run dev` - Запуск прєкта у режимі розробки
- `npm run build` - Збірка проєкту
- `npm run lint` - Перевірка ts файлів линтером
- `npm run lint:fix` - Виправлення ts файлів линтером
- `npm run lint:scss` - Перевірка scss файлів style линтером
- `npm run lint:scss:fix` - Виправлення scss файлів style линтером
- `npm run test` - Запуск unit тестів з jest
- `npm run format` - Формотування файлів prettier
- `npm run knip` - Виявлення не використанного коду

----

## Структура проєкту

Проєкт написано у відповідності до документації NextJS

Посилання на документацію - [project-structure](https://nextjs.org/docs/getting-started/project-structure)

----

## Тести

Unit тесты на jest - `npm run test`

----

## Линтинг

У проєкті використовується eslint для перевірки typescript коду та stylelint для перевірки файлів зі стилями.

Для більш гнучкого контролю додані додаткові правила. Eslint має підключення з prettier.

##### Запуск линтеров

- `npm run lint` - Перевірка ts файлів линтером
- `npm run lint:fix` - Виправлення ts файлів линтером
- `npm run lint:scss` - Перевірка scss файлів style линтером
- `npm run lint:scss:fix` - Виправлення scss файлів style линтером

----

## CI pipeline 

Конфігурация github actions знаходиться у /.github/workflows.

В CI прогоняються усі типу линтингу, тести, сбірка проєкту під час pull request.

----

## Робота с даними

Взаємодія з даними відбувається за допомогою [Redux toolkit](https://redux-toolkit.js.org/)

Запити на сервер відправляються за допомогою [RTK query](https://redux-toolkit.js.org/rtk-query/overview)

----


## Робота з бекендом

Документація [Swagger](https://smachno-mur5.onrender.com/api)
