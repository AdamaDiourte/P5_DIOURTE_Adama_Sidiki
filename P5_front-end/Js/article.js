/*|||||||||||||||||| Début----RECUPERATION DE L'ID ARTICLES DANS L'URL ||||||||||||||||*/

let params = (new URL(document.location)).searchParams;
let recupIdArticle = params.get('id'); // Récupère la valeur correspondante à l'ID

/*|||||||||||||||||||| Fin----RECUPERATION DE L'ID ARTICLES DANS L'URL ||||||||||||||||||*/


/*||||||||||||| Début----RECUPERATION DE L'ARTICLE DEPUIS L'API AU CLIQUE DU BOUTON VOIR PLUS ||||||||||||*/

/* Fonction qui récupère tous les articles de l'API et filtre  celui qui a été cliqué par l'utilisateur*/
async function getDataArticle(id = null) { /* NB: id est nulle par défaut, c'est à dire dans le cas où elle n'est pas indiquée dans les parametres à l'appel de getDataArticle() */
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
        return []; /* Retournne un tableau vide */
    }
}

/*|||||||||||||| Fin----RECUPERATION DE L'ARTICLE DEPUIS L'API AU CLIQUE DU BOUTON VOIR PLUS ||||||||||||||||*/



/*||||||||||||||||||||| Début----AFFICHAGE DE L'ARTICLE AU CLIQUE ||||||||||||||||||||||||*/

function htmlArticle(articleChoisi){
    return `
    <div class="card  col-md-6">
        <img src="${articleChoisi.imageUrl}" class="img-card"alt="image de l'article" >

        <div class="div-article-titre-prix">
            <h4 class="Bold text">${articleChoisi.name}</h4>
            <span class="lead">Prix : ${articleChoisi.price / 100}.00 €</span>
        </div>

        <figcaption class="description">${articleChoisi.description}</figcaption>
        <div class="div-slect-btn">
            <form class="div-select" id "form-perso-article">
                <label class="titre-label" for="" aria-label="vernissage">Vernisage</label>
                <select onchange="optionDeVernis(this.value)" class="champ-selection champ-selection-modif-1" id="monselect" aria-label="vernis choisi"></select>
            </form>
            <button type="button" onclick='ajouterAuPanier(${JSON.stringify(articleChoisi)})' class="btn btn-secondary btn-modif-1" >Ajouter au panier</button>
        </div>
    </div>
`
}

// Injection de la structure HTML de l'article sélectionné dans le HTLM
const templateHtmlArticle = document.getElementById("container-article");

// Fonction qui stock le vernis choisi par le l'utilsateur
let verniSelect = null;
function optionDeVernis (value){
    verniSelect = value;
}

// Fonction asynchrone qui récupère les données du fecth pour afficher l'artcile sélectionné et les options de vernissage
getDataArticle(recupIdArticle).then(article => {
    // Affcihe la structure de l'article sélectionné 
    templateHtmlArticle.innerHTML = htmlArticle(article)

    // Récupérer le tableau de vernis de l'article cliqué depuis l'API en se servant des données du Fetch 
    const tableauVernis = article.varnish;
    
    // Envoyer les options de vernissage dans le champ de sélection de la carte article
    let listeVernis = "";
    verniSelect = tableauVernis[0];
    for(let j = 0; j < tableauVernis.length; j++){
        
        listeVernis +=`
            <option value="${tableauVernis[j]}" ${j === 0 ? "selected" : ""}>${tableauVernis[j]}</option>
        ` ;
        // Mettre le tableau de vernis dans la balise select
        const selectBalise = document.getElementById("monselect");
        selectBalise.innerHTML = listeVernis;
    }
})

/*|||||||||||||||||||||||| Fin----AFFICHAGE DE L'ARTICLE AU CLIQUE |||||||||||||||||||||||||||||*/




/*||||||||| Début----PERSONNALISATION DE L'ARTICLE SELECTIONNE et GESTION DU PANIER ||||||||||*/

// Fonction qui récupère les données de l'article personnalisé puis envoie ces données dans le local storage
function ajouterAuPanier(articleChoisi){
    //  Récupérer les données de l'article customisé 
    let cutomArticle = {
        id:articleChoisi._id,
        imageUrl: articleChoisi.imageUrl,
        name: articleChoisi.name,
        price: articleChoisi.price / 100,
        varnish: verniSelect,
    };

    // Déclaration de la variable "articleLocalStrg" dans laquelle on met les clés et les valeurs dans le local STORAGE
    let articleLocalStrg = JSON.parse(localStorage.getItem("produit")); /*La méthode JSON.parse sert à faire passer les données du local storage du JSON en objet JavaScript*/

    // Cette fonction pop up sert à confirmer ou non la commande de l'article
    const popUpConfirmation = () =>{
        if(window.confirm(`${articleChoisi.name} au vernissage : ${verniSelect} a bien été ajouté au panier.
Cliquez sur OK pour voir le panier ou sur ANNULER pour continuer vos achats`)){
            window.location.href = "/P5_front-end/html/panier.html"
        }
        else{
            window.location.href = "index.html"
        }
    }

    // Fonction d'ajout de produit dans le local storage 
    const ajouterArticleLocalStrg = () =>{
        articleLocalStrg.push(cutomArticle); /*Envoi l'article choisi dans le tableau vide*/
        localStorage.setItem("produit", JSON.stringify(articleLocalStrg)); /*Création de la clé "produit" dans le local storage*/
    }

    // S'il y a des produits enregistrés dans le local storage
    if (articleLocalStrg){
       ajouterArticleLocalStrg();

    } 

    // S'il n'y a pas de produits enregistrés dans le local storage
    else{
        articleLocalStrg = [];
        ajouterArticleLocalStrg();
    }

    popUpConfirmation();
    
}

/*|||||||||||| Fin----PERSONNALISATION DE L'ARTICLE SELECTIONNE et GESTION DU PANIER |||||||||*/
