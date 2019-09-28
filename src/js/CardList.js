import Card from '../index.js';

export default class CardList {
    constructor(container, data) {
        this.container = container;
        this.data = data;
        this.render();
    }
    addCard(name, link, likes, id, owner, ownername) {
        const { cardElement } = new Card(name, link, likes, id, owner, ownername);
        this.container.appendChild(cardElement);
    }
    render() {
        this.data.forEach(item => {
            this.addCard(item.name, item.link, item.likes, item._id, item.owner._id, item.owner.name);
        });
    }
}