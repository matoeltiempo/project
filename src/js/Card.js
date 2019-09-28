import { api, popupCardLvl, buttonAdd } from '../index.js';
import { validate } from './validate.js';

export function newCard(event) {
    event.preventDefault();

    const form = document.forms.new;
    const name = form.elements.name;
    const link = form.elements.link;
    const inputs = Array.from(form.elements);

    let isValidForm = true;

    inputs.forEach((elem) => {
        if (!elem.classList.contains('popup__button')) {
            if (!validate(elem)) isValidForm = false;
        }
    });

    if (isValidForm) {
        api.setAddCard(name.value, link.value);
        popupCardLvl.close();
        buttonAdd.classList.remove('popup_button_activate');
        form.reset();
    } else {
        console.log('Не прошло');
    }
}

export function resetPopupAddCard() {
    document.querySelector('.error-message_name').textContent = "";
    document.querySelector('.error-message_link').textContent = "";
}