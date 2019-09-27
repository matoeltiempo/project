import Card from '../index.js';

export default class CardList {
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
