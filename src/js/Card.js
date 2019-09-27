

const errorElementName = document.querySelector('.error-message_name');
const errorElementLink = document.querySelector('.error-message_link');

export function resetPopupAddCard() {
    errorElementName.textContent = "";
    errorElementLink.textContent = "";
}