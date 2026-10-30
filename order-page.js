const API_URL = "https://web-basics-api-gagashaggy.msk1.amvera.tech";
const API_KEY = "2660bcf4-754f-3f56-982f-1b39036418db";

async function loadAllDishes() {
    try {
        const response = await fetch(`${API_URL}/labs/api/dishes/my?api_key=${API_KEY}`);
        if (!response.ok) throw new Error('Ошибка загрузки блюд');
        return await response.json();
    } catch (error) {
        console.error('Не удалось загрузить блюда:', error);
        return [];
    }
}

function getSelectedDishesFromStorage() {
    const selectedDishes = {
        soup: localStorage.getItem('selected_soup'),
        main: localStorage.getItem('selected_main'),
        salad: localStorage.getItem('selected_salad'),
        drink: localStorage.getItem('selected_drink'),
        dessert: localStorage.getItem('selected_dessert')
    };

    for (let key in selectedDishes) {
        selectedDishes[key] = selectedDishes[key] ? parseInt(selectedDishes[key]) : null;
    }

    return selectedDishes;
}

async function renderOrderComposition() {
    const container = document.getElementById('order-composition');
    const selectedIds = getSelectedDishesFromStorage();
    const allDishes = await loadAllDishes();

    const selectedDishesList = allDishes.filter(dish =>
        Object.values(selectedIds).includes(dish.id)
    );

    if (selectedDishesList.length === 0) {
        container.innerHTML = `
            <p class="empty-order">
                Ничего не выбрано. Чтобы добавить блюда в заказ, 
                перейдите на страницу <a href="menu.html">Собрать ланч</a>.
            </p>
        `;
        return;
    }

    container.innerHTML = '';

    selectedDishesList.forEach(dish => {
        const card = document.createElement('div');
        card.className = 'dish-card order-card';
        card.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <div class="dish-info">
                <p class="price">${dish.price}₽</p>
                <p class="name">${dish.name}</p>
                <p class="weight">${dish.count}</p>
                <button class="btn-delete" data-id="${dish.id}" data-category="${dish.category}">
                    Удалить
                </button>
            </div>
        `;
        container.appendChild(card);
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const dishId = parseInt(e.target.dataset.id);
            const category = e.target.dataset.category;
            deleteDishFromOrder(dishId, category);
        });
    });
}

function deleteDishFromOrder(dishId, category) {
    localStorage.removeItem(`selected_${category}`);
    renderOrderComposition();
    renderOrderForm();
}

async function renderOrderForm() {
    const selectedIds = getSelectedDishesFromStorage();
    const allDishes = await loadAllDishes();

    const selectedDishes = {};
    for (let category in selectedIds) {
        if (selectedIds[category]) {
            selectedDishes[category] = allDishes.find(d => d.id === selectedIds[category]);
        }
    }

    const categories = {
        soup: 'Суп',
        main: 'Главное блюдо',
        salad: 'Салат/стартер',
        drink: 'Напиток',
        dessert: 'Десерт'
    };

    let totalPrice = 0;
    let orderSummaryHTML = '';

    for (let category in categories) {
        const dish = selectedDishes[category];
        const categoryName = categories[category];

        if (dish) {
            orderSummaryHTML += `
                <div class="order-item">
                    <strong>${categoryName}</strong><br>
                    ${dish.name} ${dish.price}₽
                </div>
            `;
            totalPrice += dish.price;
        } else {
            const notSelectedText = category === 'main' ? 'Не выбрано' : 'Не выбран';
            orderSummaryHTML += `
                <div class="order-item not-selected">
                    <strong>${categoryName}</strong><br>
                    ${notSelectedText}
                </div>
            `;
        }
    }

    orderSummaryHTML += `
        <div class="total-price">
            <strong>Стоимость заказа</strong><br>
            ${totalPrice}₽
        </div>
    `;

    document.getElementById('order-summary').innerHTML = orderSummaryHTML;
}

async function submitOrder(event) {
    event.preventDefault();

    const selectedIds = getSelectedDishesFromStorage();

    if (!validateOrderComposition(selectedIds)) {
        alert('Состав заказа не соответствует ни одному из доступных комбо.');
        return;
    }

    const formData = {
        full_name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subscribe: document.getElementById('newsletter').checked ? 1 : 0,
        phone: document.getElementById('phone').value,
        delivery_address: document.getElementById('address').value,
        delivery_type: document.querySelector('input[name="delivery_time"]:checked').value,
        delivery_time: document.getElementById('delivery-time').value || null,
        comment: document.getElementById('comment').value,
        soup_id: selectedIds.soup || -1,
        main_course_id: selectedIds.main || -1,
        salad_id: selectedIds.salad || -1,
        drink_id: selectedIds.drink || -1,
        dessert_id: selectedIds.dessert || -1
    };

    if (formData.delivery_type === 'by_time' && !formData.delivery_time) {
        alert('Пожалуйста, укажите время доставки');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/labs/api/orders?api_key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ошибка при оформлении заказа');
        }

        localStorage.removeItem('selected_soup');
        localStorage.removeItem('selected_main');
        localStorage.removeItem('selected_salad');
        localStorage.removeItem('selected_drink');
        localStorage.removeItem('selected_dessert');

        alert('Заказ успешно оформлен!');
        window.location.href = 'menu.html';

    } catch (error) {
        console.error('Ошибка:', error);
        alert('Не удалось оформить заказ: ' + error.message);
    }
}

function validateOrderComposition(selectedIds) {
    const hasSoup = selectedIds.soup !== null;
    const hasMain = selectedIds.main !== null;
    const hasSalad = selectedIds.salad !== null;
    const hasDrink = selectedIds.drink !== null;

    if (hasSoup && hasMain && hasSalad && hasDrink) return true;
    if (hasSoup && hasMain && hasDrink && !hasSalad) return true;
    if (hasSoup && hasSalad && hasDrink && !hasMain) return true;
    if (hasMain && hasSalad && hasDrink && !hasSoup) return true;
    if (hasMain && hasDrink && !hasSoup && !hasSalad) return true;

    return false;
}

document.addEventListener('DOMContentLoaded', async () => {
    await renderOrderComposition();
    await renderOrderForm();

    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', submitOrder);
    }
});