API fetch fournit :
    Request, Headers, Response
    mixin Body = ensemble de méthodes pour gérer le corps de la requête et de la réponse

fetch() 
    premier argument obligatoire qui sera le chemin de la ressources que l'on souhaite récupérer
    deuxième argument facultatif qui contient la listes des options pour préciser la méthode d'envoi, les entêtes...


.then() = methode de promesse, contient la fonction qui sera exécutée si la promesse renvoyé est resolve. La fonction traite les données reçu.
.catch() = methode de promesse pour gérer le cas ou la promesse renvoyé est reject, la fonction sera executée.

https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data-fr