/*||||||||||||||||||||||Début-----GESTION DE LA COMMANDE|||||||||||||||||||||||*/ 

// Récupération de l'ID de la commande envoyé par le server
const responseIdServer = localStorage.getItem("responseIdServer");

// Récupération du tableau des prix 
const tableauPrix = localStorage.getItem("tableauPrix");

// Récupération du prix total de la commande 
const prixTotal = localStorage.getItem("prixTotal");

// Récupération des valeurs du formulaire 
const formulaireValeur = localStorage.getItem("formulaireValeur");

// Récupération de la clé des produits enregistrés dans le panier 
const produit = localStorage.getItem("produit");

//--------- Structructure HTML de la page confirmation commande

// Sélection de l'élément DOM où sera injecté la structure HTML dans le Js
const confirmationCommande = document.getElementById("container-article-panier-confirmation");

// Strcuture du code HTML à injecter
const structureConfirmationCommande = `

    <h3 class="titre-detail-produit">Confirmation de votre commande</h3>

    <div class="div-confirmation">
        <p class="text-success">Votre commande a été enregistrée avec succès !</p>
        <p class="text-secondary">Montant total : ${prixTotal}.00 € </p>
        <p class="text-danger">Numéro de suivi : ${responseIdServer}</p>
        <p class="text-primary">Au plaisir de vous retrouver sur Orinoco !</p>
        
    </div>

`;

// Injection de la structure dans le HTML

confirmationCommande.insertAdjacentHTML("afterbegin", structureConfirmationCommande);

/*||||||||||||||||||||||Fin-----GESTION DE LA COMMANDE|||||||||||||||||||||||*/



// Fonction pour effacer les clés et les valeurs dans le Local Storage 
function supprimerCleLoclastorage (key) {
    localStorage.removeItem(key);
};

supprimerCleLoclastorage("prixTotal")
supprimerCleLoclastorage("tableauPrix")
supprimerCleLoclastorage("responseIdServer")
supprimerCleLoclastorage("articleCliquer")
supprimerCleLoclastorage("formulaireValeur")
supprimerCleLoclastorage("produit")


