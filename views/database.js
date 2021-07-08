//  require un module qui nous permet de nous connecter à notre BDD
// ce module c'est : pg
const {Client} = require('pg');

// le connecter avec les infos du .env
const client = new Client();

// executer la connexion
client.connect();

// exporter pour qu'il soit dispo partout
module.exports = client;