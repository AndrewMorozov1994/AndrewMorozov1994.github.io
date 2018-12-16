import Loader from './download.js';

let array = [];
const template = document.querySelector('#product__template').content.querySelector('#products_section');
const productArea = document.querySelector('.product__area');

const assoc = (param, parent) => {
    const arr = param.split('\n');
     
    for (let i = 0; i < arr.length; i++) {
        parent.insertAdjacentHTML('beforeend', `<a href="#" class="url--link">${arr[i].slice(0, -1)}`+`${i < arr.length -1 ? `,` : `.`} </a>`)
    }
}

const createCard = (parametr) => {
    const card = template.cloneNode(true);

    const imgURLSlice = parametr.primaryImageUrl.slice(0, -4); /* отрезаем расширение у пути к картинке */
    const extension = parametr.primaryImageUrl.slice(-4); /* Расширение картинки */
    const imgURL = imgURLSlice + '_220x220_1' + extension;

    const retailPriceBlock = card.querySelector('.retailPrice');
    const retailPriceGoldBlock = card.querySelector('.goldPrice');

    const cardTags = card.querySelector('.product_tags');
    const unitSelectAll = card.querySelectorAll('.unit--select');

    const arrowsWrapper = card.querySelector('.stepper');
    const stepperInput = card.querySelector('.stepper-input');

    const unitSelectClick = () => {
        for (let i = 0; i< unitSelectAll.length; i++) {
            unitSelectAll[i].addEventListener('click', () => {
                if (unitSelectAll[i].classList.contains('unit--active')) return;

                unitSelectAll.forEach(element => {
                    if (element.classList.contains('unit--active')) {
                        element.classList.remove('unit--active');
                    }
                    
                });
                unitSelectAll[i].classList.add('unit--active');

                switch (i) {
                    case 0:  
                        retailPriceBlock.innerHTML = parametr.priceRetailAlt;
                        retailPriceGoldBlock.innerHTML = parametr.priceGoldAlt;
                        break;
                    case 1: 
                        retailPriceBlock.innerHTML = parametr.priceRetail;
                        retailPriceGoldBlock.innerHTML = parametr.priceGold;    
                };
                
            })
        }
    }

    const arrowsClick = () => {
        arrowsWrapper.addEventListener(`click`, (e) => {
            if (e.target.closest('.stepper-arrow') == null) return;

            if (e.target.closest('.up')) {
                stepperInput.value = +stepperInput.value + 1;
            } else {
                stepperInput.value <= 1 ? stepperInput.value = 1 : stepperInput.value = +stepperInput.value -1;
            }


        })
    };
    arrowsClick();
    
    unitSelectClick();
    card.querySelector('.product_code').innerHTML = parametr.code;
    card.querySelector('.product_photo img').src = imgURL;
    card.querySelector('.product_description a').innerHTML = parametr.title;
    card.querySelector('.btn .ng-binding').setAttribute('data-product-id', parametr.productId); /* Добавляем ID атрибут к кнопке корзины */
    retailPriceBlock.innerHTML = parametr.priceRetailAlt;
    retailPriceGoldBlock.innerHTML = parametr.priceGoldAlt;

    assoc(parametr.assocProducts, cardTags);

    return card;
}

const showCard = (param) => {
    for (let i = 0; i < param.length; i++) {
        productArea.appendChild(createCard(param[i]));
    }
}


const a = async () => {
    
    const loader = new Loader();
    const data = await loader.loadData();
    await array.push(...data);
    await showCard(array);
}
a();

