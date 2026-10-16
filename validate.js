function validateOrder() {
    const hasSoup = selectedDishes.soup !== null;
    const hasMain = selectedDishes.main !== null;
    const hasSalad = selectedDishes.salad !== null;
    const hasDrink = selectedDishes.drink !== null;
    const hasDessert = selectedDishes.dessert !== null;
    
    if (!hasSoup && !hasMain && !hasSalad && !hasDrink && !hasDessert) {
        showNotification('Ничего не выбрано. Выберите блюда для заказа');
        return false;
    }
    
    if (!hasDrink) {
        showNotification('Выберите напиток');
        return false;
    }
    
    if (hasSoup && !hasMain && !hasSalad) {
        showNotification('Выберите главное блюдо/салат/стартер');
        return false;
    }
    
    if (hasSalad && !hasSoup && !hasMain) {
        showNotification('Выберите суп или главное блюдо');
        return false;
    }
    
    if (!hasSoup && !hasMain && !hasSalad && (hasDrink || hasDessert)) {
        showNotification('Выберите главное блюдо');
        return false;
    }
    
    return true;
}

function showNotification(message) {
    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';
    
    const box = document.createElement('div');
    box.className = 'notification-box';
    
    const text = document.createElement('p');
    text.textContent = message;
    
    const button = document.createElement('button');
    button.className = 'notification-btn';
    button.textContent = 'Окей ';
    
    button.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
    
    box.appendChild(text);
    box.appendChild(button);
    overlay.appendChild(box);
    
    document.body.appendChild(overlay);
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.order-form');
    
    if (form) {
        form.addEventListener('submit', (event) => {
            if (!validateOrder()) {
                event.preventDefault();
            }
        });
    }
});