// @todo: Функция создания карточки
import {openPopupImg} from "../index";
export function createCard(item, onDelete, putLike,) {
    const cardTmp = document.querySelector('#card-template').content;
    const card = cardTmp.querySelector('.card').cloneNode(true);
    const btnDelete = card.querySelector('.card__delete-button');
    const btnLike = card.querySelector('.card__like-button');
    const cardImage = card.querySelector('.card__image');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    card.querySelector('.card__title').textContent = item.name;
    
    cardImage.addEventListener('click', () => openPopupImg(item.name, item.link));

    btnDelete.addEventListener('click', () => onDelete(card));

    btnLike.addEventListener('click', putLike);
    return card;
};

// @todo: Функция удаления карточки
export function onDelete(card) {
    card.remove();
};

// @todo: Функция лайка
export const putLike = (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
};