// Импорты
import userAvatarImage from '../images/avatar.jpg';
import siteLogoImage from '../images/logo.svg';
import '../pages/index.css';
import { toggleButtonState } from './validation.js';
import { openPopup, closePopup } from './modal.js';
import {generateCard} from './cards.js'
// Импорт API-функций
import {
  fetchUserProfile,
  fetchInitialCards,
  modifyUserProfile,
  createNewCard,
  removeCard,
  addLikeToCard,
  removeLikeFromCard,
  changeAvatar,
} from './api.js';



// Применение изображений через JavaScript
const avatarImageElement = document.querySelector('.profile__image');
avatarImageElement.style.backgroundImage = `url(${userAvatarImage})`;

const siteLogoElement = document.querySelector('.header__logo');
siteLogoElement.src = siteLogoImage;

// Элементы на странице для данных пользователя
const profileTitleElement = document.querySelector('.profile__title');
const profileDescElement = document.querySelector('.profile__description');
const profileAvatarImgElement = document.querySelector('.profile__image');

// Контейнер для карточек
const cardContainer = document.querySelector('.places__list');

// Элементы поп-апов
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const imageViewPopup = document.querySelector('.popup_type_image');

// Кнопки закрытия поп-апов
const closePopupButtons = document.querySelectorAll('.popup__close');


// Форма редактирования профиля
const editProfileButton = document.querySelector('.profile__edit-button');
const profileEditForm = editProfilePopup.querySelector('.popup__form');
const nameInputField = editProfilePopup.querySelector('.popup__input_type_name');
const jobInputField = editProfilePopup.querySelector('.popup__input_type_description');

// Форма добавления новой карточки
const addNewCardButton = document.querySelector('.profile__add-button');
const newCardForm = addCardPopup.querySelector('.popup__form');
const cardTitleInput = addCardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardPopup.querySelector('.popup__input_type_url');


const updateAvatarPopup = document.querySelector('.popup_type_update-avatar');
const avatarForm = updateAvatarPopup.querySelector('.popup__form');
const avatarUrlInput = avatarForm.querySelector('.popup__input_type_avatar-url');
// Переменная для хранения ID текущего пользователя
let loggedInUserId = null;

closePopupButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    closePopup(popup);
  });
});

// Загрузка информации о пользователе с сервера
fetchUserProfile()
  .then((userData) => {
    profileTitleElement.textContent = userData.name;
    profileDescElement.textContent = userData.about;
    profileAvatarImgElement.style.backgroundImage = `url(${userData.avatar})`;
    loggedInUserId = userData._id; // Сохраняем ID текущего пользователя
  })
  .catch((err) => {
    console.error(`Ошибка загрузки профиля: ${err}`);
  });

// Загрузка карточек с сервера
fetchInitialCards()
  .then((cards) => {
    displayCards(cards);
  })
  .catch((err) => {
    console.error(`Ошибка загрузки карточек: ${err}`);
  });


// Функция для отображения карточек
function displayCards(cards) {
  cards.forEach((cardData) => {
    const cardElement = generateCard(cardData, loggedInUserId);
    cardContainer.append(cardElement);
  });
}

editProfileButton.addEventListener('click', () => {
  nameInputField.value = profileTitleElement.textContent;
  jobInputField.value = profileDescElement.textContent;
  openPopup(editProfilePopup);
});

profileEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';

  const updatedUserData = { name: nameInputField.value, about: jobInputField.value };
  modifyUserProfile(updatedUserData)
    .then((userData) => {
      profileTitleElement.textContent = userData.name;
      profileDescElement.textContent = userData.about;
      closePopup(editProfilePopup);
    })
    .catch((err) => {
      console.error(`Ошибка обновления профиля: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
});

addNewCardButton.addEventListener('click', () => {
  cardTitleInput.value = '';
  cardLinkInput.value = '';
  openPopup(addCardPopup);
});

newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = 'Создание...';

  const newCardData = { name: cardTitleInput.value, link: cardLinkInput.value };
  createNewCard(newCardData)
    .then((cardData) => {
      const newCard = generateCard(cardData, loggedInUserId);
      cardContainer.prepend(newCard);
      closePopup(addCardPopup);
    })
    .catch((err) => {
      console.error(`Ошибка добавления карточки: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = 'Создать';
    });
});

avatarUrlInput.addEventListener('input', () => {
  const inputs = [avatarUrlInput];
  const submitButton = avatarForm.querySelector('.popup__button');
  toggleButtonState(inputs, submitButton);
});
profileAvatarImgElement.addEventListener('click', () => {
  openPopup(updateAvatarPopup);
});

avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';

  const avatarUrl = avatarUrlInput.value;
  changeAvatar(avatarUrl)
    .then((userData) => {
      profileAvatarImgElement.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(updateAvatarPopup);
      avatarForm.reset();
    })
    .catch((err) => {
      console.error(`Ошибка обновления аватара: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
});
