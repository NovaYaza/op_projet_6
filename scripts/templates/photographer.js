function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;
    const photographerProfile = `photographer.html?id=${id}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const linkPhotographer = document.createElement('a');
        linkPhotographer.setAttribute('href', photographerProfile);
        linkPhotographer.setAttribute('aria-label', 'Photographe ' + name);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        linkPhotographer.appendChild(img);
        linkPhotographer.appendChild(h2);

        const location = document.createElement('p');
        location.className = "p_location";
        location.textContent = `${city}, ${country}`;

        const taglinePhotographer = document.createElement('p');
        taglinePhotographer.className = "p_tagline";
        taglinePhotographer.textContent = tagline;

        const pricePhotographer = document.createElement('p');
        pricePhotographer.className = "p_price";
        pricePhotographer.textContent = `${price}€/jour`;


        article.appendChild(linkPhotographer);
        article.appendChild(location);
        article.appendChild(taglinePhotographer);
        article.appendChild(pricePhotographer);
        return (article);
    }
    return { name, picture, city, country, tagline, price, id, getUserCardDOM };
}