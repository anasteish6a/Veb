const API_URL = "https://web-basics-api-gagashaggy.msk1.amvera.tech";
const API_KEY = "2660bcf4-754f-3f56-982f-1b39036418db";

let orders = [];      
let allDishes = [];   


async function loadOrders() {
    try {
        const response = await fetch(`${API_URL}/labs/api/orders?api_key=${API_KEY}`);
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
        orders = await response.json();
        
        orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } catch (error) {
        console.error('Не удалось загрузить заказы:', error);
        showNotification('Не удалось загрузить заказы', 'error');
    }
}

async function loadDishes() {
    try {
        const response = await fetch(`${API_URL}/labs/api/dishes/my?api_key=${API_KEY}`);
        if (!response.ok) throw new Error('Ошибка загрузки блюд');
        allDishes = await response.json();
    } catch (error) {
        console.error('Не удалось загрузить блюда:', error);
        allDishes = [];
    }
}

function getDishById(id) {
    if (!id || id === -1) return null;
    return allDishes.find(d => d.id === id);
}


function formatDate(dateString) {
    if (!dateString) return '—';
    let isoString = dateString.replace(' ', 'T');
    const hasTimezone = /[Zz]$/.test(isoString) || /[+-]\d{2}:?\d{2}$/.test(isoString);
    if (!hasTimezone) {
        isoString += 'Z';
    }

    const date = new Date(isoString);
    if (isNaN(date.getTime())) return dateString;

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}


function getOrderComposition(order) {
    const names = [];
    const ids = [order.soup_id, order.main_course_id, order.salad_id, order.drink_id, order.dessert_id];
    
    ids.forEach(id => {
        const dish = getDishById(id);
        if (dish) names.push(dish.name);
    });
    
    return names.join(', ');
}

function getOrderTotal(order) {
    const ids = [order.soup_id, order.main_course_id, order.salad_id, order.drink_id, order.dessert_id];
    let total = 0;
    ids.forEach(id => {
        const dish = getDishById(id);
        if (dish) total += dish.price;
    });
    return total;
}

function formatDeliveryTime(order) {
    if (order.delivery_type === 'now') {
        return 'В течение дня<br>(с 07:00 до 23:00)';
    }
    return order.delivery_time || '—';
}


