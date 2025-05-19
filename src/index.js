import './index.css';
import {initialCards} from './components/cards';
import {createCard, onDelete, putLike, popupCardImg} from './components/card';
import {openModal, closeModal, handleClose} from './components/modal';

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
const addPlaceForm = document.forms['new-place'];
const placeNameInput =addPlaceForm.elements['place-name'];
const linkInput = addPlaceForm.elements.link;

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    const card = createCard(item, onDelete, putLike);
    cardList.append(card);
});

// @todo: попапы
btnEditProfile.addEventListener('click', (evt) => {
    openModal(popupEditProfile)
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
});
btnAddCard.addEventListener('click', (evt) => {
    openModal(popupAddCard);
});

handleClose(popupEditProfile);
handleClose(popupAddCard);
handleClose(popupCardImg);

// @todo: формы
const handleEditFormSubmit = (evt) => {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    closeModal(popupEditProfile);
}
profileForm.addEventListener('submit', handleEditFormSubmit);

const handleAddFormSubmit = (evt) => {
    evt.preventDefault();
    const newCard = {
        name: placeNameInput.value,
        link: linkInput.value,
    };
    cardList.prepend(createCard(newCard, onDelete, putLike));
    closeModal(popupAddCard);
    addPlaceForm.reset();
}
addPlaceForm.addEventListener('submit', handleAddFormSubmit);
