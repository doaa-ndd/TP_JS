# Gestion des commandes

Petite application web de débutant pour afficher des commandes en reliant des fichiers JSON.

## Organisation

- `index.html` : la page de l'application.
- `css/style.css` : quelques règles de présentation.
- `data/` : les clients, les produits et les commandes.
- `js/state.js` : les données utilisées par l'application.
- `js/dataService.js` : le chargement des fichiers JSON avec 'fetch'.
- `js/selectors.js` : les recherches, les relations et les calculs.
- `js/view.js` : l'affichage dans la page.
- `js/app.js` : le démarrage et les événements.

## Fonctionnalités

- Afficher quatre indicateurs calculés.
- Rechercher une commande par nom de client.
- Filtrer les commandes par statut et catégorie de produit.
- Afficher le détail et le total d'une commande.
- Afficher un message si le chargement des données échoue.
