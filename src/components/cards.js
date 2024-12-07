// Импорты из других модулей
import { openPopup } from './modal.js';
import { removeLikeFromCard, addLikeToCard, removeCard } from './api.js';

// Переменная для попапа просмотра изображения
const imageViewPopup = document.querySelector('.popup_type_image');

// Экспортируемая функция для создания карточки
export function generateCard(cardData, loggedInUserId) {
  const template = document.querySelector('#card-template').content;
  const cardElement = template.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;

  if (cardData.likes.some((user) => user._id === loggedInUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // Обработчик для лайка
  likeButton.addEventListener('click', () => {
    if (likeButton.classList.contains('card__like-button_is-active')) {
      removeLikeFromCard(cardData._id)
        .then((updatedCard) => {
          likeButton.classList.remove('card__like-button_is-active');
          likeCount.textContent = updatedCard.likes.length;
        })
        .catch((err) => {
          console.error('Ошибка при снятии лайка:', err);
        });
    } else {
      addLikeToCard(cardData._id)
        .then((updatedCard) => {
          likeButton.classList.add('card__like-button_is-active');
          likeCount.textContent = updatedCard.likes.length;
        })
        .catch((err) => {
          console.error('Ошибка при постановке лайка:', err);
        });
    }
  });

  // Удаление карточки
  if (cardData.owner._id !== loggedInUserId) {
    deleteButton.style.display = 'none';
  }
  deleteButton.addEventListener('click', () => {
    removeCard(cardData._id)
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => {
        console.error('Ошибка при удалении карточки:', err);
      });
  });

  // Открытие попапа с изображением
  cardImage.addEventListener('click', () => {
    const popupImage = imageViewPopup.querySelector('.popup__image');
    const popupCaption = imageViewPopup.querySelector('.popup__caption');
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openPopup(imageViewPopup);
  });

  return cardElement;
}
