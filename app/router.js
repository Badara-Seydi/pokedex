const express = require('express');
const router = express.Router();
const mainController = require('../controller/mainController');

router.get ('/' , mainController.homePage );
router.post('/' , mainController.searchPokemon );
router.get('/pokemon/:id' , mainController.detailsPokemon);
 router.get ('/alltypes' , mainController.getAllTypeOfPokemon);
router.get ('/types/:id', mainController.getAllPokemonByType);


module.exports=router;