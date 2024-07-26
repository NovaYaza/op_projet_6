/* // Fonction pour ouvrir la lightbox avec le média sélectionné
function openLightbox(mediaPath, type, title) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxVideo = document.querySelector('.lightbox-video');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    
    if (type === 'image') {
        lightboxImage.src = mediaPath;
        lightboxImage.style.display = 'block';
        lightboxVideo.style.display = 'none';
    } else if (type === 'video') {
        lightboxVideo.querySelector('source').src = mediaPath;
        lightboxVideo.load();
        lightboxVideo.style.display = 'block';
        lightboxImage.style.display = 'none';
    }
    
    lightboxCaption.textContent = title;
    lightbox.classList.remove('hidden');
}

// Fonction pour fermer la lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('hidden');
}

// // Ajout d'événements aux item des médias
document.addEventListener('DOMContentLoaded', () => {
    const mediaItems = document.querySelectorAll('.media-item img, .media-item video');
    
    mediaItems.forEach(mediaItem => {
        mediaItem.addEventListener('click', (e) => {
            const mediaPath = e.target.src;
            const mediaType = e.target.tagName.toLowerCase();
            const mediaTitle = e.target.closest('.media-item').querySelector('p').textContent;

            openLightbox(mediaPath, mediaType, mediaTitle);
        });
    });

    // Ajout d'événement au bouton de fermeture
    const closeButton = document.querySelector('.lightbox .close');
    if (closeButton) {
        closeButton.addEventListener('click', closeLightbox);
    }

    // Ajout d'événement pour fermer la lightbox lorsque l'on clique en dehors de la lightbox
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
}); */