let mediaList = [];
let currentMediaIndex = 0;

document.addEventListener('DOMContentLoaded', () => {

    // Permet de fermer la lightbox en cliquant sur Entrer sur la croix
    const closeButton = document.getElementById('close_lightbox');
    closeButton.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            closeLightbox();
        }
    });

    // Permet de fermer la lightbox en cliquant sur Echap
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeLightbox();
        }
    });
});

// Permet d'enfermer les tabulations dans la lightbox
function trapTabKeyLightbox(e) {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const lightbox = document.getElementById('lightbox');
    const firstFocusableElement = lightbox.querySelectorAll(focusableElements)[0];
    const focusableContent = lightbox.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    if (e.key === 'Tab') {
        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    }
}

// Fonction pour ouvrir la lightbox avec une liste de médias
function openLightbox(mediaElement, mediaArray) {
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    const main = document.getElementById("main");

    lightbox.setAttribute('aria-hidden', 'false');
    main.setAttribute('aria-hidden', 'true');
    
    // Mettre à jour la liste des médias et l'index actuel
    mediaList = mediaArray;
    currentMediaIndex = mediaArray.indexOf(mediaElement);

    // Effacer le contenu précédent de la lightbox
    lightboxContent.innerHTML = '';

    // Créer un clone de l'élément média cliqué et l'ajouter à la lightbox
    const mediaClone = mediaElement.cloneNode(true);
    lightboxContent.appendChild(mediaClone);

    // Afficher les contrôles si c'est une vidéo
    if (mediaClone.tagName.toUpperCase() === 'VIDEO') {
        mediaClone.setAttribute('controls', 'controls');
    }

    // Afficher la lightbox
    lightbox.style.display = 'flex';

    const firstInput = document.getElementById('lightbox-next');
    firstInput.focus();

    lightbox.addEventListener('keydown', trapTabKeyLightbox);
}

// Fonction pour fermer la lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const main = document.getElementById("main");
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
    main.setAttribute('aria-hidden', 'false');

    lightbox.removeEventListener('keydown', trapTabKeyLightbox);
}

// Fonction pour afficher le média précédent
function showPrevMedia() {
    if (mediaList.length > 0) {
        currentMediaIndex = (currentMediaIndex - 1 + mediaList.length) % mediaList.length;
        updateLightboxContent();
    }
}

// Fonction pour afficher le média suivant
function showNextMedia() {
    if (mediaList.length > 0) {
        currentMediaIndex = (currentMediaIndex + 1) % mediaList.length;
        updateLightboxContent();
    }
}

// Fonction pour mettre à jour le contenu de la lightbox
function updateLightboxContent() {
    const lightboxContent = document.getElementById('lightbox-content');
    lightboxContent.innerHTML = '';

    const mediaClone = mediaList[currentMediaIndex].cloneNode(true);

    // Afficher les contrôles si c'est une vidéo lors de la navigation entre les médias
    if (mediaClone.tagName.toUpperCase() === 'VIDEO') {
        mediaClone.setAttribute('controls', 'controls');
    }

    lightboxContent.appendChild(mediaClone);
}

// Ajouter des écouteurs d'événements aux boutons de navigation
document.getElementById('close_lightbox').addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev').addEventListener('click', showPrevMedia);
document.getElementById('lightbox-next').addEventListener('click', showNextMedia);