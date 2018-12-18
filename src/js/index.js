import Loader from './download.js';
import {showCard} from './utils.js';
import {createCard} from './card.js'

let array = [];
const productArea = document.querySelector(`.product__area`);

const addCards = async () => {
    const loader = new Loader();
    const data = await loader.loadData();
    const dataCards = await data.cards;
    await array.push(...dataCards);
    await showCard(array, createCard, productArea);
};

addCards();
