import './style.css';

import CardList from './js/CardList';
import Api from './js/Api.js';

import { resetPopupAddCard, newCard } from './js/Card.js';
import { profileInfo, profileValue, saveAvatar } from './js/user.js';
import { handleValidate, handleValidatePopup, handleValidateAvatar } from './js/handlevalidate.js';

const root = document.querySelector('.root');
const placesList = root.querySelector('.places-list');
const popupProfileForm = document.querySelector('.popup__form_profile');

export const formPopup = document.querySelector('.popup__form');
export const formProfile = document.querySelector('.popup__form_profile');
export const formAvatar = document.querySelector('.popup__form_avatar');
export const inputProfileName = popupProfileForm.querySelector('.popup__input_type_name');
export const inputProfileInfo = popupProfileForm.querySelector('.popup__input_type_info');
export const buttonEdit = document.querySelector('.popup-profile__button');
export const buttonAdd = document.querySelector('.popup__button');
export const buttonSave = document.querySelector('.popup-avatar__button');

const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort2' : 'https://praktikum.tk/cohort2';

export const userOptions = {
    baseUrl: serverUrl,
    headers: {
        authorization: '98158e4b-35d4-4082-a4a4-b4f3010b8fcd',
        'Content-Type': 'application/json'
    }
};

export default class Card {
    constructor(name, link, likes, id, owner, ownerName) {
        this.cardElement = this.createCard(name, link, likes, id, owner);
        this.ownerAdmin = ownerName;

        this.like = this.like.bind(this);
        this.remove = this.remove.bind(this);
        this.likes = likes;

        this.likeButton = this.cardElement.querySelector('.place-card__like-icon');
        this.removeButton = this.cardElement.querySelector('.place-card__delete-icon');

        this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
        this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    }
    createCard(name, link, likes, id, owner) {
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
            document.querySelector('.user-info__name').textContent = user.name;
            document.querySelector('.user-info__job').textContent = user.about;
            document.querySelector('.user-info__photo').setAttribute('style', `background-image:url('${user.avatar}')`);
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
        document.querySelector('.open_image').src = `${getImage[1]}`;
        popupImageLvl.open();
    } else if (event.target.classList.contains('user-info__photo')) {
        popupAvatarLvl.open();
        formAvatar.reset();
        handleValidateAvatar();
        document.querySelector('.error-message_url').textContent = '';
    }
});

buttonAdd.addEventListener('click', newCard);
buttonEdit.addEventListener('click', profileInfo);
buttonSave.addEventListener('click', saveAvatar);
formProfile.addEventListener('input', handleValidate);
formPopup.addEventListener('input', handleValidatePopup);
formAvatar.addEventListener('input', handleValidateAvatar);