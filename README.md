# Présentation
Projet de fin de formation réalisé par Mickaël Mesloub afin de passer le titre RNCP37273 - Développeur web full stack. Centre de formation : 3W Academy Angers, promotion ANJS01. 

Il s'agit d'un site web sur le thème du dogsitting codé en JavaScript, avec un backend en Node, une base de donnée NoSQL avec MongoDB, un frontend en React, et du SCSS pour les styles.

## Démarrage du projet
Suivre les étapes suivantes :
    - créer un fichier `.env` dans le dossier /client à remplir avec vos informations en s'inpirant des informations présentes dans le fichier `.env.sample`
    
    - faire de même dans le dossier /backend
    
    - installer les dépendances avec la commande `npm i` ou `npm install` dans le dossier /client et dans le dossier /backend
    
    > Si vous utilisez l'IDE de la 3WA :
    
    - dans le dossier /client, aller dans le fichier `package.json` et ajouter `PORT=9993` (ou un autre port entre 9000 et 9999 si une erreur de port se produit) devant `react-scripts start` dans la propriété `start` de l'objet `scripts`. 
    
    / Exemple : 
       > Le rendu doit être comme suit : 
        "scripts": {
            "start": "PORT=9993 react-scripts start",
            "build": "react-scripts build",
            "test": "react-scripts test",
            "eject": "react-scripts eject"
        },
      
     /
     
     > Si vous utilisez un autre IDE :

    - il se peut que lorsque vous avez téléchargé le projet, le port pour démarrer le serveur /client ait été prédéfini dans le `package.json` du dossier /client (voir l'exemple expliqué dans la partie `Si vous utilisez l'IDE de la 3WA` ci-dessus). Si tel est le cas, veillez à effacer l'information `PORT=XXXX`. 
    
    - ouvrir un terminal pour chaque serveur et entrer la commande `npm start` pour démarrer les serveurs.
    
    - une fois les serveurs lancés, vous pouvez commencer à utiliser le site en vous rendant sur `http://localhost:3000/`.
    
    - Et voilà ! Vous devriez avoir accès au site `Rubieland` ! Bonne visite !
    





    