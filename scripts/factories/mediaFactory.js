import { ImageMedia } from './imageMedia.js';
import { VideoMedia } from './videoMedia.js';

class MediaFactory {
    static createMedia(mediaData) {
        if (mediaData.image) {
            return new ImageMedia(mediaData);
        } else if (mediaData.video) {
            return new VideoMedia(mediaData);
        } else {
            throw 'Type de média non supporté';
        }
    }
}

export { MediaFactory };