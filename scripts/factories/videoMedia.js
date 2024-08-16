import { Media } from './media.js';

class VideoMedia extends Media {
    createMediaElement() {
        const mediaPath = `assets/images/${this.photographerId}/${this.video}`;
        return `
            <div class="media-item">
                <a aria-label="${this.title}, closeup view">
                    <video tabindex="0" data-title="${this.title}">
                        <source src="${mediaPath}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </a>
                <div class="name_like_media">
                    <p class="p_namemedia">${this.title}</p>
                    <div class="nblikes_heart">
                        <p class="likes-count">${this.likes}</p>
                        <em class="fa-regular fa-heart" aria-label="likes" role="button" tabindex="0" ></em>
                    </div>
                </div>
            </div>
        `;
    }
}

export { VideoMedia };
