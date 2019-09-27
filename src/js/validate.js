export function validate(element) {
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