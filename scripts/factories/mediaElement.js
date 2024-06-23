function createMediaElement(item, photographerId) {
    const imgPath = `assets/images/${photographerId}/${item.image}`;
    const videoPath = `assets/images/${photographerId}/${item.video}`;
    let mediaElement;

    if (imgPath.endsWith('.jpg') || imgPath.endsWith('.png')) {
        mediaElement = `<img src="${imgPath}" alt="${item.title}">`;
    } else if (videoPath.endsWith('.mp4')) {
        mediaElement = `<video controls>
                            <source src="${videoPath}" type="video/mp4">
                            Votre navigateur ne prend pas en charge le type de vidéo.
                        </video>`;
    }

    return `
        <div class="media-item">
            ${mediaElement}
            <div class="name_like_media">
                <p>${item.title}</p>
                <p>${item.likes}<i class="fa-regular fa-heart" aria-label="likes" role="button"></i></p>
            </div>
        </div>
    `;

    {/* <p>Date: ${item.date}</p>
    <p>Price: ${item.price}€</p> */}
}