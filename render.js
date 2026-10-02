function createDishCard(dish) {
    const card = document.createElement('div');
    card.className = 'dish-card';
    card.setAttribute('data-dish', dish.keyword);  // data-атрибут с названием на латинице
    
    const img = document.createElement('img');
    img.src = dish.image;
    img.alt = dish.name;
    
    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = dish.price + 'руб.';
    
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
    const sortedDishes = [...dishes].sort((a, b) => {
        return a.name.localeCompare(b.name, 'ru');
    });
    
    const soupsSection = document.querySelector('#soups .dishes-grid');
    const mainSection = document.querySelector('#main-dishes .dishes-grid');
    const drinksSection = document.querySelector('#drinks .dishes-grid');
    
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

document.addEventListener('DOMContentLoaded', renderDishes);