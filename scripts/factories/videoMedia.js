import { Media } from './media.js';

class VideoMedia extends Media {
    createMediaElement() {
        const mediaPath = `assets/images/${this.photographerId}/${this.video}`;
        return `
            <div class="media-item">
                <a tabindex="0" aria-label="${this.title}, closeup view">
                    <video>
                        <source src="${mediaPath}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </a>
                <div class="name_like_media">
                    <p class="p_namemedia">${this.title}</p>
                    <p>${this.likes} <i class="fa-regular fa-heart" aria-label="likes" role="button" tabindex="0"></i></p>
                </div>
            </div>
        `;
    }
}

export { VideoMedia };
