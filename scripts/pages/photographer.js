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

    // Filtrer les médias du photographe
    const media = data.media.filter(m => m.photographerId == photographerId);

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

    // Affichage des médias du photographe
    const mediaGalleryDiv = document.querySelector(".photographer_media");
    mediaGalleryDiv.innerHTML = media.map(item => `
        <article class="media-item">
            <img src="assets/images/${photographer.id}/${item.image}" alt="${item.title}">
            <p>${item.title}</p>
            <p>Likes: ${item.likes}</p>
        </article>
    `).join('');

    {/* <video controls>
        <source src="assets/images/${photographer.id}/${item.video}" type="video/mp4">
        Your browser does not support the video tag.
    </video> */}

    {/* <p>Date: ${item.date}</p>
    <p>Price: ${item.price}€</p> */}
}

// Appelle de la fonction pour afficher les informations du photographe lorsque la page a fini de charger
window.onload = displayPhotographerInfo;