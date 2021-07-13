/*|||||||||||||||||| Début----RECUPERATION DE L'ID ARTICLES DANS L'URL ||||||||||||||||*/

let params = (new URL(document.location)).searchParams;
let recupIdArticle = params.get('id'); // Récupère la valeur correspondante à l'ID

/*|||||||||||||||||||| Fin----RECUPERATION DE L'ID ARTICLES DANS L'URL ||||||||||||||||||*/


/*||||||||||||||||||||| Début----RECUPERATION DE L'ARTICLE AU CLIQUE DANS L'API |||||||||||||||||||*/

/* cette fonction va faire le fetch puis filtrer le bon article à retourner :*/
async function recupDataArticleDansAPI(id = null) { /* NB: id est nulle par défaut, c'est à dire dans le cas où elle n'est pas indiquée dans les parametres à l'appel de getData() */
    try {
        const data = await fetch(`http://localhost:3000/api/furniture/`); /* stocke le fichier récupéré depuis l'API, await permet d'attendre que le fetch soit réalisé avant d'exécuter la suite en dessous */
        const json = await data.json() /* convertit en JSON le fichier récupéré depuis l'API, idem pour await*/;
        if (id) { /* NB: meme chose que: id != null */
           let articleChoisi = json.find(article => article._id == id); /* NB: ici la fonction find() permet de ne retourner que l'article qui nous intéresse parmi tous les articles contenus dans le tableau 'json' */
           return articleChoisi
           
        }
        else{
            return json
        }
    } catch (error) {
        console.log(error);
        return []; /* NB: on retournne un tableau vide */
    }
}


/*||||||||||||||||||| Fin----RECUPERATION DE L'ARTICLE CLIQUE DANS L'API ||||||||||||||||||||||||*/



/*||||||||||||||||||||| Début----AFFICHAGE DE L'ARTICLE AU CLIQUE ||||||||||||||||||||||||*/

function creerStructureArticle(articleChoisi){
    return `

    <div class="card  col-md-6">
        <img src="${articleChoisi.imageUrl}" class="img-card" >

        <div class="div-article-titre-prix">
            <h4 class="Bold text">${articleChoisi.name}</h4>
            <span class="lead">Prix : ${articleChoisi.price / 100}.00 €</span>
        </div>

        <figcaption class="description">${articleChoisi.description}</figcaption>

        <div class="div-slect-btn">

            <form class="div-select" id "form-perso-article">
                <label class="titre-label" for="">Vernisage</label>
                <select class="champ-selection champ-selection-modif-1" id="monselect">
                   
                </select>
            </form>

            <a href="/P5_front-end/html/panier.html"><button type="submit"class="btn btn-secondary btn-modif-1 btn-acheter">Ajouter au panier</button></a>
                
        </div>
    </div>

`
}

// Injection de la structure HTML de l'article sélectionné dans le HTLM
const conteneurArticleSelectionner = document.getElementById("container-article");
// conteneurArticleSelectionner.innerHTML = structureArticleSelectionner;

// NB: la fonction getDataArticleCliquer() est asynchrone et renvoie une promesse, on peut donc utiliser '.then' dessus afin de ne pas bloquer le déroulement du programme
// NB: console.log(getDataArticleCliquer(recupIdArticle)) permet de voir que c'est bien une promesse et de voir son état (pending/fulfilled)
recupDataArticleDansAPI(recupIdArticle).then(article => {
    // Affcihe la structure de l'article sélectionné 
    conteneurArticleSelectionner.innerHTML = creerStructureArticle(article)

    /*---------------------PSEUDO CODE option de vernisage-----------------*/ 
    // D'abord récupérer tous les tableaux de vernis dans l'API en se servant des données du Fetch 
    const tableauVernis = recupDataArticleDansAPI().varnish;
    console.log(tableauVernis);

    // Ensuite, récupérer les options de vernissage de chaque article selon le contenu de son tableau
    for(let j= 0; j < tableauVernis.length; j++){
    const verniChoisi = verniChoisi +`
        <option value="${tableauVernis[j]}"selected>${tableauVernis[j]}</option>
    ` ;
    }
    // En fin, afficher dans la carte article ses options de vernisage
    const vernisArticle = document.getElementById("monselect");

    let verniChoisi = [];
    vernisArticle.innerHTML = verniChoisi;
})

/*|||||||||||||||||||||||| Fin----AFFICHAGE DE L'ARTICLE AU CLIQUE |||||||||||||||||||||||||||||*/






/*||||||||| Début----PERSONNALISATION DE L'ARTICLE SELECTIONNE et GESTION DU PANIER ||||||||||*/

// Ciblage du bouton d'ajout dans le panier depuis le DOM
const btnAcheter = document.querySelector(".btn-acheter"); 

// Envoie de l'article au panier après un clique sur le bouton 
btnAcheter.addEventListener("click", (event) => {
    
    event.preventDefault();
    
    // Mettre le choix de l'utilisateur dans une variable 
    const articlePersonnaliser = vernisArticle.value;

    //  Récupérer les données de l'article customisé 
    let articleVernisChoisi = {
        id:articleChoisi._id,
        imageUrl: articleChoisi.imageUrl,
        name: articleChoisi.name,
        price: articleChoisi.price / 100,
        varnish: articleChoisi.articlePersonnaliser,
    };

    /*--------STOCKAGE DE L'ARTICLE CUSTOMISÉ DANS LE LOCAL STORAGE-------------*/ 

    // Déclaration de la variable "produitEnregistrerDansLeLocalStorage" dans laquelle on met les clé et les vlauers dans le local STORAGE
    let produitEnregistrerDansLeLocalStorage = JSON.parse(localStorage.getItem("produit")); /*La méthode JSON.parse sert à convertir les données du local storage qui sont au format JSON en objet JavaScript*/

    // Fonction pop up pour confirmer ou non la commande de l'article
    const popupConfirmation = () =>{
        if(window.confirm(`${articleChoisi._id}" option : ${articleChoisi.articlePersonnaliser} a bien été ajouté au panier
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
