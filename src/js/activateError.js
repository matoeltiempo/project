export function activateError(button) {
    button.classList.remove('popup_button_activate');
    button.setAttribute('disabled', true);
}

export function resetError(button) {
    button.classList.add('popup_button_activate');
    button.removeAttribute('disabled');
}