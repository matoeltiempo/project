import { api, validate, popupAvatarLvl, userPhoto } from '../index.js';
import { renderLoadingAvatar } from './renderloading';

export function saveAvatar(event) {
    event.preventDefault();

    const form = document.forms.avatar;
    const url = form.elements.url;
    const inputs = Array.from(form.elements);

    let isValidForm = true;

    inputs.forEach((elem) => {
        if (!elem.classList.contains('popup__button')) {
            if (!validate(elem)) isValidForm = false;
        }
    });

    if (isValidForm) {
        editAvatar(url.value);
        form.reset();
    } else {
        console.log('Не прошло');
    }
}

export function editAvatar(url) {
    renderLoadingAvatar(true);
    api.setUserAvatar(url)
        .then(res => {
            userPhoto.setAttribute('style', `background-image:url('${res.avatar}')`);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoadingAvatar(false);
            popupAvatarLvl.close();
        });
}