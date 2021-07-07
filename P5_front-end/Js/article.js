/*|||||||||||||||||| Début----RECUPERATION DE L'ID ARTICLES DANS L'URL ||||||||||||||||*/

// const recupUrlArticle = window.location.search   /*Récupérer l'ID de l'article depuis l'URL*/
// console.log(recupUrlArticle);

// const recupIdArticle = recupUrlArticle.slice(1);   /*Extraitre l'ID de l'article sans le point d'interrogation*/ 
// console.log(recupIdArticle);

let params = (new URL(document.location)).searchParams;
let recupIdArticle = params.get('id'); // Récupère la valeur correspondante à l'ID
console.log(recupIdArticle);

/*|||||||||||||||||||| Fin----RECUPERATION DE L'ID ARTICLES DANS L'URL ||||||||||||||||||*/




/*||||||||||||||||||||| Début----ENVOI DE L'ID ARTICLES DANS L'URL |||||||||||||||||||*/

let articleCliquer = fetch(`http://localhost:3000/api/furniture/${recupIdArticle}`)
    .then (function(resAPI){
                            return resAPI.json()      /*Fonction qui stock et convertit ensuite en JSON le fichier récupéré depuis l'API*/
                                })

                        .then (function(articles){    /*Fonction qui permet de renommer les fichiers récupérés et les retournes partout où ils sont appelés*/
                                    return articles
                                    
                                }) 

                        .catch (function(error){       /*Fonction qui affiche le message signalant un problème de téléchargement*/
                            alert("Une erreur est survenue lors du chargement des fichiers depuis l'API")
                        })

/*||||||||||||||||||| Fin----ENVOI DE L'ID ARTICLES DANS L'URL ||||||||||||||||||||||||*/



/*||||||||||||||||||||| Début----AFFICHAGE ARTICLES SELECTIONNE ||||||||||||||||||||||||*/

const structureArticleSelectionner = `

    <div class="card ">
        <img src="${articleCliquer.imageUrl}" class="img-card" >

        <div class="div-article-titre-prix">
            <h4 class="titre-article">${articleCliquer.name}</h4>
            <span class="lead">Prix: ${articleCliquer.price / 100}.00 €</span>
        </div>

        <figcaption class="description">${articleCliquer.description}</figcaption>

        <div class="div-slect-btn">

            <form class="div-select" id "form-perso-article">
                <label class="titre-label" for="">Vernisage</label>
                <select class="champ-selection champ-selection-modif-1" id="monselect">
                    
                </select>
            </form>

            <a href="/P5_front-end/html/panier.html"><button type="submit"class="btn btn-secondary btn-modif-1 btn-acheter">Ajouter au panier</button></a>
                
        </div>
    </div>

`;

// Injection de la structure HTML de l'article sélectionné dans le HTLM
const conteneurArticleSelectionner = document.getElementById("container-article");
conteneurArticleSelectionner.innerHTML = structureArticleSelectionner;

/*|||||||||||||||||||||||| Fin----AFFICHAGE ARTICLES SELECTIONNE |||||||||||||||||||||||||||||*/




/*||||||||| Début----PERSONNALISATION DE L'ARTICLE SELECTIONNE et GESTION DU PANIER ||||||||||*/

// Envoi des options de personnalisation de l'article dans la carte-article
const vernisAPI = document.getElementById("monselect");
let verniSelectionner = [];
vernisAPI.innerHTML = verniSelectionner;

// Choix du verni
const choixDuVerni = articleCliquer.varnish;

// Pour afficher toutes les options de vernissage de l'article depuis l'API
for(j= 0; j < choixDuVerni.length; j++){
    const verniSelectionner = verniSelectionner +`
        <option value="${choixDuVerni[j]}"selected>${choixDuVerni[j]}</option>
    ` ;
}

// Récupération des données personnalisées 
const vernisArticle = document.getElementById("monselect");

// Ciblage du bouton d'ajout dans le panier depuis le DOM
const btnAcheter = document.querySelector(".btn-acheter"); 

// Envoie de l'article au panier après un clique sur le bouton 
btnAcheter.addEventListener("click", (event) => {
    
    event.preventDefault();
    
    // Mettre le choix de l'utilisateur dans une variable 
    const articlePersonnaliser = vernisArticle.value;

    //  Récupérer les données de l'article customisé 
    let articleVernisChoisi = {
        id:articleCliquer._id,
        imageUrl: articleCliquer.imageUrl,
        name: articleCliquer.name,
        price: articleCliquer.price / 100,
        varnish: articleCliquer.articlePersonnaliser,
    };

    /*--------STOCKAGE DE L'ARTICLE CUSTOMISÉ DANS LE LOCAL STORAGE-------------*/ 

    // Déclaration de la variable "produitEnregistrerDansLeLocalStorage" dans laquelle on met les clé et les vlauers dans le local STORAGE
    let produitEnregistrerDansLeLocalStorage = JSON.parse(localStorage.getItem("produit")); /*La méthode JSON.parse sert à convertir les données du local storage qui sont au format JSON en objet JavaScript*/

    // Fonction pop up pour confirmer ou non la commande de l'article
    const popupConfirmation = () =>{
        if(window.confirm(`${articleCliquer._id}" option : ${articleCliquer.articlePersonnaliser} a bien été ajouté au panier
    consulter le panier OK ou continuer vos achats CONTINUER`)){
            window.location.href = "/P5_front-end/html/panier.html"
        }
        else{
            window.location.href = "index.html"
        }
    }
    
    // Fonction d'ajout de produit dans le local storage 
    const ajoutProduitLoclaStorage = () =>{
        produitEnregistrerDansLeLocalStorage.push(articleVernisChoisi); /*Envoi l'article choisi dans le tableau vide*/
        
        localStorage.setItem("produit", JSON.stringify(produitEnregistrerDansLeLocalStorage)); /*Création de la clé "produit" dans le local storage*/
    }
    // S'il y a des produits enregistrés dans le local storage
    if (produitEnregistrerDansLeLocalStorage){
       ajoutProduitLoclaStorage();

    } 

    // S'il n'y a pas de produits enregistrés dans le local storage
    else{
        produitEnregistrerDansLeLocalStorage = [];
        ajoutProduitLoclaStorage();

    }

})

/*|||||||||||| Fin----PERSONNALISATION DE L'ARTICLE SELECTIONNE et GESTION DU PANIER |||||||||*/
