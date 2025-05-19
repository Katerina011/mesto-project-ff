// @todo: Функция создания карточки
import {openModal} from "./modal";
export const popupCardImg = document.querySelector('.popup_type_image');
const popupImage = popupCardImg.querySelector('.popup__image');
const popupCaption = popupCardImg.querySelector('.popup__caption');

export function createCard(item, onDelete, putLike) {
    const cardTmp = document.querySelector('#card-template').content;
    const card = cardTmp.querySelector('.card').cloneNode(true);
    const btnDelete = card.querySelector('.card__delete-button');
    const btnLike = card.querySelector('.card__like-button');
    const cardImage = card.querySelector('.card__image');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    card.querySelector('.card__title').textContent = item.name;
     cardImage.addEventListener('click', () => {
        popupImage.src = item.link;
        popupImage.alt = item.name;
        popupCaption.textContent = item.name;
        openModal(popupCardImg);
    });

    btnDelete.addEventListener('click', (evt) => {
        onDelete(card);
    });

    btnLike.addEventListener('click', putLike);
    return card;
};

// @todo: Функция удаления карточки
export function onDelete(card) {
    card.remove();
};

export const putLike = (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
};