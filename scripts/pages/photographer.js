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

    {/* <p>Prix: ${photographer.price}€/jour</p> */}

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
    
}

// Appelle de la fonction pour afficher les informations du photographe lorsque la page a fini de charger
window.onload = displayPhotographerInfo;