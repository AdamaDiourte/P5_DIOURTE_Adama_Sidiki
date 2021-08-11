/*|||||||| Début----AFFICHAGE DYNAMIQUE DES ARTCILES SELECTIONNES DANS LE PANIER  |||||||||*/ 
let articleLocalStrg = JSON.parse(localStorage.getItem("produit")); /*La méthode JSON.parse sert à faire passer les données du local storage du JSON en objet JavaScript*/

const templateHtmlPanier = document.getElementById("container-article-panier"); /* conteneur où seront injectés les produits envoyés dans le panier */

(function affichPanier(){
    // --------Message à afficher selon l'état du panier
    if(articleLocalStrg === null || articleLocalStrg == 0){
        // Message à afficher si le panier est vide
        const messagePanierVide = `
        <div class="text-center text-center-modif-1"> 
            <div>Votre panier est vide pour l'instant</div>
        </div>
        `;
        templateHtmlPanier.innerHTML = messagePanierVide 
    }
    
    else{
        // info : nombre de produits enregistrés dans le panier 
        let nbrArticlePanier = [];
        nbrArticlePanier = articleLocalStrg.length;
        const navBar = document.querySelector(".nbrpanier");
        const nbrArticleDansPaniier = `
        <span class="nbreArticlePanier">${nbrArticlePanier}</span>`;
        navBar.insertAdjacentHTML("beforeEnd", nbrArticleDansPaniier); 
        
        // Message à afficher si le panier n'est pas vide
        const messagePanierAvecProduit = `
        <div class="text-center text-center-modif-1"> 
            <div>Votre panier contient les articles suivants : </div>
        </div>
        `;
        templateHtmlPanier.innerHTML = messagePanierAvecProduit; 

        // ---Boucle FOR sert afficher les articles selon le nombre de choix du client 
        let htmlArticlePanier = []; /* variable vide au départ mais se remplit au fur et à mesure que le client choisse un article*/
        for(let k = 0; k < articleLocalStrg.length; k++){
            // Structure HTLM de la présentataion des produits dans le panier 
            htmlArticlePanier += `
                <div class="container-recapitulalitf">
                    <div class="font-weight-bold div-nom-produit">${articleLocalStrg[k].name}</div>
                    <div class="font-weight-bold"> ${articleLocalStrg[k].varnish}</div>
                    <div class="font-weight-bold"> ${articleLocalStrg[k].price}.00 € </div>
                    <div class="font-weight-bold btn-supprim"><i class="icone-supprimer far fa-trash-alt" aria-label="icône poubelle pour supprimer"></i></div>
                </div>
            `;
        }
        //Code à injecter dans le HTML
        templateHtmlPanier.insertAdjacentHTML("beforeEnd", htmlArticlePanier ); 
        btnSupprim(); /*Fonction de suppression des articles enregistrés dans le panier*/
    }
})();
/*|||||||| Fin----AFFICHAGE DYNAMIQUE DES ARTCILES SELECTIONNES DANS LE PANIER  |||||||||*/


/*|||||||||||||||||| Début---SUPPRESSION ARTICLE DANS LE PANIER ||||||||||||||||||||||||*/ 
function btnSupprim(){
    let iconeSupprimer = document.getElementsByClassName("icone-supprimer"); /*Ciblage de l'icône de suppression*/
    
    for(let n = 0; n < iconeSupprimer.length; n++){
        //Action à déclencher au clique sur l'icône "poubelle" 
        iconeSupprimer[n].addEventListener("click", (e)=>{
            let index = 0;
            let parent = iconeSupprimer[n].parentElement.parentElement;
            let sibling = parent.previousElementSibling; 
            while(sibling){ 
                if(sibling.classList.contains("container-recapitulalitf")){
                    index+=1;
                    sibling = sibling.previousSibling;
                };
                break;
            }
            articleLocalStrg.splice(index, 1);
            parent.remove();
            
            alert("Cliquez sur OK pour supprimer cet article du panier"); /*Message de confirmation de la suppression*/
            getDisplayTotal(); /*Gestion du calcul des prix*/
            window.location.href = "panier.html"; /*Rafraichi la page pour la prise en compte des suppressions*/
            localStorage.setItem("produit", JSON.stringify(articleLocalStrg));/*Création de la clé "produit" dans le local storage*/       
        });
    };
};
/*|||||||||||||||||| Fin---SUPPRESSION ARTICLE DANS LE PANIER ||||||||||||||||||||||||*/



