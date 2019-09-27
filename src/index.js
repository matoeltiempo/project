import './style.css';

import CardList from './js/cardlist.js';
import Api from './js/Api.js';

import { resetPopupAddCard } from './js/Card.js';
import { deleteCard } from './js/Api.js';
import { profileInfo, profileValue } from './js/profileinfo.js';
import { saveAvatar } from './js/saveavatar.js';
import { handleValidate, handleValidatePopup, handleValidateAvatar } from './js/handlevalidate.js';
import { validate } from './js/validate.js';

const root = document.querySelector('.root');
const placesList = root.querySelector('.places-list');

export const userName = root.querySelector('.user-info__name');
export const userInfo = root.querySelector('.user-info__job');
export const userPhoto = root.querySelector('.user-info__photo');

export const formPopup = document.querySelector('.popup__form');
export const formProfile = document.querySelector('.popup__form_profile');
export const formAvatar = document.querySelector('.popup__form_avatar');

const errorElementAvatar = document.querySelector('.error-message_url');
const popupAddCard = document.querySelector('.popup_add-new-card');
const popupForm = popupAddCard.querySelector('.popup__form');
const buttonAdd = popupForm.querySelector('.popup__button');
const popupProfile = document.querySelector('.popup_edit-profile');
const popupProfileForm = popupProfile.querySelector('.popup__form_profile');

export const inputProfileName = popupProfileForm.querySelector('.popup__input_type_name');
export const inputProfileInfo = popupProfileForm.querySelector('.popup__input_type_info');
export const buttonEdit = document.querySelector('.popup-profile__button');
export const buttonSave = document.querySelector('.popup-avatar__button');

const popupImage = document.querySelector('.popup__image');
const openImage = popupImage.querySelector('.open_image');

const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort2' : 'https://praktikum.tk/cohort2';

export const userOptions = {
    baseUrl: serverUrl,
    headers: {
        authorization: '98158e4b-35d4-4082-a4a4-b4f3010b8fcd',
        'Content-Type': 'application/json'
    }
};

export default class Card {
    constructor(name, link, id, owner, likes) {
        this.ownerAdmin = '9f1719d8192a32bc3d8c8364';
        this.cardElement = this.createCard(name, link, id, owner, likes);
        this.like = this.like.bind(this);
        this.remove = this.remove.bind(this);
        this.likes = likes;

        this.likeButton = this.cardElement.querySelector('.place-card__like-icon');
        this.removeButton = this.cardElement.querySelector('.place-card__delete-icon');

        this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
        this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    }
    createCard(name, link, id, owner, likes) {
        const card = document.createElement('div');
        const cardImage = document.createElement('div');
        const cardDescription = document.createElement('div');
        const cardName = document.createElement('h3');
        const cardLikeContainer = document.createElement('div');
        const cardLikeIcon = document.createElement('button');
        const cardLikeValue = document.createElement('div');
        const cardDeleteIcon = document.createElement('button');

        card.classList.add('place-card');
        card.setAttribute('id', id);
        cardImage.classList.add('place-card__image');
        cardImage.setAttribute('style', `background-image:url('${link}')`);
        cardDescription.classList.add('place-card__description');
        cardDeleteIcon.classList.add('place-card__delete-icon');
        cardName.classList.add('place-card__name');
        cardName.textContent = name;
        cardLikeContainer.classList.add('place-card__like-container')
        cardLikeIcon.classList.add('place-card__like-icon');
        cardLikeValue.classList.add('place-card__like-value');
        cardLikeValue.textContent = likes.length;

        placesList.appendChild(card);
        card.appendChild(cardImage);
        cardImage.appendChild(cardDeleteIcon);
        card.appendChild(cardDescription);
        cardDescription.appendChild(cardName);
        cardDescription.appendChild(cardLikeContainer);
        cardLikeContainer.appendChild(cardLikeIcon);
        cardLikeContainer.appendChild(cardLikeValue);

        if (owner === this.ownerAdmin) {
            console.log(this);
        }


        return card;
    }
    updateLikes(likesArr) {
        this.likes = likesArr;
        this.cardElement.querySelector('.place-card__like-value').textContent = this.likes.length;
    }

    like() {
        this.likeButton.classList.toggle('place-card__like-icon_liked');
    }
    remove() {
        if (confirm('Вы действительно хотите удалить карточку?')) {
            api.deleteCard(this.cardElement.id)
                .then(res => {
                    this.cardElement.remove('.place-card');
                    this.likeButton.removeEventListener('click', this.like);
                    this.removeButton.removeEventListener('click', this.remove);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}

export class Popup {
    constructor(popupLevel) {
        this.popup = popupLevel;
        this.popup.addEventListener('click', event => {
            if (event.target.classList.contains('popup__close')) this.close();
        });
    }
    open() {
        handleValidate();
        this.popup.classList.add('popup_is-opened');
    }
    close() {
        this.popup.classList.remove('popup_is-opened');
    }
};

const [addCardLevel, editUserLevel, imageLevel, avatarLevel] = root.querySelectorAll('.popup');
export const popupCardLvl = new Popup(addCardLevel);
export const popupEditLvl = new Popup(editUserLevel);
export const popupImageLvl = new Popup(imageLevel);
export const popupAvatarLvl = new Popup(avatarLevel);

export const api = new Api(userOptions);

api.getUserData()
    .then(user => {
        if (user.name && user.about && user.avatar) {
            userName.textContent = user.name;
            userInfo.textContent = user.about;
            userPhoto.setAttribute('style', `background-image:url('${user.avatar}')`);
        }
    })
    .catch((err) => {
        console.log(err);
    });

api.getInitialCards()
    .then(res => {
        if (res && res.length > 0) {
            new CardList(document.querySelector('.places-list'), res);
        }
    })
    .catch((err) => {
        console.log(err);
    });

function newCard(event) {
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

root.addEventListener('click', function (event) {
    if (event.target.classList.contains('user-info__button')) {
        resetPopupAddCard();
        formPopup.reset();
        popupCardLvl.open();
    } else if (event.target.classList.contains('user-edit__button')) {
        profileValue();
        handleValidate();
        formProfile.reset();
        popupEditLvl.open();
    } else if (event.target.classList.contains('place-card__image')) {
        let getImage = event.target.getAttribute('style').split("'");
        openImage.src = `${getImage[1]}`;
        popupImageLvl.open();
    } else if (event.target.classList.contains('user-info__photo')) {
        popupAvatarLvl.open();
        formAvatar.reset();
        errorElementAvatar.textContent = '';
    }
});

buttonAdd.addEventListener('click', newCard);
buttonEdit.addEventListener('click', profileInfo);
buttonSave.addEventListener('click', saveAvatar);
formProfile.addEventListener('input', handleValidate);
formPopup.addEventListener('input', handleValidatePopup);
formAvatar.addEventListener('input', handleValidateAvatar);