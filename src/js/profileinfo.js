import { validate, buttonEdit, api, userName, userInfo, popupEditLvl } from '../index.js';
import { inputProfileName, inputProfileInfo} from '../index.js';
import { renderLoadingProfile } from './renderloading.js';

export function profileInfo(event) {
    event.preventDefault();

    const form = document.forms.edit;
    const title = form.elements.title;
    const info = form.elements.info;
    const inputs = Array.from(form.elements);

    let isValidForm = true;

    inputs.forEach((elem) => {
        if (!elem.classList.contains('popup__button')) {
            if (!validate(elem)) isValidForm = false;
        }
    });

    if (isValidForm) {
        editProfile(title.value, info.value);
        buttonEdit.classList.add('popup_button_activate');
    } else {
        console.log('Не прошло');
        buttonEdit.classList.remove('popup_button_activate');
    }
}

export function editProfile(name, info) {
    renderLoadingProfile(true);
    api.setUserData(name, info)
        .then(res => {
            userName.textContent = `${res.name}`;
            userInfo.textContent = `${res.about}`;
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoadingProfile(false);
            popupEditLvl.close();
        });
}

export function profileValue() {
    inputProfileName.setAttribute('value', userName.textContent);
    inputProfileInfo.setAttribute('value', userInfo.textContent);
}