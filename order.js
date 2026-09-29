// Объект для хранения выбранных блюд
const selectedDishes = {
    soup: null,
    main: null,
    drink: null
};

// Названия категорий для отображения
const categoryNames = {
    soup: 'Суп',
    main: 'Главное блюдо',
    drink: 'Напиток'
};

// Функция обновления раздела "Ваш заказ"
function updateOrderSection() {
    let totalPrice = 0;
    let hasAnySelection = false;
    
    // Перебираем категории
    for (const category in selectedDishes) {
        const categoryBlock = document.getElementById('selected-' + category);
        const dishParagraph = categoryBlock.querySelector('.selected-dish');
        const categoryTitle = categoryBlock.querySelector('h4');
        
        if (selectedDishes[category]) {
            // Блюдо выбрано — показываем его
            const dish = selectedDishes[category];
            dishParagraph.textContent = dish.name + ' ' + dish.price + '₽';
            categoryTitle.style.display = 'block';
            totalPrice += dish.price;
            hasAnySelection = true;
        } else {
            // Блюдо не выбрано
            if (category === 'soup') {
                dishParagraph.textContent = 'Ничего не выбрано';
            } else if (category === 'main') {
                dishParagraph.textContent = 'Блюдо не выбрано';
            } else if (category === 'drink') {
                dishParagraph.textContent = 'Напиток не выбран';
            }
            categoryTitle.style.display = 'none';  // скрываем название категории
        }
    }
    
    // Блок "Стоимость заказа"
    const totalBlock = document.getElementById('total-cost');
    const totalPriceParagraph = totalBlock.querySelector('.total-price');
    
    if (hasAnySelection) {
        totalBlock.style.display = 'block';
        totalPriceParagraph.textContent = totalPrice + '₽';
    } else {
        totalBlock.style.display = 'none';
    }
}

// Функция обработки клика по карточке
function handleDishClick(event) {
    // Находим ближайшую карточку (кли могли по картинке, цене, кнопке — нам нужна сама карточка)
    const card = event.target.closest('.dish-card');
    if (!card) return;
    
    // Получаем keyword блюда из data-атрибута
    const keyword = card.getAttribute('data-dish');
    
    // Находим блюдо в массиве
    const dish = dishes.find(d => d.keyword === keyword);
    if (!dish) return;
    
    // Сохраняем в выбранное (заменяем предыдущее блюдо той же категории)
    selectedDishes[dish.category] = dish;
    
    // Обновляем форму
    updateOrderSection();
    
    // Прокручиваем к форме заказа
    document.getElementById('order-form').scrollIntoView({ behavior: 'smooth' });
}

// Добавляем обработчик клика на весь контейнер с блюдами (делегирование событий)
document.addEventListener('click', handleDishClick);

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', updateOrderSection);