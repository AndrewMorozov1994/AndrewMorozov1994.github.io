var utils = (function (exports) {
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

    // Вставка карточек в DOM
    var showCard = function showCard(data, cardTemplate, wrapper) {
        for (var i = 0; i < data.length; i++) {
            wrapper.appendChild(cardTemplate(data[i]));
        }
    };

    // Сколько кв. метров в упаковке (округляем до 2 знаков)
    var squareMeterToPack = function squareMeterToPack(data) {
        var devision = data.priceRetailAlt / data.priceRetail;
        return '1 \u0443\u043F\u0430\u043A. = ' + devision.toFixed(2) + ' \u043C. \u043A\u0432.';
    };

    exports.assoc = assoc;
    exports.arrowsClick = arrowsClick;
    exports.showCard = showCard;
    exports.squareMeterToPack = squareMeterToPack;

    return exports;

}({}));
