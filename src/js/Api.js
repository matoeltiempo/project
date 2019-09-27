import {api} from '../index.js';

export default class Api {
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
    async likeCard(card) {
        const result = await fetch(`${this.baseUrl}/cards/like/${card.id}`, {
            method: 'PUT', headers: this.headers
        })
        return this.getResponseJson(result);
    }
    async dislikeCard(card) {
        const result = await fetch(`${this.baseUrl}/cards/like/${card.id}`, {
            method: 'DELETE', headers: this.headers
        })
        return this.getResponseJson(result);
    }
}

export function deleteCard(id) {
    api.deleteCard(id)
        .then(res => {

        })
        .catch((err) => {
            console.log(err);
        });
}