/*|||||||||||||||||| Début--MONTANT TOTAL DE LA COMMANDE ||||||||||||||||||||*/
// Fonction de gestion du montant total de la commande : calcul, affichage et suppression 
function getDisplayTotal(){
    // Déclaration de la variable qui contient le prix de l'ensemble des articles dans le panier
    let local = JSON.parse(localStorage.getItem("produit")); /*La méthode JSON.parse sert à faire passer les données du local storage du JSON en objet JavaScript*/
    let tableauDesPrix = []; /*La variable est vide au départ et se remplit selon les articles choisis*/

    // Récupération des prix dans le panier avec une boucle for
    for(let m = 0; m < local.length; m++ ){
        // Récupération du prix de tous les articles dans le panier
        let prixDesCommandes =  local[m].price;
        //Envoi des prix récupérés dans le tableau
        tableauDesPrix.push(prixDesCommandes)
    }

    //Addition des prix avec la méthode .reduce
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const prixTotal = tableauDesPrix.reduce(reducer, 0);

    const texteTotal = document.getElementById("container-montant-total"); 
    if(texteTotal){
        texteTotal.remove()
    }
    // Le code HTML du prix total à afficher 
    const prixTotalHtml = `
        <div id="container-montant-total">
            <div class="font-weight-bold text-danger text-prixTotal">Prix total = ${prixTotal}.00 €</div>
        </div>
    `;
    // Injection du prix total dans la page HTML du panier 
    templateHtmlPanier.insertAdjacentHTML("beforeEnd", prixTotalHtml);
    localStorage.setItem("prixTotal", JSON.stringify(prixTotal));
}
/*|||||||||||||||||| FIN--MONTANT TOTAL DE LA COMMANDE |||||||||||||||||||||||||||||||||*/


/*|||||||||||||||||||||||||Début-----GESTION DU FORMULAIRE |||||||||||||||||||||||||||||||*/  
// Fonction structure HTML du formulaire de commande
function formulaireHtml(){
    // Ciblage de la zone du DOM pour l'injection du code HTML du formualire de commande 
    const formulaireCommande = document.getElementById("container-article-panier");

    // Structure HTML du formulaire de commande
    const structureFormulaire = `
        <div class="div-formulaire">

            <h3 class="text-center titre-formulaire">Remplissez le formulaire pour valider la commande</h3>
        
            <form onsubmit="envoiFormulaire(this); return false" onchange="synchroLocalStrgDataForm()">
                
                <div class="form-row div-form">
                    <div class="col-md-12">
                        <label for="prenom">Pénom</label>
                        <input id="prenom" class="form-control texte-danger" type="text" name="prenom" placeholder="Paul" required>
                    </div>
                    
                    <div class="col-md-12">
                        <label for="nom">Nom</label>
                        <input id="nom" class="form-control texte-danger" type="text" name="nom" placeholder="DUPONT" required>
                    </div>

                    <div class="col-md-12">
                        <label for="adress">Adresse</label>
                        <textarea name="adresse" class="form-control texte-danger" id="adresse" cols="30" rows="1" placeholder="44 Rue de France" required></textarea>
                    </div>

                    <div class="col-md-12">
                        <label for="ville">Ville</label>
                        <input id="ville" class="form-control texte-danger" type="text" name="ville" placeholder="Lille" required>
                    </div>

                    <div class="col-md-12">
                        <label for="codepostal">Code postal</label>
                        <input id="codepostal" class="form-control texte-danger" type="number" name="codepostal" placeholder="59000" required>
                    </div>

                    <div class="col-md-12">
                        <label for="email">Email</label>
                        <input id="email" class="form-control texte-danger" type="email" name="email" placeholder="dupont@gmail.com" required>
                    </div>

                </div>

                <div class="btn div-btn-commande">
                    <div aria-lable="bouton de commande"><button id="envoi-formulaire" class="btn btn-success font-weight-bold" name="envoi-formulaire">Commander</button></div>
                </div>

            </form>

        </div>

    `; 
    // Injection de la structure HTML du formulaire dans le HTML
    formulaireCommande.insertAdjacentHTML("afterend", structureFormulaire);
} 

