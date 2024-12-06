import { toggleButtonState } from './validation.js';
export { openPopup, closePopup };


function openPopup(popup) {
  const inputs = Array.from(popup.querySelectorAll('.popup__input'));
  const submitButton = popup.querySelector('.popup__button');
  const errorMessages = popup.querySelectorAll('.popup__error');
  popup.classList.add('popup_is-opened');
  errorMessages.forEach((errorElement) => {
    errorElement.textContent = '';
  });
  inputs.forEach((input) => {
    input.classList.remove('popup__input_type_error');
  });
  if (submitButton) {
    toggleButtonState(inputs, submitButton);
  }
  document.addEventListener('keydown', closeByEsc);
  popup.addEventListener('mousedown', handleOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
  popup.removeEventListener('mousedown', handleOverlay);
}

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function handleOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

