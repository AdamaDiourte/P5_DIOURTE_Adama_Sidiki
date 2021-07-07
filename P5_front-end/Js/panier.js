/*|||||||| Début----AFFICHAGE DYNAMIQUE DES ARTCILES SELECTIONNES DANS LE PANIER  |||||||||*/ 

let produitEnregistrerDansLeLocalStorage = JSON.parse(localStorage.getItem("produit")); /*La méthode JSON.parse sert à convertir les données du local storage qui sont au format JSON en objet JavaScript*/

const conteneurArticleDansLePanier = document.getElementById("container-article-panier"); /* conteneur où seront injectés les produits envoyés dans le panier */

// --------Message à afficher selon l'état du panier

if(produitEnregistrerDansLeLocalStorage === null || produitEnregistrerDansLeLocalStorage == 0){
    // Message à afficher si le panier est vide
    const messagePanierVide = `
    <div class="text-center text-center-modif-1"> 
        <div>Votre panier est vide pour l'instant</div>
    </div>
    `;
    conteneurArticleDansLePanier.innerHTML = messagePanierVide 
}
    
else{
    // Message à afficher si le panier n'est pas vide
    const messagePanierAvecProduit = `
    <div class="text-center text-center-modif-1"> 
        <div>Votre panier contient les articles suivants : </div>
    </div>
    `;
    conteneurArticleDansLePanier.innerHTML = messagePanierAvecProduit 


    // ---------Boucle FOR sert afficher les articles selon le nombre de choix du client 

    const structreProduitPanier = []; /* variable vide au départ mais se remplit au fur et mesure que le client choisse un article*/
    
    for(k = 0; k < produitEnregistrerDansLeLocalStorage.length; k++){
        // Structure HTLM de la présentataion des produits dans le panier 
        structreProduitPanier += `
            <div class="container-recapitulalitf">
                <div class="font-weight-bold div-nom-produit">${produitEnregistrerDansLeLocalStorage[k].name}</div>
                <div class="font-weight-bold"> ${produitEnregistrerDansLeLocalStorage[k].varnish}</div>
                <div class="font-weight-bold"> ${produitEnregistrerDansLeLocalStorage[k].price /100}.00 € </div>
                <div class="font-weight-bold"><i class=" icone-supprimer far fa-trash-alt"></i></div>
            </div>
        `;

    }

    // Condition d'affichage des articles du localStorage dans le panier
    if(k === produitEnregistrerDansLeLocalStorage.length ){
        //Code à injecter dans le HTML
        conteneurArticleDansLePanier.innerHTML = structreProduitPanier;
    }
    else{
        // Message à envoyer si les articles ne s'affichent pas ou bien si la condition précédente ne marche pas
        alert("Une erreur s'est produite lors de l'enregistrement de vos produits. Veuillez reprendre SVP!")
    }
}
/*|||||||| Fin----AFFICHAGE DYNAMIQUE DES ARTCILES SELECTIONNES DANS LE PANIER  |||||||||*/






/*|||||||||||||||||| Début---SUPPRESSION ARTICLE DANS LE PANIER ||||||||||||||||||||||||*/ 

let iconeSupprimer = document.querySelectorAll("icone-supprimer"); /*Ciblage de l'icône de suppression*/

for(n = 0; n < iconeSupprimer.length; n++){
    IconeSupprimer[n].addEventlistener("click", (event) =>{
        event.preventDefault();

        // Sélection de l'ID de l'article à supprimer 
        let IdArticleSupprimer = produitEnregistrerDansLeLocalStorage[n].id
        
        // Supression de l'élément ciblé sans supprimer le reste des éléments du panier 
        produitEnregistrerDansLeLocalStorage = produitEnregistrerDansLeLocalStorage.filter( el => el.id !== IdArticleSupprimer) 

        //Envoi de la variable dans le local storage
        localStorage.setItem("produit", JSON.stringify(produitEnregistrerDansLeLocalStorage)); /*Création de la clé "produit" dans le local storage*/
        
        // Avertissment pour la suppression d'un article du panier
        alert("Cet article a été supprimé du panier");
        window.location.href = "panier.html";
    })
}

