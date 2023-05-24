POST /api/user/register
Payload:
{
"username": "example",
"password": "example"
}
Description: Регистрация нового пользователя. Возвращает JWT токен.

POST /api/user/login
Payload:
{
"username": "example",
"password": "example"
}
Description: Вход в систему. Возвращает JWT токен.

GET /api/posts
Headers: Authorization: Bearer {token}
Description: Получение всех записей с пагинацией. Возвращает 20 записей на страницу.

POST /api/posts
Headers: Authorization: Bearer {token}
Payload:
{
"message": "example"
}
Description: Создание новой записи. Возвращает созданную запись.

PUT /api/posts/:id
Headers: Authorization: Bearer {token}
Payload:
{
"message": "example"
}
Description: Обновление записи. Возвращает обновленную запись.

DELETE /api/posts/:id
Headers: Authorization: Bearer {token}
Description: Удаление записи. Возвращает статус 200 при успешном удалении.
