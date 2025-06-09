import './index.css';
import {createCard, onDelete, putLike} from './components/card';
import {openModal, closeModal, handleClose} from './components/modal';
import {enableValidation, clearValidation} from './components/validation';
import { getInitialCards, getUserInfo, postCard, deleteCard,
    patchUserInfo, patchAvatar, putCardLike, deleteCardLike } from './components/api';

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupCardImg = document.querySelector('.popup_type_image');
const popupImage = popupCardImg.querySelector('.popup__image');
const popupAvatar = document.querySelector('.popup_type_new-avatar');
const popupCaption = popupCardImg.querySelector('.popup__caption');
const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const avatarForm = document.forms['new-avatar'];
const avatarUrlUnput = avatarForm.elements.url;
const avatarImage = document.querySelector(".profile__image");
const addPlaceForm = document.forms['new-place'];
const placeNameInput =addPlaceForm.elements['place-name'];
const linkInput = addPlaceForm.elements.link;

const loading = (isLoading, button, buttonText = "Сохранить", loadingText = "Сохранение...") => {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
};
const openPopupImg = (name, link) => {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(popupCardImg);
};

const configValid = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// @todo: Вывести карточки на страницу
function renderInitialCards (cards, onDelete, openPopupImg, putLike, userId) {
    cards.forEach((card) => {
        const cardElement = createCard(card, onDelete, openPopupImg, putLike, userId);
        cardList.append(cardElement);
    });
}

let userId = "";
function addUserInfo(user) {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    avatarImage.style.backgroundImage = `url(${user.avatar})`;
    userId = user._id;
}

Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    addUserInfo(user);
    renderInitialCards(cards, onDelete, openPopupImg, putLike, user._id);
  })
  .catch((err) => {
    console.error("Произошла ошибка при получении данных:", err);
  });

// @todo: попапы
btnEditProfile.addEventListener('click', () => {
    openModal(popupEditProfile)
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(profileForm, configValid);
});
btnAddCard.addEventListener('click', () => {
    addPlaceForm.reset();
    openModal(popupAddCard);
    clearValidation(addPlaceForm, configValid);
});

avatarImage.addEventListener("click", () => {
    avatarForm.reset();
    openModal(popupAvatar);
    clearValidation(avatarForm, configValid);
});

handleClose(popupEditProfile);
handleClose(popupAddCard);
handleClose(popupCardImg);
handleClose(popupAvatar);

// @todo: формы
function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();
    const submitButton = evt.submitter;
    const buttonText = submitButton.textContent;
    loading(true, submitButton, buttonText, loadingText);

    request()
    .then(() => {
      evt.target.reset();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      loading(false, submitButton, buttonText, loadingText);
    });
}
const handleEditFormSubmit = (evt) => {
    handleSubmit(async () => {
        const res = await patchUserInfo({
            name: nameInput.value,
            about: jobInput.value
        });
        profileTitle.textContent = res.name;
        profileDescription.textContent = res.about;
        closeModal(popupEditProfile);
    }, evt);
}

const handleAddFormSubmit = (evt) => {
    handleSubmit(async () => {
        const card = await postCard(placeNameInput.value, linkInput.value);
        const newCard = createCard(card, onDelete, openPopupImg, putLike, userId);
        cardList.prepend(newCard);
        closeModal(popupAddCard);
    }, evt);
};

const handleAvatarFormSubmit = (evt) => {
    handleSubmit(async () => {
        const res = await patchAvatar(avatarUrlUnput.value);
        avatarImage.style.backgroundImage = `url(${res.avatar})`;
        closeModal(popupAvatar);
    }, evt);
}

profileForm.addEventListener('submit', handleEditFormSubmit);
addPlaceForm.addEventListener('submit', handleAddFormSubmit);
avatarForm.addEventListener('submit', handleAvatarFormSubmit);

// @todo: валидация попапов
enableValidation(configValid);