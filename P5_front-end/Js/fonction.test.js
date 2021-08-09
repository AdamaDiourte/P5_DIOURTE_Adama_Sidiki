import{recupArticleDansAPI} from "./index.js";

/*||||||||||||||||||||||||| Fonctions Page d'accueil - index.js ||||||||||||||||*/ 

recupArticleDansAPI() /*Fonction fetch API de la page d'accueil*/
affichageArticle() /*Fonction d'affichage des articles sur la page d'accueil*/

/*|||||||||||||||||||||||||||||||||||FIN||||||||||||||||||||||||||||||||||||||||||||*/ 



/*||||||||||||||||||||||||| Fonctions Page d'article - article.js ||||||||||||||||||||||*/ 

getDataArticle() /*Fonction fetch API de la page d'article*/
ajouterAuPanier() /*Fonction d'ajout de l'article dans le panier*/

/*|||||||||||||||||||||||||||||||||||FIN||||||||||||||||||||||||||||||||||||||||||||*/



/*||||||||||||||||||||||||| Fonctions Page panier - panier.js ||||||||||||||||||||||*/ 

btnSupprim () /*Fonction suppression des produits enregistrés dans le panier*/
formulaireHtml() /*Fonction structure HTML du formulaire de commande dans le panier*/
synchroLocalStrgDataForm() /*Fonction synchronisation du formulaire et le local storage*/
envoiFormulaire() /*Fonction gestion du formulaire*/
envoiVersServer() /*Fonction d'envoi du formulaire vers le server*/

/*|||||||||||||||||||||||||||||||||||FIN||||||||||||||||||||||||||||||||||||||||||||*/



/*|||||||||||||||||||||| Fonctions Page commande - commande.js |||||||||||||||||*/

supprimerCleLoclastorage() /*Fonction suppression des clés dans le local storage*/

/*|||||||||||||||||||||||||||||||||||FIN||||||||||||||||||||||||||||||||||||||||||||*/