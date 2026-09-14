Учебный проект на Next.js с SSR, API-роутами, middleware и SASS.

## Технологии
- Next.js (Pages Router)
- React Hooks (useState, useEffect)
- SSR (getServerSideProps)
- SASS (SASS-синтаксис)
- gray-matter + remark (Markdown)
- CSS Modules

## Запуск
npm install
npm run dev


## Страницы
- `/` — список статей
- `/articles/[slug]` — статья
- `/admin?admin=true` — админка
- `/404` — не найдено

## API
- `GET /api/articles`
- `GET /api/articles/[slug]`
- `POST /api/articles/new`

Автор: https://github.com/Togul174