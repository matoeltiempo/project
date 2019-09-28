import { inputProfileName, inputProfileInfo, formProfile, formPopup, formAvatar } from '../index.js';
import { validate } from './validate.js';

const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputLinkUrl = document.querySelector('.popup__input_type_link-url');
const popupAvatarInputLinkUrl = document.querySelector('.popup__input-avatar_type_link-url');

export function handleValidate() {
    const nameIsValid = validate(inputProfileName);
    const infoIsValid = validate(inputProfileInfo);
    const submitButton = formProfile.querySelector('.popup__button');

    if (nameIsValid && infoIsValid) {
        resetError(submitButton);
    } else {
        activateError(submitButton);
    }
}

export function handleValidatePopup() {
    const titleIsValid = validate(popupInputName);
    const linkUrlIsValid = validate(popupInputLinkUrl);
    const submitButtonPopup = formPopup.querySelector('.popup__button');

    if (titleIsValid && linkUrlIsValid) {
        resetError(submitButtonPopup);
    } else {
        activateError(submitButtonPopup);
    }
}

export function handleValidateAvatar() {
    const linkUrlIsValid = validate(popupAvatarInputLinkUrl);
    const submitButtonAvatar = formAvatar.querySelector('.popup__button');

    if (linkUrlIsValid) {
        resetError(submitButtonAvatar);
    } else {
        activateError(submitButtonAvatar);
    }
}

export function activateError(button) {
    button.classList.remove('popup_button_activate');
    button.setAttribute('disabled', true);
}

export function resetError(button) {
    button.classList.add('popup_button_activate');
    button.removeAttribute('disabled');
}