// Fonction auto-invoquée pour gérer les conditions d'affichage du formulaire
(function affichForm(){
    // Condition d'affichage du formulaire
    if(articleLocalStrg === null || articleLocalStrg == 0){
        console.log("Vous avez suppimez tous les articles du panier");
    }
    else{
        getDisplayTotal(); // Gestion du calcul des prix
        formulaireHtml(); // Affichage du formulaire de commande
    }
})();

// Récupération des valeurs du formaulaire pour les mettre dans le local storage
function getFormValeur(){
    return {
        prenom: document.getElementById("prenom").value,
        nom: document.getElementById("nom").value,
        adresse: document.getElementById("adresse").value,
        ville: document.getElementById("ville").value,
        codepostal: document.getElementById("codepostal").value,
        email: document.getElementById("email").value,
    }
}

// Fonction synchronisation du formulaire et le local storage 
function synchroLocalStrgDataForm(form){
    const formulaireValeur = getFormValeur();
    window.localStorage.setItem("formulaireValeur", JSON.stringify(formulaireValeur));
}

// Fonction de gestion du formulaire
function envoiFormulaire(form){

   let contact = getFormValeur();
    
    /*-------Début-----Contrôle de la validation des champs du formulaire---------*/ 
    const textAlert = (value) =>{
        return value + ": Chiffres et symboles non autorisés.\n Caractères min : 2 et max : 20"
    }
    
    // variable globale de la méthode regex du "prénom, nom et ville"
    const regexPrenomNomVille = (value) =>{
        return /^[A-Za-z\s-]{2,20}$/.test(value);
    }

    //Variable expression régulière code postal
    const regexlecodepostal = (value) =>{
        return /^[0-9]{5}$/.test(value)
    }

    // Variable expression régulière  mail
    const regexEmail = (value) =>{
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    }

    // Variable expression régulière adresse
    const regexAdresse = (value) =>{
        return /^[A-zÀ-ú\s\d]{5,60}$/.test(value)
    }

    // Contrôle la validité du prénom
    function prenomControle(){
        const leprenom = contact.prenom;
        // Condition pour contrôler le remplissage du formulaire avec la méthode regex oou expression régulière 
        if(regexPrenomNomVille(leprenom)){
            document.getElementById("prenom").textContent = "";
            return true;
        }
        else{
            document.getElementById("prenom").textContent ="Veuillez saisir un prénom valide"
            alert(textAlert("Prénom"))
            return false;
        };
    }
    
    // Contrôle la validité du nom
    function nomControle (){
        const lenom = contact.nom;
        // Condition pour contrôler le remplissage du formulaire avec la méthode regex oou expression régulière 
        if(regexPrenomNomVille(lenom)){
             document.getElementById("nom").textContent =""
            return true;
        }
        else{
            document.getElementById("nom").textContent ="Veuillez sasir un Nom valide"
            alert(textAlert("Nom"))
            return false;
        };
    }

    // Contrôle la validité de l'adresse
    function adresseControle(){
        const ladresse = contact.adresse;
        // Condition pour contrôler le remplissage du formulaire avec la méthode regex oou expression régulière 
        if(regexAdresse(ladresse)){
            document.getElementById("adresse").textContent =""
            return true;
        }
        else{
            document.getElementById("adresse").textContent ="Veuillez sasir une adresse valide"
            alert("L'adresse ne doit pas contenir de signes de ponctuation ou de caractères spéciaux")
            return false;
        };
    }

    // Contrôle la validité de la ville
    function villeControle(){
        const laville = contact.ville;
        // Condition pour contrôler le remplissage du formulaire avec la méthode regex oou expression régulière 
        if(regexPrenomNomVille(laville)){
            document.getElementById("ville").textContent =""
            return true;
        }
        else{
            document.getElementById("ville").textContent ="Veuillez sasir le nom de votre ville"
            alert(textAlert("Ville"))
            return false;
        };

    }

    // Contrôle la validité du code postal
    function lecodepostalControle (){
        const lecodepostal = contact.codepostal;
        // Condition pour contrôler le remplissage du formulaire avec la méthode regex oou expression régulière 
        if(regexlecodepostal(lecodepostal)){
            document.getElementById("codepostal").textContent =""
            return true;
        }
        else{
            document.getElementById("codepostal").textContent ="Veuillez sasir un numéro valide"
            alert("Le code postal doit être composé de 5 chiffres");
            return false;
        };

    }

    // Contrôle la validité de email
    function emailControle (){
          const lemail = contact.email;
        // Condition pour contrôler le remplissage du formulaire avec la méthode regex oou expression régulière 
        if(regexEmail(lemail)){
            document.getElementById("email").textContent =""
            return true;
        }
        else{
            document.getElementById("email").textContent ="Veuillez sasir un email valide"
            alert(textAlert("L'eamil saisi n'est pas valide"))
            return false;
        };

    }
    /*-------Fin----Contrôle de la validation des champs du formulaire---------*/ 
    

    // Condition pour envoyer ou non le formulaire selon le remplissage des champs 
    if(prenomControle() && nomControle() && villeControle() && lecodepostalControle() && emailControle() && adresseControle() && villeControle() ){
       
        // Mettre l'objet "contact" dans le local storage
        localStorage.setItem("formulaireValeur", JSON.stringify(contact));
        
        contact = {
            firstName:contact.prenom, 
            lastName:contact.nom, 
            city:contact.ville,
            address:contact.adresse, 
            zip:contact.codepostal, 
            email:contact.email, 
        }
        // Mettre les valeurs du formulaire et les articles sélectionnés dans un objet à envoyer vers le server
        const valeurFormEtArticle ={
            
            products: [], /* la liste du panier*/
            while(articleLocalStrg){
                articleLocalStrg.push(products)
            },

            contact,
        };
    
        envoiVersServer(valeurFormEtArticle);
    }
    else{
        alert("Les champs du formulaire ne sont pas bien remplis. Veuillez les remplir SVP!")
    }
};

