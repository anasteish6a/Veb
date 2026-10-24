// render.js

// Объект для хранения текущих фильтров по категориям
const currentFilters = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};

// Функция создания карточки блюда
function createDishCard(dish) {
    const card = document.createElement('div');
    card.className = 'dish-card';
    card.setAttribute('data-dish', dish.keyword);
    card.setAttribute('data-kind', dish.kind);
    
    const img = document.createElement('img');
    
    // ИЗМЕНЕНИЕ: Просто берем путь из API. 
    // Так как картинки лежат локально в папке проекта, браузер найдет их сам.
    img.src = dish.image; 
    img.alt = dish.name;
    
    // Заглушка на случай, если вы ошиблись в названии файла или его нет в папке
    img.onerror = function() {
        this.src = 'https://via.placeholder.com/300x300?text=No+Image';
    };
    
    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = dish.price + '₽';
    
    const name = document.createElement('p');
    name.className = 'dish-name';
    name.textContent = dish.name;
    
    const count = document.createElement('p');
    count.className = 'weight';
    count.textContent = dish.count;
    
    const button = document.createElement('button');
    button.className = 'add-btn';
    button.textContent = 'Добавить';
    
    card.appendChild(img);
    card.appendChild(price);
    card.appendChild(name);
    card.appendChild(count);
    card.appendChild(button);
    
    return card;
}

// Функция отображения блюд с учётом фильтра
function renderDishes() {
    // Сортируем блюда по алфавиту
    const sortedDishes = [...dishes].sort((a, b) => {
        return a.name.localeCompare(b.name, 'ru');
    });
    
    // Находим секции
    const sections = {
        soup: document.querySelector('#soups .dishes-grid'),
        main: document.querySelector('#main-dishes .dishes-grid'),
        salad: document.querySelector('#salads .dishes-grid'),
        drink: document.querySelector('#drinks .dishes-grid'),
        dessert: document.querySelector('#desserts .dishes-grid')
    };
    
    // Очищаем секции
    Object.values(sections).forEach(section => {
        if (section) section.innerHTML = '';
    });
    
    // Перебираем блюда и добавляем в соответствующие секции
    sortedDishes.forEach(dish => {
        const section = sections[dish.category];
        if (!section) return;
        
        // Проверяем, соответствует ли блюдо текущему фильтру
        const currentFilter = currentFilters[dish.category];
        if (currentFilter === null || currentFilter === dish.kind) {
            const card = createDishCard(dish);
            section.appendChild(card);
        }
    });
}

// Функция фильтрации блюд
function filterDishes(category, kind) {
    if (currentFilters[category] === kind) {
        currentFilters[category] = null;
    } else {
        currentFilters[category] = kind;
    }
    
    const filterButtons = document.querySelectorAll(`[data-category="${category}"]`);
    filterButtons.forEach(button => {
        const buttonKind = button.getAttribute('data-kind');
        if (buttonKind === kind && currentFilters[category] === kind) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    renderDishes();
}

// Асинхронная инициализация
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Сначала ждем загрузки данных с сервера
    await loadDishes();
    
    // 2. Только после этого рендерим карточки
    renderDishes();
    
    // 3. Навешиваем обработчики на кнопки фильтров
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const category = button.getAttribute('data-category');
            const kind = button.getAttribute('data-kind');
            filterDishes(category, kind);
        });
    });
});