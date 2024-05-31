    async function getPhotographers() {
        const response = await fetch('data/photographers.json');
        // Vérifiez si la requête a réussi
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);// Changer pour un message erreur côté utilisateur
        }
        // Convertion de la réponse en JSON
        const data = await response.json();
        console.log(data);
        // Retourner les données des photographes
        return {
            photographers: data.photographers
        };

    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);

        /* console.log(photographers);  */
    }
    
    init();
    
