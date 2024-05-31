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

    // Filtrer les informations et les médias du photographe
    const photographer = data.photographers.find(p => p.id == photographerId);
    const media = data.media.filter(m => m.photographerId == photographerId);

    // Affichage des infos du photographe
    const photographerInfoDiv = document.querySelector(".photographer_info");
    const picture = `assets/photographers/${photographer.portrait}`;
    photographerInfoDiv.innerHTML = `
        <h1>${photographer.name}</h1>
        <p>${photographer.city}, ${photographer.country}</p>
        <p>${photographer.tagline}</p>
        <p>Prix: ${photographer.price}€/jour</p>
        <img src="${picture}" alt="${photographer.name}">
    `;

    // Affichage des médias du photographe
    const mediaGalleryDiv = document.querySelector(".photographer_media");
    mediaGalleryDiv.innerHTML = media.map(item => `
        <div class="media-item">
            <img src="${item.image}" alt="${item.title}">
            <p>${item.title}</p>
            <p>Likes: ${item.likes}</p>
            <p>Date: ${item.date}</p>
            <p>Price: ${item.price}€</p>
        </div>
    `).join('');
}

// Appelle de la fonction pour afficher les informations du photographe lorsque la page a fini de charger
window.onload = displayPhotographerInfo;