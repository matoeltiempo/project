import './index.css'
import './script.js';

const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort2' : 'https://praktikum.tk/cohort2';

const root = document.querySelector('.root');
const placesList = root.querySelector('.places-list');
const userName = root.querySelector('.user-info__name');
const userInfo = root.querySelector('.user-info__job');
const userPhoto = root.querySelector('.user-info__photo');
const formPoput = document.querySelector('.popup__form');
const formProfile = document.querySelector('.popup__form_profile');
const formAvatar = document.querySelector('.popup__form_avatar');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputLinkUrl = document.querySelector('.popup__input_type_link-url');
const popupAvatarInputLinkUrl = document.querySelector('.popup__input-avatar_type_link-url');
const errorElementAvatar = document.querySelector('.error-message_url');
const errorElementName = document.querySelector('.error-message_name');
const errorElementLink = document.querySelector('.error-message_link');

const popupAddCard = document.querySelector('.popup_add-new-card');
const popupForm = popupAddCard.querySelector('.popup__form');
const buttonAdd = popupForm.querySelector('.popup__button');
const popupProfile = document.querySelector('.popup_edit-profile');
const popupProfileForm = popupProfile.querySelector('.popup__form_profile');
const inputProfileName = popupProfileForm.querySelector('.popup__input_type_name');
const inputProfileInfo = popupProfileForm.querySelector('.popup__input_type_info');
const buttonEdit = document.querySelector('.popup-profile__button');
const popupImage = document.querySelector('.popup__image');
const openImage = popupImage.querySelector('.open_image');
const buttonSave = document.querySelector('.popup-avatar__button');

import {userOptions} from './js/userOptions.js';

class Card {
  constructor(name, link, id, owner, likes) {
    this.ownerAdmin = '9f1719d8192a32bc3d8c8364';
    this.cardElement = this.createCard(name, link, id, owner, likes);
    this.like = this.like.bind(this);
    this.remove = this.remove.bind(this);

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
    cardLikeIcon.classList.add('place-card__like-icon');
    cardLikeValue.classList.add('place-card__like-value');


    placesList.appendChild(card);
    card.appendChild(cardImage);
    cardImage.appendChild(cardDeleteIcon);
    card.appendChild(cardDescription);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(cardLikeIcon);

    if (owner === this.ownerAdmin) {
      console.log(this);
    }
    // cardDescription.appendChild(cardLikeValue);

    return card;
  }
  like() {
    this.likeButton.classList.toggle('place-card__like-icon_liked');
  }
  remove() {
    deleteCard(this.cardElement.id);
    this.cardElement.remove('.place-card');
    this.likeButton.removeEventListener('click', this.like);
    this.removeButton.removeEventListener('click', this.remove);
  }
}

class CardList {
  constructor(container, data) {
    this.container = container;
    this.data = data;
    this.render();
  }
  addCard(name, link, id, owner, likes) {
    const { cardElement } = new Card(name, link, id, owner, likes);
    this.container.appendChild(cardElement);
  }
  render() {
    this.data.forEach(item => {
      this.addCard(item.name, item.link, item._id, item.owner._id, item.likes);
    });
  }
}

class Popup {
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
const popupCardLvl = new Popup(addCardLevel);
const popupEditLvl = new Popup(editUserLevel);
const popupImageLvl = new Popup(imageLevel);
const popupAvatarLvl = new Popup(avatarLevel);

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }
  getResponseJson(result) {
    if (result.ok) {
      console.log(result);
      return Promise.resolve(result.json());
    }
    return Promise.reject(result.status);
  }
  async getUserData() {
    const result = await fetch(`${this.baseUrl}/users/me`, { headers: this.headers })
    return this.getResponseJson(result);
  }
  async getInitialCards() {
    const result = await fetch(`${this.baseUrl}/cards`, { headers: this.headers })
    return this.getResponseJson(result);
  }
  async setUserData(name, info) {
    const result = await fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH', headers: this.headers,
      body: JSON.stringify({
        name: `${name}`,
        about: `${info}`
      })
    })
    return this.getResponseJson(result);
  }
  async setAddCard(name, link) {
    const result = await fetch(`${this.baseUrl}/cards`, {
      method: 'POST', headers: this.headers,
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`
      })
    })
    return this.getResponseJson(result);
  }
  async setUserAvatar(url) {
    const result = await fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH', headers: this.headers,
      body: JSON.stringify({
        avatar: `${url}`
      })
    })
    return this.getResponseJson(result);
  }
  async deleteCard(id) {
    const result = await fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE', headers: this.headers
    })
    return this.getResponseJson(result);
  }
}

const api = new Api(userOptions);

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

function deleteCard(id) {
  api.deleteCard(id)
    .then(res => {

    })
    .catch((err) => {
      console.log(err);
    });
}

function editProfile(name, info) {
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

function editAvatar(url) {
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

function resetPopupAddCard() {
  errorElementName.textContent = "";
  errorElementLink.textContent = "";
}

function renderLoadingProfile(isLoading) {
  buttonEdit.textContent = isLoading ? 'Загрузка...' : 'Сохранить';
}

function renderLoadingAvatar(isLoading) {
  buttonSave.textContent = isLoading ? 'Загрузка...' : 'Сохранить';
}

function handleValidatePopup() {
  const titleIsValid = validate(popupInputName);
  const linkUrlIsValid = validate(popupInputLinkUrl);
  const submitButtonPopup = formPoput.querySelector('.popup__button');

  if (titleIsValid && linkUrlIsValid) {
    resetError(submitButtonPopup);
  } else {
    activateError(submitButtonPopup);
  }
}

function handleValidate() {
  const nameIsValid = validate(inputProfileName);
  const infoIsValid = validate(inputProfileInfo);
  const submitButton = formProfile.querySelector('.popup__button');

  if (nameIsValid && infoIsValid) {
    resetError(submitButton);
  } else {
    activateError(submitButton);
  }
}

function handleValidateAvatar() {
  const linkUrlIsValid = validate(popupAvatarInputLinkUrl);
  const submitButtonAvatar = formAvatar.querySelector('.popup__button');

  if (linkUrlIsValid) {
    resetError(submitButtonAvatar);
  } else {
    activateError(submitButtonAvatar);
  }
}

function activateError(button) {
  button.classList.remove('popup_button_activate');
  button.setAttribute('disabled', true);
}
function resetError(button) {
  button.classList.add('popup_button_activate');
  button.removeAttribute('disabled');
}

function validate(element) {
  const errorElement = document.querySelector(`.error-message_${element.name}`);

  if (!element.checkValidity() && element.type === 'url') {
    errorElement.textContent = 'Здесь должна быть ссылка';
    return false
  } else if (!element.checkValidity() && element.type === 'text') {
    errorElement.textContent = 'Это обязательное поле';

    return false
  } else if ((element.value.trim().length <= 1 || element.value.trim().length > 30) && element.type === 'text') {
    errorElement.textContent = 'Должно быть от 2 до 30 символов';

    return false
  } else {
    errorElement.textContent = "";
  }
  return true
}

function profileInfo(event) {
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

function profileValue() {
  inputProfileName.setAttribute('value', userName.textContent);
  inputProfileInfo.setAttribute('value', userInfo.textContent);
}

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

function saveAvatar(event) {
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

root.addEventListener('click', function (event) {
  if (event.target.classList.contains('user-info__button')) {
    resetPopupAddCard();
    formPoput.reset();
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
formPoput.addEventListener('input', handleValidatePopup);
formAvatar.addEventListener('input', handleValidateAvatar);