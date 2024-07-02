import { Media } from './media.js';

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

export { ImageMedia };