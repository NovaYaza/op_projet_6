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

class ImageMedia extends Media {
    createMediaElement() {
        const mediaPath = `assets/images/${this.photographerId}/${this.image}`;
        return `
            <div class="media-item">
                <a aria-label="${this.title}, closeup view"><img src="${mediaPath}" alt="${this.title}"></a>
                <div class="name_like_media">
                    <p class="p_namemedia">${this.title}</p>
                    <p>${this.likes} <i class="fa-regular fa-heart" aria-label="likes" role="button"></i></p>
                </div>
            </div>
        `;
    }
}

{/* <p>Date: ${this.date}</p>
<p>Price: ${this.price}€</p> */}

class VideoMedia extends Media {
    createMediaElement() {
        const mediaPath = `assets/images/${this.photographerId}/${this.video}`;
        return `
            <div class="media-item">
                <a aria-label="${this.title}, closeup view">
                    <video>
                        <source src="${mediaPath}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </a>
                <div class="name_like_media">
                    <p class="p_namemedia">${this.title}</p>
                    <p>${this.likes} <i class="fa-regular fa-heart" aria-label="likes" role="button"></i></p>
                </div>
            </div>
        `;
    }
}

export { Media, ImageMedia, VideoMedia };