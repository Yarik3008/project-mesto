
function checkInputValidity(formElement, inputElement) {
  if (inputElement.validity.valid) {
    hideError(formElement, inputElement);
  } else {
    showError(formElement, inputElement, inputElement.validationMessage);
  }
}

function setEventListeners(formElement) {
  const buttonElement = formElement.querySelector('.popup__button');
  const inputs = Array.from(formElement.querySelectorAll('.popup__input'));
  toggleButtonState(inputs, buttonElement);
  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputs, buttonElement);
    });
  });
}

function showError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
}


function hideError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__error_visible');
}


function enableValidation() {
  const forms = Array.from(document.querySelectorAll('.popup__form'));
  forms.forEach((formElement) => {
    setEventListeners(formElement);
  });
}
function toggleButtonState(inputs, submitButton) {
  const isValid = inputs.every((input) => input.validity.valid);
  if (isValid) {
    submitButton.classList.remove('popup__button_disabled');
    submitButton.disabled = false;
  } else {
    submitButton.classList.add('popup__button_disabled');
    submitButton.disabled = true;
  }
}


enableValidation();
export{toggleButtonState}