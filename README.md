# Vitiligo Clinic

Сайт специализированной клиники лечения витилиго в Алматы. Проект построен на Next.js App Router, поддерживает три языка и хранит контент в типизированных моделях.

## Стек

- Next.js 16 App Router
- React 19
- TypeScript
- next-intl
- Tailwind CSS 4
- shadcn/radix-ui primitives
- lucide-react

## Архитектура

Проект организован в облегчённом FSD-стиле:

- `app` — маршруты, layout, глобальные стили.
- `widgets` — крупные блоки страницы: hero, header, about, certificates, results, reviews, contact, footer.
- `features` — пользовательские сценарии, сейчас переключение языка.
- `entities` — доменные модели и статические данные клиники.
- `shared` — переиспользуемые UI-компоненты, конфиги и утилиты.
- `messages` — словари `ru`, `kz`, `en`.
- `public` — статические изображения и сертификаты.

`app` намеренно не используется как свалка компонентов: это помогает держать роутинг отдельно от бизнес-данных и UI.

## Запуск

```bash
npm install
npm run dev
```

Локальный адрес по умолчанию: `http://localhost:3000`.

## Скрипты

```bash
npm run dev      # dev-сервер
npm run build    # production build
npm run start    # запуск production-сборки
npm run lint     # ESLint
```

## Контент

Основные данные лежат в `entities`:

- `entities/clinic/model` — контакты и график.
- `entities/doctor/model` — данные врача, достижения, публикации.
- `entities/certificate/model` — список сертификатов.
- `entities/treatment-result/model` — результаты лечения.
- `entities/review/model` — отзывы.

Тексты интерфейса переводятся через `messages/*.json`. При добавлении нового текстового ключа обновляйте все три словаря.

## Next.js 16

В проекте есть правило из `AGENTS.md`: перед изменениями API Next.js нужно смотреть локальную документацию в `node_modules/next/dist/docs/`. Это важно, потому что версия Next.js здесь может отличаться от привычных примеров.

## Проверка перед релизом

```bash
npm run lint
npm run build
```

`next/font` во время сборки может скачивать Google Font Rubik. Если окружение без сети, сборка упадёт на загрузке шрифта.
