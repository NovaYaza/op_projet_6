class Media {
    constructor({ id, photographerId, title, image, video, likes, date, price }) {
        this.id = id;
        this.photographerId = photographerId;
        this.title = title;
        this.image = image;
        this.video = video;
        this.likes = likes;
        this.date = date;
        this.price = price;
    }

    createMediaElement() {
        throw 'La méthode createMediaElement() doit être implémentée dans les sous-classes';
    }
}

export { Media };