const dishes = [
    {
        keyword: 'cheese-soup',
        name: 'Сырный суп',
        price: 365,
        category: 'soup',
        count: '350 г',
        image: 'images/cheese_soup.png',
        kind: 'veg' 
    },
    {
        keyword: 'mushroom-soup',
        name: 'Грибной суп-пюре',
        price: 285,
        category: 'soup',
        count: '330 г',
        image: 'images/mushroom_soup.jpg',
        kind: 'veg'
    },
    {
        keyword: 'chicken-soup',
        name: 'Куриный суп',
        price: 185,
        category: 'soup',
        count: '330 г',
        image: 'images/chicken_soup.png',
        kind: 'meat' 
    },
    {
        keyword: 'norwegian-soup',
        name: 'Норвежский суп с лососем',
        price: 390,
        category: 'soup',
        count: '350 г',
        image: 'images/norwegian.png',
        kind: 'fish'
    },
    {
        keyword: 'tom-yum',
        name: 'Том ям с креветками',
        price: 450,
        category: 'soup',
        count: '400 г',
        image: 'images/tom-yum.png',
        kind: 'fish'
    },
    {
        keyword: 'borscht',
        name: 'Борщ с говядиной',
        price: 320,
        category: 'soup',
        count: '400 г',
        image: 'images/borscht.png',
        kind: 'meat'
    },
    {
        keyword: 'fried-potatoes',
        name: 'Жареная картошка с грибами',
        price: 150,
        category: 'main',
        count: '250 г',
        image: 'images/friedpotatoeswithmushrooms1.jpg',
        kind: 'veg' 
    },
    {
        keyword: 'carbonara',
        name: 'Карбонара',
        price: 415,
        category: 'main',
        count: '310 г',
        image: 'images/carbonara.png',
        kind: 'meat' 
    },
    {
        keyword: 'chicken-cutlets',
        name: 'Котлеты из курицы с картофельным пюре',
        price: 225,
        category: 'main',
        count: '280 г',
        image: 'images/chickencutletsandmashedpotatoes.jpg',
        kind: 'meat' 
    },
    {
        keyword: 'grilled-salmon',
        name: 'Лосось на гриле',
        price: 650,
        category: 'main',
        count: '250 г',
        image: 'images/grilled-salmon.png',
        kind: 'fish'
    },
    {
        keyword: 'fish-and-chips',
        name: 'Рыба с картофелем фри',
        price: 380,
        category: 'main',
        count: '300 г',
        image: 'images/fish-and-chips.png',
        kind: 'fish'
    },
    {
        keyword: 'vegetable-stew',
        name: 'Овощное рагу',
        price: 240,
        category: 'main',
        count: '300 г',
        image: 'images/vegetable-stew.png',
        kind: 'veg'
    },
    {
        keyword: 'tuna-salad',
        name: 'Салат с тунцом',
        price: 350,
        category: 'salad',
        count: '200 г',
        image: 'images/tuna.png',
        kind: 'fish'
    },
    {
        keyword: 'caesar-salad',
        name: 'Цезарь с цыпленком',
        price: 370,
        category: 'salad',
        count: '220 г',
        image: 'images/caesar.png',
        kind: 'meat'
    },
    {
        keyword: 'greek-salad',
        name: 'Греческий салат',
        price: 290,
        category: 'salad',
        count: '250 г',
        image: 'images/greek.png',
        kind: 'veg'
    },
    {
        keyword: 'caprese',
        name: 'Капрезе с моцареллой',
        price: 320,
        category: 'salad',
        count: '200 г',
        image: 'images/caprese.png',
        kind: 'veg'
    },
    {
        keyword: 'korean-carrot',
        name: 'Морковь по-корейски',
        price: 150,
        category: 'salad',
        count: '150 г',
        image: 'images/korean-carrot.png',
        kind: 'veg'
    },
    {
        keyword: 'bruschetta',
        name: 'Брускетта с томатами',
        price: 280,
        category: 'salad',
        count: '180 г',
        image: 'images/bruschetta.png',
        kind: 'veg'
    },
    {
        keyword: 'orange-juice',
        name: 'Апельсиновый сок',
        price: 120,
        category: 'drink',
        count: '300 мл',
        image: 'images/orangejuice.jpg',
        kind: 'cold'
    },
    {
        keyword: 'apple-juice',
        name: 'Яблочный сок',
        price: 90,
        category: 'drink',
        count: '300 мл',
        image: 'images/applejuice.jpg',
        kind: 'cold'
    },
    {
        keyword: 'carrot-juice',
        name: 'Морковный сок',
        price: 110,
        category: 'drink',
        count: '300 мл',
        image: 'images/carrotjuice.jpg',
        kind: 'cold'
    },
    {
        keyword: 'cappuccino',
        name: 'Капучино',
        price: 180,
        category: 'drink',
        count: '250 мл',
        image: 'images/cappuccino.png',
        kind: 'hot'
    },
    {
        keyword: 'latte',
        name: 'Латте',
        price: 200,
        category: 'drink',
        count: '300 мл',
        image: 'images/latte.png',
        kind: 'hot'
    },
    {
        keyword: 'black-tea',
        name: 'Чай чёрный',
        price: 80,
        category: 'drink',
        count: '300 мл',
        image: 'images/tea.png',
        kind: 'hot'
    },

    {
        keyword: 'chocolate-cake',
        name: 'Шоколадный торт',
        price: 220,
        category: 'dessert',
        count: '100 г',
        image: 'images/chocolate-cake.png',
        kind: 'small'
    },
    {
        keyword: 'baklava',
        name: 'Пахлава',
        price: 180,
        category: 'dessert',
        count: '80 г',
        image: 'images/baklava.png',
        kind: 'small'
    },
    {
        keyword: 'macarons',
        name: 'Макаронс (2 шт)',
        price: 250,
        category: 'dessert',
        count: '60 г',
        image: 'images/macarons.png',
        kind: 'small'
    },
    {
        keyword: 'cheesecake',
        name: 'Чизкейк Нью-Йорк',
        price: 290,
        category: 'dessert',
        count: '150 г',
        image: 'images/cheesecake.png',
        kind: 'medium'
    },
    {
        keyword: 'tiramisu',
        name: 'Тирамису',
        price: 310,
        category: 'dessert',
        count: '160 г',
        image: 'images/tiramisu.png',
        kind: 'medium'
    },
    {
        keyword: 'donuts-6',
        name: 'Пончики (6 штук)',
        price: 450,
        category: 'dessert',
        count: '350 г',
        image: 'images/donuts.png',
        kind: 'large'
    }
];