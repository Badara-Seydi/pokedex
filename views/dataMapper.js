const database = require('./database');

const dataMapper = {
    getAllPokemon: (john) => {
        const getAllPokeQuery = {
            text: 'SELECT * FROM "pokemon";'
        };

        // la méthode query accepte 2 paramètres :
        //    - la requête SQL, celle que j'ai écrit et que je veux envoyer à la base de donneés. Ici elle s'appelle : getAllPokeQuery
        //    - une callback = une fonction qui attend une action pour être executée. Dans notre cas, l'action attendue avant d'executer cette fonction c'est : on attends que la base de donnée ait répondu à notre requête ! 
        // la callback on ne n'écrit pas ici, on sépare bien les concepts donc on  l'écrit dans le mainController. Ici appelons-là "Jonh"
        database.query(getAllPokeQuery, john);
    },

    getPokemonDetails : (id ,callback) => {
        const getPokeDetails = {
            text : 'select id, nom,pv,attaque,defense,attaque_spe,defense_spe,vitesse,numero from pokemon where id=$1', // faire des join afin d'avoir les 2 types de pokemon
            values : [id] //je précise que la valeur est l'id
        };
        database.query(getPokeDetails, callback);
    },

    getAllTypeOfPokemon : (callback)=>{
        const tousLesTypes = {
            text : 'select * from type',
        };
        database.query (tousLesTypes , callback);
    },
    // id  | old_id |    nom     | pv  | attaque | defense | attaque_spe | defense_spe | vitesse | numero POKEMON
    // id  | old_id | pokemon_numero | type_id POKEMON TYPE
    // id | old_id |   name   | color  TYPE


    // select pokemon.id, pokemon.numero, pokemon.pv, pokemon.attaque, pokemon.defense,pokemon.attaque_spe,pokemon.defense_spe,pokemon.vitesse,pokemon.numero from "pokemon" JOIN 


    searchPokemon : (letters , callback) =>{
        const lettersForPokemon = {
            text: `SELECT * FROM pokemon where nom ILIKE $1;`,
            values: [`%${letters}%`]
           };
        database.query (lettersForPokemon, callback);
    },
    
    getTypeOfPokemon : (id,callback) => {
        const getByElement= {
            text : ' SELECT * FROM type WHERE id=$1;',
            values : [id],
        } ;
        database.query (getByElement,callback);
    },

    getAllPokemonByType : (type_id,callback) => {
        const getAllByElement= {
            text : 'SELECT pokemon.id, pokemon.nom, pokemon.numero,type.color,type.name FROM "pokemon" JOIN "pokemon_type" ON pokemon.numero = pokemon_type.pokemon_numero JOIN "type" ON type.id = pokemon_type.type_id WHERE type_id=$1;',
            values : [type_id],
        } ;
        database.query (getAllByElement,callback);
    }
};

module.exports = dataMapper;

