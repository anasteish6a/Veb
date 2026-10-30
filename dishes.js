let dishes = [];

const API_URL = "https://web-basics-api-gagashaggy.msk1.amvera.tech";
const API_KEY = "2660bcf4-754f-3f56-982f-1b39036418db";

async function loadDishes() {
    try {
        const response = await fetch(`${API_URL}/labs/api/dishes/my?api_key=${API_KEY}`);
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
        dishes = await response.json();
        console.log(`Успешно загружено блюд: ${dishes.length}`);
    } catch (error) {
        console.error("Не удалось загрузить блюда с API:", error);
    }
}