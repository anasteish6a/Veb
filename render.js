const currentFilters = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};

function createDishCard(dish) {
    const card = document.createElement('div');
    card.className = 'dish-card';
    card.setAttribute('data-dish', dish.keyword);
    card.setAttribute('data-kind', dish.kind);
    card.setAttribute('data-id', dish.id);
    
    const img = document.createElement('img');
    img.src = dish.image;
    img.alt = dish.name;
    
    img.onerror = function() {
        this.src = 'https://via.placeholder.com/300x200/CCCCCC/000000?text=No+Image';
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

function renderDishes() {
    const sortedDishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    
    const sections = {
        soup: document.querySelector('#soups .dishes-grid'),
        main: document.querySelector('#main-dishes .dishes-grid'),
        salad: document.querySelector('#salads .dishes-grid'),
        drink: document.querySelector('#drinks .dishes-grid'),
        dessert: document.querySelector('#desserts .dishes-grid')
    };
    
    Object.values(sections).forEach(section => {
        if (section) section.innerHTML = '';
    });
    
    sortedDishes.forEach(dish => {
        const section = sections[dish.category];
        if (!section) return;
        
        const currentFilter = currentFilters[dish.category];
        if (currentFilter === null || currentFilter === dish.kind) {
            const card = createDishCard(dish);
            section.appendChild(card);
        }
    });
    
    if (typeof initOrderState === 'function') {
        initOrderState();
    }
}

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

document.addEventListener('DOMContentLoaded', async () => {
    await loadDishes();
    renderDishes();
    
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