/*|||||||||||||||||| Fin---SUPPRESSION ARTICLE DANS LE PANIER ||||||||||||||||||||||||*/





/*|||||||||||||||||| Début---CALCUL DU MONTANT TOTAL DE LA COMMANDE ||||||||||||||||||||*/

// Déclaration de la variable qui contient tout le prix de l'ensemble des articles dans le panier
let prixTotalCalcul = []; /*La variable est vide au départ et se remplit selon les articles choisis*/

// Récupération des prix dans le panier avec une boucle for
for(m = 0; m < produitEnregistrerDansLeLocalStorage.length; m++ ){
    // Récupération du prix de tous les articles dans le panier
    let prixTousLesArticlesDansLePanier =  produitEnregistrerDansLeLocalStorage[m].price;

    //Envoi des prix récupérés dans le tableau
    prixTotalCalcul.push(prixTousLesArticlesDansLePanier)
}

//Addition des prix avec la méthode .reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalCalcul.reduce(reducer, 0);

// Le code HTML du prix total à afficher 
const prixTotalHtml = `
    
    <div class="container-montant-total">
        <div class="font-weight-bold">Prix total = ${prixTotal}.00 €</div>
    </div>
`;

// Injection du prix total dans la page HTML du panier 
conteneurArticleDansLePanier.insertAdjacentHTML("befordend", prixTotalHtml);

/*|||||||||||||||||| FIN---CALCUL DU MONTANT TOTAL DE LA COMMANDE |||||||||||||||||||||||||||||||||*/




/*|||||||||||||||||||||||||Début-------GESTION DU FORMULAIRE |||||||||||||||||||||||||||||||*/  

// Injecter le code HTML du formulaire dans le HTML
const formulaireHtml = () => {
    // Ciblage de la zone du DOM pour l'injection du code HTML du formualire de commande 
    const formulaireCommande = document.getElementById("container-article-panier");

    // Structure HTML du formulaire de commande
    const structureFormulaire = `
        <div class="formulaire-titre">

            <h3 class="text-center">Remplissez le formulaire pour valider la commande</h3>
        
            <form action="#">

                <div class="form-row">
                    <div class="col-md-6">
                        <label for="prenom">Pénom</label> <span> id="prenomManquant" class="texte-danger"</span>
                        <input id="prenom" class="form-control" type="text" name="prenom" placeholder="Paul" required>
                    </div>
                    
                    <div class="col-md-6">
                        <label for="nom">Nom</label> <span> id="nomManquant" class="texte-danger"</span>
                        <input id="nom" class="form-control" type="text" name="nom" placeholder="DUPONT" required>
                    </div>


                    <div class="col-md-6">
                        <label for="adress">Adresse</label> <span> id="adresseManquant" class="texte-danger"</span>
                        <textarea name="adresse" class="form-control" id="adresse" cols="30" rows="1" placeholder="44 Rue de France" required></textarea>
                    </div>


                    <div class="col-md-6">
                        <label for="ville">Ville</label> <span> id="nomVilleManquant" class="texte-danger"</span>
                        <input id="ville" class="form-control" type="text" name="ville" placeholder="Lille" required>
                    </div>


                    <div class="col-md-6">
                        <label for="codepostal">Code postal</label> <span> id="codepostalManquant" class="texte-danger"</span>
                        <input id="codepostal" class="form-control" type="number" name="codepostal" placeholder="59000" required>
                    </div>

                    <div class="col-md-6">
                        <label for="email">Email</label> <span> id="emailManquant" class="texte-danger"</span>
                        <input id="email" class="form-control" type="email" name="email" placeholder="dupont@gmail.com" required>
                    </div>

                
                </div>

                <div class="btn div-btn-commande">
                    <div><button id="envoi-formulaire" class="btn btn-success" type="submit" name="envoi-formulaire">Commander</button></div>
                </div>

            </form>

        </div>

    `; 

    // Injection de la structure HTML du formulaire dans le HTML dans le 
    formulaireCommande.insertAdjacentHTML("afterend", structureFormulaire);
} 

