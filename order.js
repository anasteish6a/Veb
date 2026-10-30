const selectedDishes = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};


function initOrderState() {
    for (let category in selectedDishes) {
        const id = localStorage.getItem(`selected_${category}`);
        if (id) {
            const dish = dishes.find(d => d.id === parseInt(id));
            if (dish) {
                selectedDishes[category] = dish;
            }
        }
    }
    updateStickyPanel();
    highlightSelectedCards();
}

function handleDishClick(event) {
    const card = event.target.closest('.dish-card');
    if (!card) return;

    const btn = event.target.closest('.add-btn');
    if (!btn || btn.disabled) return;

    const dishId = parseInt(card.getAttribute('data-id'));
    const dish = dishes.find(d => d.id === dishId);
    if (!dish) return;

    selectedDishes[dish.category] = dish;
    localStorage.setItem(`selected_${dish.category}`, dish.id);

    updateStickyPanel();
    highlightSelectedCards();
}

function updateStickyPanel() {
    let totalPrice = 0;
    let hasAnySelection = false;

    for (let category in selectedDishes) {
        if (selectedDishes[category]) {
            totalPrice += selectedDishes[category].price;
            hasAnySelection = true;
        }
    }

    const stickyPanel = document.getElementById('order-sticky-panel');
    if (!stickyPanel) return;

    if (hasAnySelection) {
        stickyPanel.classList.remove('hidden');
        document.getElementById('sticky-total-price').textContent = `${totalPrice}₽`;

        const link = document.getElementById('goto-order-link');
        if (validateOrderComposition()) {
            link.classList.remove('disabled');
        } else {
            link.classList.add('disabled');
        }
    } else {
        stickyPanel.classList.add('hidden');
    }
}

function validateOrderComposition() {
    const hasSoup = selectedDishes.soup !== null;
    const hasMain = selectedDishes.main !== null;
    const hasSalad = selectedDishes.salad !== null;
    const hasDrink = selectedDishes.drink !== null;

    if (hasSoup && hasMain && hasSalad && hasDrink) return true;
    if (hasSoup && hasMain && hasDrink && !hasSalad) return true;
    if (hasSoup && hasSalad && hasDrink && !hasMain) return true;
    if (hasMain && hasSalad && hasDrink && !hasSoup) return true;
    if (hasMain && hasDrink && !hasSoup && !hasSalad) return true;

    return false;
}

function highlightSelectedCards() {
    document.querySelectorAll('.dish-card').forEach(card => {
        card.classList.remove('selected');
        const btn = card.querySelector('.add-btn');
        if (btn) {
            btn.textContent = 'Добавить';
            btn.disabled = false;
        }
    });

    for (let category in selectedDishes) {
        const dish = selectedDishes[category];
        if (dish) {
            const card = document.querySelector(`.dish-card[data-id="${dish.id}"]`);
            if (card) {
                card.classList.add('selected');
                const btn = card.querySelector('.add-btn');
                if (btn) {
                    btn.textContent = 'Добавлено';
                    btn.disabled = true;
                }
            }
        }
    }
}

document.addEventListener('click', handleDishClick);