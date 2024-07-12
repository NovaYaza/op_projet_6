document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form_contact');

    form.addEventListener('keydown', function(event) {
        // Empêcher la soumission du formulaire sur la touche Entrée dans les champs de saisie, sauf pour la zone de texte et le bouton Soumettre
        if (event.key === 'Enter' && event.target.tagName.toLowerCase() !== 'textarea' && event.target.type !== 'submit') {
            event.preventDefault();
        }
    });

    // Permet de fermer la modale en cliquant sur Entrer sur la croix
    const closeButton = document.getElementById('img_closeModal');
    closeButton.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            closeModal();
        }
    });

    // Permet de fermer la modale en cliquant sur Echap
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});

// Permet d'enfermer les tabulations dans la modale
function trapTabKey(e) {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.getElementById('contact_modal');
    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
    const focusableContent = modal.querySelectorAll(focusableElements);
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

// Fonction permettant d'ouvrir la modale
function displayModal() {
    const modal = document.getElementById("contact_modal");
    const main = document.getElementById("main");

	modal.style.display === "block";
    modal.setAttribute('aria-hidden', 'false');
    main.setAttribute('aria-hidden', 'true');

    if (modal.style.display = "block") {
        main.style.opacity = 0.2;
    }

    const firstInput = document.getElementById('first');
    firstInput.focus();

    modal.addEventListener('keydown', trapTabKey);
}

// Fonction permettant de fermer la modale
function closeModal() {
    document.getElementById('form_contact').reset();
    
    const modal = document.getElementById("contact_modal");
    const main = document.getElementById("main");

    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'false');
    main.setAttribute('aria-hidden', 'true');

    if (modal.style.display = "none") {
        main.style.opacity = 1;
    }

    modal.removeEventListener('keydown', trapTabKey);
}

//Paramètres lors du submit de l'utilisateur
function validate() {

    let isValid = true;
  
    //verification
    const eltfirstName = document.getElementById('first');
    const eltlastName = document.getElementById('last');
    const eltEmail = document.getElementById('email');
    const eltTextArea = document.getElementById('message_personnalise');
    const testEspacefirstName = eltfirstName.value.trim();
    const testEspacelastName = eltlastName.value.trim();
    const testEspaceEmail = eltEmail.value.trim();
    const testEspaceTextArea = eltTextArea.value.trim();
  
    //Vérification si le prénom est rentré
    if (testEspacefirstName === "" || testEspacefirstName.length < 1) {
      showError(eltfirstName, 'Veuillez entrer 1 caractère ou plus pour le champ du prénom.');
      isValid = false;
    //Vérification si la saisie du prénom est correct
    } else if (!/^[a-zA-ZÀ-ÿ- ]{2,}$/.test(testEspacefirstName)) {
      showError(eltfirstName, 'Veuillez entrer un prénom valide (pas de caractères spéciaux).');
      isValid = false;
    } else {
      clearErrorMessage(eltfirstName);
    }
  
    //Vérification si le nom est rentré
    if (testEspacelastName === "" || testEspacelastName.length < 1) {  
      showError(eltlastName, 'Veuillez entrer 1 caractère ou plus pour le champ du nom.');
      isValid = false;
    //Vérification si la saisie du nom est correct
    } else if (!/^[a-zA-ZÀ-ÿ- ]{2,}$/.test(testEspacelastName)) {
      showError(eltlastName, 'Veuillez entrer un nom valide (pas de caractères spéciaux).');
      isValid = false;
    } else {
      clearErrorMessage(eltlastName);
    }
  
    //Vérification si l'email est rentré et correct
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(testEspaceEmail)) {
      showError(eltEmail, 'Veuillez entrer un email valide.');
      isValid = false;
    } else {
      clearErrorMessage(eltEmail)
    }

    //Vérification si le textarea contient au moins 60 caractères
    if (testEspaceTextArea.length < 60) {
      showError(eltTextArea, 'Veuillez entrer au moins 60 caractères.');
      isValid = false;
    } else {
      clearErrorMessage(eltTextArea)
    }

    return isValid;
}

//Affichages des erreurs
function showError(element, message) {
    const formData = element.nextElementSibling;
    formData.setAttribute('data-error', message);
    formData.setAttribute('data-error-visible', 'true');
}

//Nettoyage des messages d'erreurs formulaire
function clearErrorMessage(element) {
    const formData = element.nextElementSibling;
    formData.removeAttribute('data-error');
    formData.removeAttribute('data-error-visible');
}

// Récupération des infos rentrés par l'utilisateur
document.getElementById('form_contact').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rafraîchissement de la page

    if (validate()) {
    // Récupère les valeurs des champs du formulaire
    let firstName = document.getElementById('first').value;
    let lastName = document.getElementById('last').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message_personnalise').value;

    // Affiche les valeurs dans la console
    console.log('Prénom:', firstName);
    console.log('Nom:', lastName);
    console.log('Email:', email);
    console.log('Message:', message);

    // Fermeture de la modal
    closeModal()
}
});