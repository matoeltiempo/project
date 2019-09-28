import { api, popupEditLvl, popupAvatarLvl, buttonEdit, buttonSave } from '../index.js';
import { inputProfileName, inputProfileInfo} from '../index.js';
import { renderLoadingProfile, renderLoadingAvatar } from './renderloading.js';
import { validate } from './validate.js';


const userName = document.querySelector('.user-info__name');
const userInfo = document.querySelector('.user-info__job');
const userPhoto = document.querySelector('.user-info__photo');

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
            buttonSave.classList.remove('popup_button_activate');                      
        });
}