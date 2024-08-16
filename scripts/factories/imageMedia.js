import { Media } from './media.js';

class ImageMedia extends Media {
    createMediaElement() {
        const mediaPath = `assets/images/${this.photographerId}/${this.image}`;
        return `
            <div class="media-item">
                <a aria-label="${this.title}, closeup view"><img src="${mediaPath}" alt="${this.title}" data-title="${this.title}" tabindex="0"></a>
                <div class="name_like_media">
                    <p class="p_namemedia">${this.title}</p>
                    <div class="nblikes_heart">
                        <p class="likes-count">${this.likes}</p>
                        <i class="fa-regular fa-heart" id="fill_heart" aria-label="likes" role="button" tabindex="0" ></i>
                    </div>
                </div>
            </div>
        `;
    }
}

export { ImageMedia };