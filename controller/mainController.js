

const dataMapper = require('../views/dataMapper');

const mainController = {
    homePage: (request, response) => {
        console.log('on est bien dans : mainController homePage');
        // on veut afficher à l'écran la liste des pokémons 
        
        const john = (error, result) => {
            // fais des trucs une fois que tu as récuếré la réponse de la BDD
            if (error) {
                response.status(500).send(error);
                // on pourrait faire mieux en terme de gestion d'erreur, maison va se contenter de ça aujourd'hui :) 
            } else {
                // si j'arrive ici c'est que je sure qu'il n'y a pas d'erreur et que l'a BDD à bien réussis à faire ce que je lui ai demandé
                // console.log('Voila tous les pokémons :', result.rows);
                // on accède à la propriété rows de l'objet result. Rows est un tableau (et sera toujours un tableau !) qui contient la liste des pokémons dans notre cas = la réponse de la BDD à notre requête

                // On veut mtn afficher cette liste dans une vue, dans notre page d'accueil
                response.render('list', {
                    pokemonList: result.rows
                });
            }
        };

        dataMapper.getAllPokemon(john);
    },

    detailsPokemon : (request , response)=>{
        console.log('on est dans le mainController detailsPokemon');

        const callback = (error , results) =>{
            if (error) {
                response.status(500).send(error);
            }else {
                console.log('Voici le détail du Pokemon' , results.rows[0]);

                response.render ('details', {detailPokemon : results.rows[0]});
            }
        };


        dataMapper.getPokemonDetails(Number(request.params.id),callback); //mettre le req.params.id en number pour le retrouver ds la bdd
    },

    searchPokemon : (request , response)=>{
        console.log('on est dans le mainController searchPokemon');

        const lettersIn = request.body.search

        const callback = (error , results) =>{
            if (error) {
                console.log(error);
                response.status(500).send(error);
            }else {
                console.log(lettersIn) ;
                response.render('list',{pokemonList : results.rows});
            }
        };

        dataMapper.searchPokemon(lettersIn,callback);
    },
    getAllTypeOfPokemon : (request , response) => {
        console.log('nous sommes dans le get all type of pokemon ');

        const callback = (error , results)=> {
            if (error){
                console.log ('il y a une erreur '+ Error);        
            }else  {
                console.log("c'est bon déjà ! ") 
                console.log (results.rows)
                response.render ('allTypes' , {typePokemon : results.rows}) 
            }
        };
        dataMapper.getAllTypeOfPokemon(callback);
    },

    typeOfPokemon : (request , response)=>{
        console.log ('nous voila dans le typeOfPokemon') ;

        const callback = (error, results) => {
            if (error){
                console.log ('il y a une erreur '+ Error);       
            }else  {
                console.log("c'est bon déjà ! ")

                response.render ('types', {OneTypePokemon : results.rows});
                console.log(results.rows)
            }
        };

        dataMapper.getTypeOfPokemon(Number(request.params.id),callback);
    },

    getAllPokemonByType : (request , response)=>{
        console.log ('nous voila dans le getAllPokemonByType') ;

        const callback = (error, results) => {
            if (error){
                console.log ('il y a une erreur '+ error);       
            }else  {
                // const type = +req.params.id;
                console.log("c'est bon déjà ! ");
                
                console.log(results.rows)
                response.render ('list',
                 {pokemonList : results.rows});
                
                
            }
        };
            dataMapper.getAllPokemonByType(Number(request.params.id),callback);
    },

};

module.exports = mainController;