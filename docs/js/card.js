var card = (function (exports) {
    'use strict';

    // Список товаров, которые могут потребоваться
    var assoc = function assoc(param, parent) {
        var arr = param.split('\n');

        for (var i = 0; i < arr.length; i++) {
            parent.insertAdjacentHTML('beforeend', '<a href="#" class="url--link">' + arr[i].slice(0, -1) + ((i < arr.length - 1 ? ',' : '.') + ' </a>'));
        }
    };

    // Увеличение/уменьшение количества товара
    var arrowsClick = function arrowsClick(wrap, input) {
        wrap.addEventListener('click', function (e) {
            if (e.target.closest('.stepper-arrow') == null) return;

            if (e.target.closest('.up')) {
                input.value = +input.value + 1;
            } else {
                input.value <= 1 ? input.value = 1 : input.value = +input.value - 1;
            }
        });
    };

    // Сколько кв. метров в упаковке (округляем до 2 знаков)
    var squareMeterToPack = function squareMeterToPack(data) {
        var devision = data.priceRetailAlt / data.priceRetail;
        return '1 \u0443\u043F\u0430\u043A. = ' + devision.toFixed(2) + ' \u043C. \u043A\u0432.';
    };

    var template = document.querySelector('#product__template').content.querySelector('#products_section');

    var createCard = function createCard(data) {
        var card = template.cloneNode(true);

        var imgURLSlice = data.primaryImageUrl.slice(0, -4); /* отрезаем расширение у пути к картинке */
        var extension = data.primaryImageUrl.slice(-4); /* Расширение картинки */
        var imgURL = imgURLSlice + '_220x220_1' + extension;

        var retailPriceBlock = card.querySelector('.retailPrice');
        var retailPriceGoldBlock = card.querySelector('.goldPrice');

        var cardTags = card.querySelector('.product_tags');
        var unitSelectAll = card.querySelectorAll('.unit--select');

        var arrowsWrapper = card.querySelector('.stepper');
        var stepperInput = card.querySelector('.stepper-input');

        card.querySelector('.unit--infoInn').innerHTML = squareMeterToPack(data);
        card.querySelector('.product_code').innerHTML = data.code;
        card.querySelector('.product_photo img').src = imgURL;
        card.querySelector('.product_description a').innerHTML = data.title;
        card.querySelector('.btn').setAttribute('data-product-id', data.productId); /* Добавляем ID атрибут к кнопке корзины */
        retailPriceBlock.innerHTML = data.priceRetailAlt.toFixed(2);
        retailPriceGoldBlock.innerHTML = data.priceGoldAlt.toFixed(2);

        var unitSelectClick = function unitSelectClick() {
            var _loop = function _loop(i) {
                unitSelectAll[i].addEventListener('click', function () {
                    if (unitSelectAll[i].classList.contains('unit--active')) return;

                    unitSelectAll.forEach(function (element) {
                        if (element.classList.contains('unit--active')) {
                            element.classList.remove('unit--active');
                        }
                    });
                    unitSelectAll[i].classList.add('unit--active');

                    switch (i) {
                        case 0:
                            retailPriceBlock.innerHTML = data.priceRetailAlt.toFixed(2);
                            retailPriceGoldBlock.innerHTML = data.priceGoldAlt.toFixed(2);
                            break;
                        case 1:
                            retailPriceBlock.innerHTML = data.priceRetail.toFixed(2);
                            retailPriceGoldBlock.innerHTML = data.priceGold.toFixed(2);
                    }            });
            };

            for (var i = 0; i < unitSelectAll.length; i++) {
                _loop(i);
            }
        };

        assoc(data.assocProducts, cardTags);
        arrowsClick(arrowsWrapper, stepperInput);
        unitSelectClick();

        return card;
    };

    exports.createCard = createCard;

    return exports;

}({}));