// Fonction d'envoi du formulaire vers le server
function envoiVersServer(valeurFormEtArticle){
    
    // Envoi de l'objet "valeurFormEtArticle" vers le server 
    fetch("http://localhost:3000/api/furniture/order",{
        method: "POST",
        body: JSON.stringify(valeurFormEtArticle),
        headers: {
            "content-type" :"application/json",
        }
    })
    // Pour voir le résulat du server dans la console
    .then((response) =>{
        return response.json()
    })
    .then((response) => {
        try{
            const contenu = response;
            // Récupération de l'ID de la response du server et mise dans le local storage
            localStorage.setItem("responseIdServer", contenu.orderId);
            // Aller à la page de confirmation de la commande
            window.location.href ="confirmation.html";       
        }
        catch(e){
            alert(`Il semble qu'une erreur ${e} est survenue lors du chargement des données depuis l'API`)
        }
    })
};

//---Garder le contenu du champ du formulaire après raffraîchessment de la page 
const datalocalStorage = localStorage.getItem("formulaireValeur"); /*Prendre la clé du local storage pour la mettre dans une variable*/ 

if(datalocalStorage != null){
    const datalocalStorageObjet = JSON.parse(datalocalStorage); /* Convertir la chaine de caractère en objet JS*/
    // Mettre les valeurs du local storage dans le formulaire
    document.getElementById("prenom").value = datalocalStorageObjet.prenom;
    document.getElementById("nom").value = datalocalStorageObjet.nom;
    document.getElementById("adresse").value = datalocalStorageObjet.adresse;
    document.getElementById("ville").value = datalocalStorageObjet.ville;
    document.getElementById("codepostal").value = datalocalStorageObjet.codepostal;
    document.getElementById("email").value = datalocalStorageObjet.email;
}
/*||||||||||||||||||||||||| Fin-------GESTION DU FORMULAIRE |||||||||||||||||||||||||||||||*/ 