function renderOrders() {
    const tbody = document.getElementById('orders-tbody');
    const noOrders = document.getElementById('no-orders');
    
    tbody.innerHTML = '';
    
    if (orders.length === 0) {
        noOrders.classList.remove('hidden');
        return;
    }
    
    noOrders.classList.add('hidden');
    
    orders.forEach((order, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${formatDate(order.created_at)}</td>
        <td>${getOrderComposition(order)}</td>
        <td>${getOrderTotal(order)}₽</td>
        <td>${formatDeliveryTime(order)}</td>
        <td class="actions-cell">
            <div class="actions-wrap">
                <button class="action-btn view-btn" data-id="${order.id}" title="Подробнее">👁</button>
                <button class="action-btn edit-btn" data-id="${order.id}" title="Редактировать">✏</button>
                <button class="action-btn delete-btn" data-id="${order.id}" title="Удалить">🗑</button>
            </div>
        </td>
    `;
    tbody.appendChild(tr);
});
    
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => openViewModal(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => openEditModal(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => openDeleteModal(parseInt(btn.dataset.id)));
    });
}


function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}


function openViewModal(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    const body = document.getElementById('view-modal-body');
    

    let compositionHTML = '';
    const categories = [
        { key: 'soup_id', label: 'Суп' },
        { key: 'main_course_id', label: 'Основное блюдо' },
        { key: 'salad_id', label: 'Салат' },
        { key: 'drink_id', label: 'Напиток' },
        { key: 'dessert_id', label: 'Десерт' }
    ];
    
    categories.forEach(cat => {
        const dish = getDishById(order[cat.key]);
        if (dish) {
            compositionHTML += `
                <div class="view-row">
                    <span class="view-label">${cat.label}</span>
                    <span class="view-value">${dish.name} (${dish.price}₽)</span>
                </div>
            `;
        }
    });
    
    body.innerHTML = `
        <div class="view-row">
            <span class="view-label">Дата оформления</span>
            <span class="view-value">${formatDate(order.created_at)}</span>
        </div>
        <h4>Доставка</h4>
        <div class="view-row">
            <span class="view-label">Имя получателя</span>
            <span class="view-value">${order.full_name}</span>
        </div>
        <div class="view-row">
            <span class="view-label">Адрес доставки</span>
            <span class="view-value">${order.delivery_address}</span>
        </div>
        <div class="view-row">
            <span class="view-label">Время доставки</span>
            <span class="view-value">${order.delivery_type === 'now' ? 'Как можно скорее' : order.delivery_time}</span>
        </div>
        <div class="view-row">
            <span class="view-label">Телефон</span>
            <span class="view-value">${order.phone}</span>
        </div>
        <div class="view-row">
            <span class="view-label">Email</span>
            <span class="view-value">${order.email}</span>
        </div>
        <h4>Комментарий</h4>
        <p class="comment-text">${order.comment || '—'}</p>
        <h4>Состав заказа</h4>
        ${compositionHTML}
        <p class="total-line">Стоимость: <strong>${getOrderTotal(order)}₽</strong></p>
    `;
    
    openModal('view-modal');
}


function openEditModal(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    document.getElementById('edit-order-id').value = order.id;
    document.getElementById('edit-date').textContent = formatDate(order.created_at);
    document.getElementById('edit-name').value = order.full_name || '';
    document.getElementById('edit-address').value = order.delivery_address || '';
    document.getElementById('edit-time').value = order.delivery_time || '';
    document.getElementById('edit-phone').value = order.phone || '';
    document.getElementById('edit-email').value = order.email || '';
    document.getElementById('edit-comment').value = order.comment || '';
    
    
    const compositionDiv = document.getElementById('edit-composition');
    compositionDiv.innerHTML = '';
    const categories = [
        { key: 'soup_id', label: 'Суп' },
        { key: 'main_course_id', label: 'Основное блюдо' },
        { key: 'salad_id', label: 'Салат' },
        { key: 'drink_id', label: 'Напиток' },
        { key: 'dessert_id', label: 'Десерт' }
    ];
    
    categories.forEach(cat => {
        const dish = getDishById(order[cat.key]);
        if (dish) {
            compositionDiv.innerHTML += `
                <div class="view-row">
                    <span class="view-label">${cat.label}</span>
                    <span class="view-value">${dish.name} (${dish.price}₽)</span>
                </div>
            `;
        }
    });
    
    document.getElementById('edit-total').textContent = getOrderTotal(order) + '₽';
    
    openModal('edit-modal');
}

async function saveOrderEdit() {
    const orderId = parseInt(document.getElementById('edit-order-id').value);
    
    const updatedData = {
        full_name: document.getElementById('edit-name').value,
        email: document.getElementById('edit-email').value,
        phone: document.getElementById('edit-phone').value,
        delivery_address: document.getElementById('edit-address').value,
        delivery_time: document.getElementById('edit-time').value || null,
        comment: document.getElementById('edit-comment').value
    };
    
    updatedData.delivery_type = updatedData.delivery_time ? 'by_time' : 'now';
    
    try {
        const response = await fetch(`${API_URL}/labs/api/orders/${orderId}?api_key=${API_KEY}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ошибка при сохранении');
        }
        
        closeModal('edit-modal');
        showNotification('Заказ успешно изменён', 'success');
        
        await loadOrders();
        renderOrders();
    } catch (error) {
        console.error('Ошибка:', error);
        showNotification('Не удалось сохранить изменения: ' + error.message, 'error');
    }
}

function openDeleteModal(orderId) {
    document.getElementById('delete-order-id').value = orderId;
    openModal('delete-modal');
}

async function confirmDeleteOrder() {
    const orderId = parseInt(document.getElementById('delete-order-id').value);
    
    try {
        const response = await fetch(`${API_URL}/labs/api/orders/${orderId}?api_key=${API_KEY}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ошибка при удалении');
        }
        
        closeModal('delete-modal');
        showNotification('Заказ успешно удалён', 'success');
        
        await loadOrders();
        renderOrders();
    } catch (error) {
        console.error('Ошибка:', error);
        showNotification('Не удалось удалить заказ: ' + error.message, 'error');
    }
}


function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification show ${type}`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}


document.addEventListener('DOMContentLoaded', async () => {
    await loadDishes();
    await loadOrders();
    renderOrders();
    
    document.querySelectorAll('.modal-close, .btn-cancel, .btn-ok').forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(btn.dataset.target);
        });
    });
    
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay.id);
            }
        });
    });
    
    document.getElementById('save-edit-btn').addEventListener('click', saveOrderEdit);
    document.getElementById('confirm-delete-btn').addEventListener('click', confirmDeleteOrder);
});