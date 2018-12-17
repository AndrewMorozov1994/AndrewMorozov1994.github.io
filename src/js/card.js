import *as utils from './utils.js';

const template = document.querySelector(`#product__template`).content.querySelector(`#products_section`);

export const createCard = (data) => {
    const card = template.cloneNode(true);

    const imgURLSlice = data.primaryImageUrl.slice(0, -4); /* отрезаем расширение у пути к картинке */
    const extension = data.primaryImageUrl.slice(-4); /* Расширение картинки */
    const imgURL = imgURLSlice + `_220x220_1` + extension;

    const retailPriceBlock = card.querySelector(`.retailPrice`);
    const retailPriceGoldBlock = card.querySelector(`.goldPrice`);

    const cardTags = card.querySelector(`.product_tags`);
    const unitSelectAll = card.querySelectorAll(`.unit--select`);

    const arrowsWrapper = card.querySelector(`.stepper`);
    const stepperInput = card.querySelector(`.stepper-input`);

    card.querySelector(`.unit--infoInn`).innerHTML = utils.squareMeterToPack(data);
    card.querySelector(`.product_code`).innerHTML = data.code;
    card.querySelector(`.product_photo img`).src = imgURL;
    card.querySelector(`.product_description a`).innerHTML = data.title;
    card.querySelector(`.btn`).setAttribute(`data-product-id`, data.productId); /* Добавляем ID атрибут к кнопке корзины */
    retailPriceBlock.innerHTML = data.priceRetailAlt.toFixed(2);
    retailPriceGoldBlock.innerHTML = data.priceGoldAlt.toFixed(2);

    const unitSelectClick = () => {
        for (let i = 0; i< unitSelectAll.length; i++) {
            unitSelectAll[i].addEventListener(`click`, () => {
                if (unitSelectAll[i].classList.contains(`unit--active`)) return;

                unitSelectAll.forEach((element) => {
                    if (element.classList.contains(`unit--active`)) {
                        element.classList.remove(`unit--active`);
                    }
                    
                });
                unitSelectAll[i].classList.add(`unit--active`);

                switch (i) {
                    case 0:  
                        retailPriceBlock.innerHTML = data.priceRetailAlt.toFixed(2);
                        retailPriceGoldBlock.innerHTML = data.priceGoldAlt.toFixed(2);
                        break;
                    case 1: 
                        retailPriceBlock.innerHTML = data.priceRetail.toFixed(2);
                        retailPriceGoldBlock.innerHTML = data.priceGold.toFixed(2);    
                };
                
            })
        }
    }

    utils.assoc(data.assocProducts, cardTags);
    utils.arrowsClick(arrowsWrapper, stepperInput);
    unitSelectClick();

    return card;
}
