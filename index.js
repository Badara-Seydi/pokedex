// ETAPE 4
// on require dotenv, le module qui nojus sert à gérer les varibales d'environnement (celle qui sont dans le .env)
// toujours tout en haut
require('dotenv').config();

// ETAPE 1 
// import du package express avec require
const express = require('express');

// ETAPE 2
// execution d'express (l'app est égal au retour de la fonction express)
const app = express();

// ETAPE 7 
// Les views
app.set('view engine', 'ejs');
app.set('views', 'views');

// ETAPE 8
// les fichiers statics :
app.use(express.static('public'));


app.use(express.urlencoded({ extended: true })); //obligatoire pour récupérer les infos du body.
// ETAPE 6
// le routeur !
const monRouteur = require('./app/router.js');
app.use(monRouteur);

// ETAPE 3
// définit le port à écouter
const PORT = process.env.PORT || 3000; // la notation || veut dire "OU", si le premier est undefined, alors on utilise le second
const BASE_URL = process.env.BASE_URL;



// ETAPE 5
// On va lancer notre server
// app.listen accepte 2 arguments :
//    - le port à écouter
//    - une fonction (un callback = une fonction qui attend une action avant de se lancer) ici l'action c'est que le serveur soit lancé
app.listen(PORT, () => {
    // les lignes de code suivantes attendent que le serveur soit lancé pour s'executer
    console.log(`App on ${BASE_URL}:${PORT}`);
});
