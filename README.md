# Task-Manager_Server
Task manager server

Небольшой сервер для моего приложения - менеджера задач (https://github.com/Redditask/Task-Manager)

Написан на Express, в качестве базы данных использую PostgreSQL.
Реализованы модели Пользователя и Задачи (связь - один ко многим), их контроллеры с crud запросами, а также эндпоинты.
Также реализована авторизация с помощью jwt токена.

Использованные библиотеки:
- Express
- bcrypt
- cors
- dotenv
- jsonwebtoken
- pg
- pg-hstore
- sequelize

Команды: 
- run dev (для запуска сервера)

(Для работы приложения, в корневой папке необходимо создать файл .env с переменными PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, SECRET_KEY и заполнить их соотвествующими данными)
