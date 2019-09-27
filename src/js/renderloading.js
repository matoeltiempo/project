import { buttonEdit, buttonSave } from "../index.js";

export function renderLoadingProfile(isLoading) {
    buttonEdit.textContent = isLoading ? 'Загрузка...' : 'Сохранить';
}

export function renderLoadingAvatar(isLoading) {
    buttonSave.textContent = isLoading ? 'Загрузка...' : 'Сохранить';
}