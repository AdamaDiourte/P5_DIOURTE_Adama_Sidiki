/*|||||||| Début----AFFICHAGE DYNAMIQUE DES ARTCILES SELECTIONNES DANS LE PANIER  |||||||||*/ 
let articleLocalStrg = JSON.parse(localStorage.getItem("produit")); /*La méthode JSON.parse sert à faire passer les données du local storage du JSON en objet JavaScript*/
console.log(articleLocalStrg);
const templateHtmlPanier = document.getElementById("container-article-panier"); /* conteneur où seront injectés les produits envoyés dans le panier */

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

    // ---------Boucle FOR sert afficher les articles selon le nombre de choix du client 

   let htmlArticlePanier = []; /* variable vide au départ mais se remplit au fur et mesure que le client choisse un article*/
   
    for(let k = 0; k < articleLocalStrg.length; k++){
        // Structure HTLM de la présentataion des produits dans le panier 
        htmlArticlePanier += `
            <div class="container-recapitulalitf">
                <div class="font-weight-bold div-nom-produit">${articleLocalStrg[k].name}</div>
                <div class="font-weight-bold"> ${articleLocalStrg[k].varnish}</div>
                <div class="font-weight-bold"> ${articleLocalStrg[k].price}.00 € </div>
                <div class="font-weight-bold btn-supprim" onclick="btnSupprim ()"><i class=" icone-supprimer far fa-trash-alt" aria-label="icône poubelle pour supprimer"></i></div>
            </div>
        `;
    }
    //Code à injecter dans le HTML
    templateHtmlPanier.insertAdjacentHTML("beforeEnd", htmlArticlePanier ); 

}
/*|||||||| Fin----AFFICHAGE DYNAMIQUE DES ARTCILES SELECTIONNES DANS LE PANIER  |||||||||*/


/*|||||||||||||||||| Début---SUPPRESSION ARTICLE DANS LE PANIER ||||||||||||||||||||||||*/ 
function btnSupprim (){
    let iconeSupprimer = document.querySelectorAll(".icone-supprimer"); /*Ciblage de l'icône de suppression*/
    
    for(let n = 0; n < iconeSupprimer.length; n++){
    
        // Sélection du vernis de l'article à supprimer 
        let supprimeArticle = articleLocalStrg[n].varnish;
        
        // Supression de l'élément ciblé sans supprimer le reste des éléments du panier 
        articleLocalStrg = articleLocalStrg.filter(el => el.varnish !== supprimeArticle); 
       
        //Envoi de la variable dans le local storage
        localStorage.setItem("produit", JSON.stringify(articleLocalStrg)); /*Création de la clé "produit" dans le local storage*/
        
        // Avertissment pour la suppression d'un article du panier
        alert("Cliquez sur OK pour supprimer cet article du panier");
        window.location.href = "panier.html";
    };
}
/*|||||||||||||||||| Fin---SUPPRESSION ARTICLE DANS LE PANIER ||||||||||||||||||||||||*/


/*|||||||||||||||||| Début---CALCUL DU MONTANT TOTAL DE LA COMMANDE ||||||||||||||||||||*/

// Déclaration de la variable qui contient tout le prix de l'ensemble des articles dans le panier
let tableauDesPrix = []; /*La variable est vide au départ et se remplit selon les articles choisis*/

// Récupération des prix dans le panier avec une boucle for
for(let m = 0; m < articleLocalStrg.length; m++ ){
    // Récupération du prix de tous les articles dans le panier
    let prixDesCommandes =  articleLocalStrg[m].price;

    //Envoi des prix récupérés dans le tableau
    tableauDesPrix.push(prixDesCommandes)
}

//Addition des prix avec la méthode .reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = tableauDesPrix.reduce(reducer, 0);

// Le code HTML du prix total à afficher 
const prixTotalHtml = `
    
    <div class="container-montant-total">
        <div class="font-weight-bold text-danger text-prixTotal">Prix total = ${prixTotal}.00 €</div>
    </div>
`;
/*|||||||||||||||||| FIN---CALCUL DU MONTANT TOTAL DE LA COMMANDE |||||||||||||||||||||||||||||||||*/


/*|||||||||||||||||||||||||Début-------GESTION DU FORMULAIRE |||||||||||||||||||||||||||||||*/  

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
    // Injection de la structure HTML du formulaire dans le HTML dans le 
    formulaireCommande.insertAdjacentHTML("afterend", structureFormulaire);
} 

// Condition d'affichage du formulaire
if(articleLocalStrg === null || articleLocalStrg == 0){
    console.log("Vous avez suppimez tous les articles du panier");
    
}
else{
    // Injection du prix total dans la page HTML du panier 
    templateHtmlPanier.insertAdjacentHTML("beforeEnd", prixTotalHtml);
    // Affichage du formulaire de commande
    formulaireHtml();
}

function getFormValeur(){
    // Récupération des valeurs du formaulaire pour les mettre dans le local storage
    
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

        // Mettre la liste de prix des artciles commandés dans le local storage
        localStorage.setItem("tableauPrix", JSON.stringify(tableauDesPrix));
        // Mettre le prix total de la commande dans le local storage
        localStorage.setItem("prixTotal", JSON.stringify(prixTotal));
        
        contact = {
            firstName:contact.prenom, 
            lastName:contact.nom, 
            city:contact.ville,
            address:contact.adresse, 
            zip:contact.codepostal, 
            email:contact.email, 
        }
        // Mettre les valeurs du formulaire et les articles sélectionnés dans un objet à envoyer vers le server
        const valeurFormEtArticle = {
            products: [], /* boucle d'envoi de la liste du panier*/
        
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

    // Pour voir le résulat du server dans la console méthode
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

// Garder le contenu du champ du formulaire après raffraîchessment de la page 
// Prendre la clé du local storage pour la mettre dans une variable 
const datalocalStorage = localStorage.getItem("formulaireValeur");

// Convertir la chaine de caractère en objet JSON
if(datalocalStorage != null){
    const datalocalStorageObjet = JSON.parse(datalocalStorage);
    // Mettre les valeurs du local storage dans le formulaire
    document.getElementById("prenom").value = datalocalStorageObjet.prenom;
    document.getElementById("nom").value = datalocalStorageObjet.nom;
    document.getElementById("adresse").value = datalocalStorageObjet.adresse;
    document.getElementById("ville").value = datalocalStorageObjet.ville;
    document.getElementById("codepostal").value = datalocalStorageObjet.codepostal;
    document.getElementById("email").value = datalocalStorageObjet.email;
}

/*||||||||||||||||||||||||| Fin-------GESTION DU FORMULAIRE |||||||||||||||||||||||||||||||*/ 