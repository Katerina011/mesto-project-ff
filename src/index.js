import './index.css';
import {initialCards} from './components/cards';
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
    renderInitialCards(cards, onDelete, putLike, openPopupImg, user._id);
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
    openModal(popupAddCard);
    clearValidation(addPlaceForm, configValid);
});

avatarImage.addEventListener("click", () => {
    openModal(popupAvatar);
    clearValidation(avatarForm, configValid);
});

handleClose(popupEditProfile);
handleClose(popupAddCard);
handleClose(popupCardImg);
handleClose(popupAvatar);

// @todo: формы
const handleEditFormSubmit = (evt) => {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popupEditProfile);
}
const handleAddFormSubmit = (evt) => {
    evt.preventDefault();
    const newCard = {
        name: placeNameInput.value,
        link: linkInput.value,
    };
    cardList.prepend(createCard(newCard, onDelete, openPopupImg, putLike, userId));
    closeModal(popupAddCard);
    addPlaceForm.reset();
};

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

const handleAvatarFormSubmit = (evt) => {
     evt.preventDefault();
    function makeRequest() {
        const avatar = avatarUrlUnput.value;
        return patchAvatar(avatar)
        .then((res) => {
            avatarImage.style.backgroundImage = `url(${user.avatar})`
            closeModal(avatarForm);
      });
  }
  handleSubmit(makeRequest, evt);
}

profileForm.addEventListener('submit', handleEditFormSubmit);
addPlaceForm.addEventListener('submit', handleAddFormSubmit);
avatarForm.addEventListener('submit', handleAvatarFormSubmit)

// @todo: валидация попапов
enableValidation(configValid);