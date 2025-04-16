// @todo: Темплейт карточки
const cardTmp = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(item, onDelete) {
    const card = cardTmp.querySelector('.card').cloneNode(true);
    const delButton = card.querySelector('.card__delete-button');
    const cardImage = card.querySelector('.card__image');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    card.querySelector('.card__title').textContent = item.name;
    delButton.addEventListener('click', () => {
        onDelete(card);
    });
    return card;
};

// @todo: Функция удаления карточки
function onDelete(card) {
    card.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    const card = createCard(item, onDelete);
    cardList.append(card);
});