// Appel de la fonction formulaireHtml() pour afficher le formulaire dans le Html
formulaireHtml();

// Ciblage du bouton d'envoi du formuaire 
const btnEvoyerLeFormulaire = document.querySelector("#envoi-formulaire");

// -----------AddEventListener du formulaire ou gestion des effets du formulaire-------------
btnEvoyerLeFormulaire.AddEventListener("click", (e)=>{
    e.preventDefault();

    // Récupération des valeurs du formaulaire pour les mettre dans le local storage
    const formulaireValeur ={
        prenom :document.getElementById("prenom").value,
        nom : document.getElementById("nom").value,
        adresse:document.getElementById("adresse").value,
        ville :document.getElementById("ville").value,
        codepostal :document.getElementById("codepostal").value,
        email :document.getElementById("email").value,
    }

    /*--------------Début-----Contrôle de la validation des champs du formulaire---------*/ 
    const textAlert = (value) =>{
        return value + ": Chiffres et symboles non autorisés.\n Caractères min : 2 et max : 20"
    }
    
    // variable globale de la méthode regex du "prénom, nom et ville"
    const regexPrenomNomVille = (value) =>{
        return /^[A-Za-z]{2,20}$/.test(leprenom)
    }

    const regexlecodepostal = (value) =>{
        return /^[0-9]{5}$/.test()
    }

    // Variable expression régulière  mail
    const regexEmail = (value) =>{
        return /^[\w -\.] + @ ([\ w -] + \.) + [\ w -] {2,4}$/.test(value)
    }

    // Variable expression régulière adresse
    const regexAdresse = (value) =>{
        return /^^[A-Za-z0-9\s] {5, 50}$/.test(value)
    }

    // Contrôle la validité du prénom
    function prenomControle (){
        const leprenom = formulaireValeur.prenom;
        
        // Condition pour contrôler le remplissage du formulaire avec la méthode regex oou expression régulière 
        if(regexPrenomNomVille(leprenom)){
            document.getElementById("prenomManquant").textContent = "";
            return true;
        }
        else{
            document.getElementById("prenomManquant").textContent ="Veuillez sasir un prénom valide"
            alert(textAlert("Prénom"))
            return false;
        };

    }
    
    // Contrôle la validité du nom
    function nomControle (){
        const lenom = formulaireValeur.nom;
        // Condition pour contrôler le remplissage du formulaire avec la méthode regex oou expression régulière 
        if(regexPrenomNomVille(lenom)){
             document.getElementById("nomManquant").textContent =""
            return true;
        }
        else{
            document.getElementById("nomManquant").textContent ="Veuillez sasir un Nom valide"
            alert(textAlert("Nom"))
            return false;
        };

    }

    
    // Contrôle la validité de l'adresse
    function adresseControle (){
        const ladresse = formulaireValeur.adresse;
        // Condition pour contrôler le remplissage du formulaire avec la méthode regex oou expression régulière 
        if(regexEmail(ladresse)){
            document.getElementById("adresseManquant").textContent =""
            return true;
        }
        else{
            document.getElementById("adresseManquant").textContent ="Veuillez sasir une adresse valide"
            alert(textAlert("L'adresse ne doit pas contenir de signes de ponctuation ou de caractères spéciaux"))
            return false;
        };

    }

    // Contrôle la validité de la ville
    function villeControle (){
        const laville = formulaireValeur.ville;
        // Condition pour contrôler le remplissage du formulaire avec la méthode regex oou expression régulière 
        if(regexPrenomNomVille(laville)){
            document.getElementById("nomVilleManquant").textContent =""
            return true;
        }
        else{
            document.getElementById("nomVilleManquant").textContent ="Veuillez sasir le nom de votre ville"
            alert(textAlert("Ville"))
            return false;
        };

    }

    // Contrôle la validité du code postal
    function lecodepostalControle (){
        const lecodepostal = formulaireValeur.codepostal;
        // Condition pour contrôler le remplissage du formulaire avec la méthode regex oou expression régulière 
        if(regexlecodepostal(lecodepostal)){
            document.getElementById("codepostalManquant").textContent =""
            return true;
        }
        else{
            document.getElementById("codepostalManquant").textContent ="Veuillez sasir un numéro valide"
            alert("Le code postal doit être composé de 5 chiffres");
            return false;
        };

    }

    // Contrôle la validité de email
    function emailControle (){
          const lemail = formulaireValeur.email;
        // Condition pour contrôler le remplissage du formulaire avec la méthode regex oou expression régulière 
        if(regexEmail(lemail)){
            document.getElementById("emailManquant").textContent =""
            return true;
        }
        else{
            document.getElementById("emailManquant").textContent ="Veuillez sasir un email valide"
            alert(textAlert("L'eamil saisi n'est pas valide"))
            return false;
        };

    }



    /*-----------------Fin----------Contrôle de la validation des champs du formulaire---------*/ 
    

    // Condition pour envoyer ou non le formulaire selon le remplissage des champs 
    if(prenomControle () && nomControle() && villeControle() && lecodepostalControle () && emailControle () && adresseControle () && villeControle () ){
        // Mettre l'objet "formulaireValeur" dans le local storage
        localStorage.setItem("formulaireValeur", JSON.stringify(formulaireValeur));

        // Mettre le prix total de la commande dans le local storage
        localStorage.setItem("prixTotal", JSON.stringify(prixTotalCalcul));
        
        // Mettre les valeurs du formulaire et les articles sélectionnés dans un objet à envoyer vers le server
        const ValFormulaireEtAticleSelectionner = {
            produitEnregistrerDansLeLocalStorage,
            formulaireValeur,prixTotalCalcul
        };

        envoiVersServer(ValFormulaireEtAticleSelectionner);

    }
    else{
        alert("Les champs du formulaire ne sont pas bien remplis. Veuillez les remplir SVP!")
    }

    
});



