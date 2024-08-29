    async function getPhotographers() {
        const response = await fetch('data/photographers.json');
        // Vérifiez si la requête a réussi
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Convertion de la réponse en JSON
        const data = await response.json();
        console.log(data);
        // Retourner les données des photographes
        return {
            photographers: data.photographers
        };

    }

    // Affiche les informations des photographes sur la page web
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer); // eslint-disable-line
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    // Initialise le processus de récupération et d'affichage des données
    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    // Lance le processus d'initialisation dès que le script est chargé
    init();
    
