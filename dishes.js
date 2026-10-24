// Глобальный массив, который будут использовать render.js и order.js
let dishes = []; 

// URL API и ваш уникальный ключ
const API_URL = "https://web-basics-api-gagashaggy.msk1.amvera.tech/labs/api/dishes/my";
const API_KEY = "f10dadf3-cebf-31a3-9e82-61a0f719b195";

/**
 * Функция для загрузки блюд с сервера
 * @returns {Promise<void>}
 */
async function loadDishes() {
    try {
        // Добавляем api_key в строку запроса
        const response = await fetch(`${API_URL}?api_key=${API_KEY}`);
        
        // Проверяем, успешен ли запрос
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        
        // Парсим JSON-ответ и сохраняем в глобальный массив
        dishes = await response.json();
        console.log(`Успешно загружено блюд: ${dishes.length}`);
        
    } catch (error) {
        console.error("Не удалось загрузить блюда с API:", error);
        // В случае ошибки массив останется пустым, можно вывести сообщение пользователю
    }
}