function envoiVersServer (ValFormulaireEtAticleSelectionner){
    // Envoi de l'objet "ValFormulaireEtAticleSelectionner" vers le server 

    const EnvoiCommand = fetch("http://localhost:3000/api/furniture",{
        method: "POST",
        body: JSON.stringify(ValFormulaireEtAticleSelectionner),
        headers: {
            "content-type" :"application/json",
        } 
    });


    // Pour voir le résulat du server dans la console méthode
    EnvoiCommand.then(async(response) => {
        try{
            const contenu = await response.json();
            if(response.ok){
                console.log("Requête réuissie");

                // Récupération de l'ID de la response du server et mise dans le local storage
                localStorage.setItem("responseIdServer", contenu._Id) 

                // Aller à la page de confirmation de la commande
                window.location ="/P5_front-end/html/confirmation.html"

            }
            else{
                alert(`Il semble qu'une erreur ${response.status} est survenue lors du chargemet des données depuis l'API`)
            }
        }
        catch(e){
            alert(`Il semble qu'une erreur ${e} est survenue lors du chargement des données depuis l'API`)
        }
    })
}

// Garder le contenu du champ du formulaire après raffraîchessment de la page 
// Prendre la clé du local storage pour la mettre dans une variable 
const datalocalStorage = localStorage.getItem("formulaireValeur");

// Convertir la chaine de caractère en objet JSON
const datalocalStorageObjet = JSON.parse(datalocalStorage);

// Mettre les valeurs du local storage dans le formulaire
document.getElementById("prenom").value = datalocalStorageObjet.prenom;
document.getElementById("nom").value = datalocalStorageObjet.nom;
document.getElementById("adresse").value = datalocalStorageObjet.adresse;
document.getElementById("ville").value = datalocalStorageObjet.ville;
document.getElementById("codepostal").value = datalocalStorageObjet.codepostal;
document.getElementById("email").value = datalocalStorageObjet.email;

/*||||||||||||||||||||||||| Fin-------GESTION DU FORMULAIRE |||||||||||||||||||||||||||||||*/ 
