function displayModal() {
    const modal = document.getElementById("contact_modal");
    const mainOpacity = document.getElementById("main");
	modal.style.display === "block";
    if (modal.style.display = "block") {
        mainOpacity.style.opacity = 0.2;
    }
}

function closeModal() {
    document.getElementById('form_contact').reset();
    
    const modal = document.getElementById("contact_modal");
    const mainOpacity = document.getElementById("main");
    modal.style.display = "none";
    mainOpacity.style.opacity = 1;
}

document.getElementById('form_contact').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rafraîchissement de la page

    // Récupère les valeurs des champs du formulaire
    let firstName = document.getElementById('first').value;
    let lastName = document.getElementById('last').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message_personnalisé').value;

    // Affiche les valeurs dans la console
    console.log('Prénom:', firstName);
    console.log('Nom:', lastName);
    console.log('Email:', email);
    console.log('Message:', message);

    // Fermeture de la modal
    closeModal()
});