import Loader from './download.js';
import {showCard} from './utils.js';
import {createCard} from './card.js'

let array = [];
const productArea = document.querySelector(`.product__area`);

const addCards = async () => {
    const loader = new Loader();
    const data = await loader.loadData();
    await array.push(...data);
    await showCard(array, createCard, productArea);
};

addCards();
