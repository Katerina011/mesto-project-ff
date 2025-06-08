import {putCardLike, deleteCardLike, deleteCard} from "./api";

// @todo: Функция создания карточки
export function createCard(cards, onDelete, openPopupImg, putLike, userId) {
    const cardTmp = document.querySelector('#card-template').content;
    const card = cardTmp.querySelector('.card').cloneNode(true);
    const btnDelete = card.querySelector('.card__delete-button');
    const btnLike = card.querySelector('.card__like-button');
    const likesCounter = card.querySelector('.card__like-counter');
    const cardImage = card.querySelector('.card__image');
    card.querySelector('.card__title').textContent = cards.name;
    cardImage.src = cards.link;
    cardImage.alt = cards.name;
    likesCounter.textContent = cards.likes.length;
   
    cardImage.addEventListener('click', () => openPopupImg(cards.name, cards.link));

    if (userId !== cards.owner._id) {
        btnDelete.style.display = "none";
    } else {
        btnDelete.addEventListener('click', () => {
            const cardId = cards._id;
            onDelete(card, cardId);
        })
    };

    const isLiked = cards.likes.some((like) => like._id === userId);
    if (isLiked) {
        btnLike.classList.add('card__like-button_is-active')
    }

    btnLike.addEventListener('click', () => {
      putLike(likesCounter, btnLike, cards);
    });

    return card;
};

// @todo: Функция удаления карточки
export function onDelete(card) {
    card.remove();
};

// @todo: Функция лайка
export function putLike(counter, button, cards) {
    if (button.classList.contains('card__like-button_is-active')) {
        deleteCardLike(cards._id)
        .then((res) => {
        button.classList.toggle('card__like-button_is-active');
        counter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.error("Ошибка:", err);
        })
    } else {
      putCardLike(cards._id)
      .then((res) => {
        button.classList.toggle('card__like-button_is-active');
        counter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error('Ошибка :', err);
      })
    }
};