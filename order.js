const selectedDishes = {
    soup: null,
    main: null,
    drink: null
};

const categoryNames = {
    soup: 'Суп',
    main: 'Главное блюдо',
    drink: 'Напиток'
};

function updateOrderSection() {
    let totalPrice = 0;
    let hasAnySelection = false;
    
    for (const category in selectedDishes) {
        const categoryBlock = document.getElementById('selected-' + category);
        const dishParagraph = categoryBlock.querySelector('.selected-dish');
        const categoryTitle = categoryBlock.querySelector('h4');
        
        if (selectedDishes[category]) {
            const dish = selectedDishes[category];
            dishParagraph.textContent = dish.name + ' ' + dish.price + 'руб.';
            categoryTitle.style.display = 'block';
            totalPrice += dish.price;
            hasAnySelection = true;
        } else {
            if (category === 'soup') {
                dishParagraph.textContent = 'Ничего не выбрано';
            } else if (category === 'main') {
                dishParagraph.textContent = 'Блюдо не выбрано';
            } else if (category === 'drink') {
                dishParagraph.textContent = 'Напиток не выбран';
            }
            categoryTitle.style.display = 'none';  
        }
    }
    
    const totalBlock = document.getElementById('total-cost');
    const totalPriceParagraph = totalBlock.querySelector('.total-price');
    
    if (hasAnySelection) {
        totalBlock.style.display = 'block';
        totalPriceParagraph.textContent = totalPrice + 'руб.';
    } else {
        totalBlock.style.display = 'none';
    }
}

function handleDishClick(event) {
    const card = event.target.closest('.dish-card');
    if (!card) return;
    
    const keyword = card.getAttribute('data-dish');
    
    const dish = dishes.find(d => d.keyword === keyword);
    if (!dish) return;
    
    selectedDishes[dish.category] = dish;
    
    updateOrderSection();
    
    document.getElementById('order-form').scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('click', handleDishClick);

document.addEventListener('DOMContentLoaded', updateOrderSection);