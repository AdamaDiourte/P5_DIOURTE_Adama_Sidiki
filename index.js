/*||||||||||||| Début----FONCTION GLOBALE AFFICHAGE PAGE ACCUEIL ||||||||||||||||||||*/ 

(async function main(){

    const articles = await recupArticleDansAPI()  /*Les articles récupérés dans l'API sont stockés dans la constate "articles*/  
    
    for( article of articles){
        affichageArticle(article)           /*Une boucle "for" qui affiche chaque "article" contenu dans la "const articles" */
        
    }
})()

/*||||||||||||| Fin----FONCTION GLOBALE AFFICHAGE PAGE ACCUEIL ||||||||||||||||||||*/  






/*||||||||||||| Début----FONCTION RECUPERATION ARTICLES DANS API ||||||||||||||||||||*/  

async function recupArticleDansAPI(){
    return fetch("http://localhost:3000/api/furniture") /*Depuis ce lien, la fonction "fetch" récupère les articles*/
        .then (function(dataAPI){
            return dataAPI.json()     /*Fonction qui stock et convertit ensuite en JSON le fichier récupéré depuis l'API*/
        })

        .then (function(articles){    /*Fonction qui permet de renommer les fichiers récupérés et les retournes partout où ils sont appelés*/
            return articles
        }) 

        .catch (function(error){      /*Fonction qui affiche le message signalant un problème de téléchargement*/
            alert("Une erreur est survenue lors du chargement des fichiers depuis l'API")
        })
}

/*||||||||||||| Fin----FONCTION RECUPERATION ARTICLES DANS API ||||||||||||||||||||*/  





/*||||||||||||| Début----FONCTION AFFICHAGE ARTICLES RECUPERES DANS API ||||||||||||||*/ 

function affichageArticle(article){

    // Structure HTML pour l'affichage des articles
    document.querySelector(".div-card").innerHTML +=`
    
        <div class="card col-md-5">

            <img class="img-card" src ="${article.imageUrl}">

            <div class="div-article-titre-prix">
                <h4 class="titre-article"> ${article.name}</h4>
                <span class="lead">Prix: ${article.price / 100}.00 € </span>
            </div>

            <a href="/P5_front-end/html/article.html?id=${article._id}"><button class="btn btn-secondary btn-modif-1">Voir plus</button></a>

        </div>
    `;
   
}
/*||||||||||||| FIN----FONCTION AFFICHAGE ARTICLES RECUPERES DANS API ||||||||||||||*/ 