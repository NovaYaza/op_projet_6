import { MediaFactory } from '../factories/mediaFactory.js';

function getPhotographerIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Convertion de la réponse en JSON
async function fetchData() {
    const response = await fetch('data/photographers.json');
    return await response.json();
}

// Afficher les infos du photographe et ses médias
async function displayPhotographerInfo() {
    const photographerId = getPhotographerIdFromURL();
    const data = await fetchData();

    // Filtrer les informations du photographe
    const photographer = data.photographers.find(p => p.id == photographerId);
    if (!photographer) {
        // Si le photographe n'est pas trouvé retour sur la page d'accueil
        window.location.href = 'index.html';
        return;
    }

    // Affichage du nom du photographe dans la modale
    try {
        const photographerNameModale = document.querySelector(".name_photographer_modal");
        if (photographerNameModale) {
            photographerNameModale.innerHTML = `
                <h2>${photographer.name}</h2>
            `;
        }

        // Ajout de l'aria-label sur la modale
        const contactModalDiv = document.getElementById('contact_modal');
        if (contactModalDiv) {
            contactModalDiv.setAttribute('aria-label', `Contact Me ${photographer.name}`);
        }
    } catch (error) {
        console.error("Erreur d'affichage du nom du photographe dans la modal:", error);
    }


    // Filtrer les médias du photographe
    const media = data.media.filter(m => m.photographerId == photographerId);

    // Tri des médias par popularité par défaut
    media.sort((a, b) => b.likes - a.likes);

    // Affichage des infos du photographe
    const photographerInfoDiv = document.querySelector(".photographer_info");
    photographerInfoDiv.innerHTML = `
    <article class="media_article">
            <h1>${photographer.name}</h1>
            <p>${photographer.city}, ${photographer.country}</p>
            <p>${photographer.tagline}</p>
    </article>
    `;

    // Affichage de la photo de profil du photographe
    const photographerInfoImgDiv = document.querySelector(".photographer_imgprofil");
    const picture = `assets/photographers/${photographer.portrait}`;
    photographerInfoImgDiv.innerHTML = `
    <img src="${picture}" alt="${photographer.name}">
    `;

    // Ajout d'une fonction permettant de trier les médias
    function triMedia(media) {
        // Affichage des médias du photographe
        const mediaGalleryDiv = document.querySelector(".photographer_media");
        if (mediaGalleryDiv && media.length > 0) {
            mediaGalleryDiv.innerHTML = media.map(item => {
                const mediaInstance = MediaFactory.createMedia(item);
                return mediaInstance.createMediaElement();
            }).join('');
        } else {
            console.error("La div de la galerie multimédia est introuvable ou aucun média n'a été trouvé");
        }

        // Mettre à jour le total des likes dans l'encart après avoir trié les médias
        updateTotalLikes();
    }

    triMedia(media);

    // Trie des médias
    const menuTri = document.getElementById('menu_tri');
    if (menuTri) {
        menuTri.addEventListener('change', (event) => {
            const sortBy = event.target.value;
            if (sortBy === 'popularite') {
                media.sort((a, b) => b.likes - a.likes);
            } else if (sortBy === 'date') {
                media.sort((a, b) => new Date(b.date) - new Date(a.date));
            } else if (sortBy === 'titre') {
                media.sort((a, b) => a.title.localeCompare(b.title));
            }
            triMedia(media);
        });
    }

    // Affichage des likes et du prix du photographe dans l'encart de bas de page
    const infosEncart = document.querySelector(".photographer_encart");
    const totalLikes = media.reduce((sum, item) => sum + item.likes, 0);
    infosEncart.innerHTML = `
    <p>${totalLikes} <i class="fa-regular fa-heart"></i></p>
    <p>${photographer.price}€ / jour</p>
    `;

    // Likes et lightbox
    // Fonction pour gérer l'événement de clic ou de touche
    function mediaInteraction(event) {
    // Vérifier si l'événement est un clic ou un appui sur la touche "Entrée"
    if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) {
        // Récupérer l'élément cliqué ou sélectionné avec "Entrée"
        event.preventDefault();
        const clickedElement = event.target;

        // Vérifier si l'élément cliqué est une image ou une vidéo
        const tagName = clickedElement.tagName.toUpperCase();
        if (tagName === 'IMG' || tagName === 'VIDEO') {
            console.log('Image ou Video cliqué');
            
            // Passer la liste des médias à openLightbox
            const mediaArray = Array.from(document.querySelectorAll('.photographer_media img, .photographer_media video'));
            openLightbox(clickedElement, mediaArray);
        }

        // Vérifier si l'élément cliqué est le coeur
        if (clickedElement.classList.contains('fa-heart')) {
            console.log('Like button cliqué');
            // Récupérer l'élément qui affiche le nombre de likes (assumant qu'il a la classe 'likes-count')
            const likesCountElement = clickedElement.closest('.name_like_media').querySelector('.likes-count');
            if (likesCountElement) {
                // Récupérer le nombre actuel de likes
                let currentLikes = parseInt(likesCountElement.textContent);
                // Vérifier si le coeur est plein ou vide
                if (clickedElement.classList.contains('fa-solid')) {
                    // Si le coeur est plein, le rendre vide et décrémenter les likes
                    clickedElement.classList.remove('fa-solid');
                    clickedElement.classList.add('fa-regular');
                    currentLikes--;
                } else {
                    // Si le coeur est vide, le rendre plein et incrémenter les likes
                    clickedElement.classList.remove('fa-regular');
                    clickedElement.classList.add('fa-solid');
                    currentLikes++;
                }
                // Mettre à jour le contenu de l'élément avec le nouveau nombre de likes
                likesCountElement.textContent = currentLikes;

                // Mettre à jour le total des likes dans l'encart
                updateTotalLikes();
            }
        }
    }
}

// Fonction pour mettre à jour le total des likes dans l'encart
function updateTotalLikes() {
    const likesCountElements = document.querySelectorAll('.likes-count');
    let totalLikes = 0;
    likesCountElements.forEach(element => {
        totalLikes += parseInt(element.textContent);
    });

    const infosEncart = document.querySelector(".photographer_encart");
    infosEncart.innerHTML = `
        <p class="total_likes_encart">${totalLikes} <em class="fa-regular fa-heart"></em></p>
        <p>${photographer.price}€ / jour</p>
    `;
}

// Sélectionner tous les éléments ayant la classe 'photographer_media'
const lightboxLikesElements = document.querySelectorAll(".photographer_media");

lightboxLikesElements.forEach(element => {
    // Ajouter l'écouteur d'événements pour le clic
    element.addEventListener('click', mediaInteraction);
    // Ajouter l'écouteur d'événements pour la touche "Entrée"
    element.addEventListener('keydown', mediaInteraction);
});

// Initialiser l'encart avec le total des likes au chargement de la page
updateTotalLikes();
    
}

// Appelle de la fonction pour afficher les informations du photographe lorsque la page a fini de charger
window.onload = displayPhotographerInfo;