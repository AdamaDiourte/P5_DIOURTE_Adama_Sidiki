/*||||||||||||||||||||||Début-----GESTION DE LA COMMANDE|||||||||||||||||||||||*/ 

// Récupération de l'ID de la commande envoyé par le server
const responseIdServer = localStorage.getItem("responseIdServer");

// Récupération du prix total de la commande 
const prixTotalCalcul = localStorage.getItem("prixTotalCalcul");

//--------- Structructure HTML de la page confirmation commande

// Sélection de l'élément DOM où sera injecté la structure HTML dans le Js
const confirmationCommande = document.getElementById("container-article-panier-confirmation");

// Strcuture du code HTML à injecter
const structureConfirmationCommande = `

    <h2 class="titre-detail-produit">Confirmation de votre commande</h2>

    <div class="div-confirmation">
        <p class="text-success">Votre commande a été enregistrée avec succès !</p>
        <p class="text-secondary">Montant total : ${prixTotalCalcul}.00 € </p>
        <p class="text-danger">Numéro de suivi : ${responseIdServer}</p>
        <p class="text-primary">Au plaisir de vous retrouver sur Orinoco !</p>
        
    </div>

`;

// Injection de la structure dans le HTML

confirmationCommande.insertAdjacentHTML("afterbegin", structureConfirmationCommande);

/*||||||||||||||||||||||Fin-----GESTION DE LA COMMANDE|||||||||||||||||||||||*/



// Effacer tout le local storage sauf le formulaire 
function supprimerCleLoclastorage (key) {
    localStorage.removeItem(key);
};

supprimerCleLoclastorage("prixTotalCalcul")
supprimerCleLoclastorage("responseIdServer")
supprimerCleLoclastorage("articleCliquer")


