// Функция для создания карточки блюда
function createDishCard(dish) {
    // Создаём div для карточки
    const card = document.createElement('div');
    card.className = 'dish-card';
    card.setAttribute('data-dish', dish.keyword);  // data-атрибут с названием на латинице
    
    // Создаём картинку
    const img = document.createElement('img');
    img.src = dish.image;
    img.alt = dish.name;
    
    // Создаём элементы с информацией
    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = dish.price + '₽';
    
    const name = document.createElement('p');
    name.className = 'dish-name';
    name.textContent = dish.name;
    
    const count = document.createElement('p');
    count.className = 'weight';
    count.textContent = dish.count;
    
    // Создаём кнопку
    const button = document.createElement('button');
    button.className = 'add-btn';
    button.textContent = 'Добавить';
    
    // Собираем карточку
    card.appendChild(img);
    card.appendChild(price);
    card.appendChild(name);
    card.appendChild(count);
    card.appendChild(button);
    
    return card;
}

// Функция для отображения блюд в нужной секции
function renderDishes() {
    // Сортируем блюда по алфавиту внутри каждой категории
    const sortedDishes = [...dishes].sort((a, b) => {
        return a.name.localeCompare(b.name, 'ru');
    });
    
    // Находим секции на странице
    const soupsSection = document.querySelector('#soups .dishes-grid');
    const mainSection = document.querySelector('#main-dishes .dishes-grid');
    const drinksSection = document.querySelector('#drinks .dishes-grid');
    
    // Перебираем отсортированный массив и добавляем карточки
    sortedDishes.forEach(dish => {
        const card = createDishCard(dish);
        
        if (dish.category === 'soup') {
            soupsSection.appendChild(card);
        } else if (dish.category === 'main') {
            mainSection.appendChild(card);
        } else if (dish.category === 'drink') {
            drinksSection.appendChild(card);
        }
    });
}

// Запускаем рендер при загрузке страницы
document.addEventListener('DOMContentLoaded', renderDishes);