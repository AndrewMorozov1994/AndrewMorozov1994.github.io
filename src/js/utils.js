// Список товаров, которые могут потребоваться
export const assoc = (param, parent) => {
    const arr = param.split('\n');
     
    for (let i = 0; i < arr.length; i++) {
        parent.insertAdjacentHTML(`beforeend`, `<a href="#" class="url--link">${arr[i].slice(0, -1)}`+`${i < arr.length -1 ? `,` : `.`} </a>`)
    }
}

// Увеличение/уменьшение количества товара
export const arrowsClick = (wrap, input) => {
    wrap.addEventListener(`click`, (e) => {
        if (e.target.closest(`.stepper-arrow`) == null) return;

        if (e.target.closest(`.up`)) {
            input.value = +input.value + 1;
        } else {
            input.value <= 1 ? input.value = 1 : input.value = +input.value - 1;
        }
    })
};

// Вставка карточек в DOM
export const showCard = (data, cardTemplate, wrapper) => {
    for (let i = 0; i < data.length; i++) {
        wrapper.appendChild(cardTemplate(data[i]));
    }
}

// Сколько кв. метров в упаковке (округляем до 2 знаков)
export const squareMeterToPack = (data) => {
    const devision = data.priceRetailAlt/data.priceRetail;
    return `1 упак. = ${devision.toFixed(2)} м. кв.`
}
