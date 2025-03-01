const router = require('express').Router()
const { userController, authController, pokemonController } = require('../api/controllers')
const { tokenValidation } = authController;
// Home

router.post('/createUser', userController.createUser)
router.post('/login', authController.logIn)
// router.post('/logout',tokenValidation, authController.logOut)

router.get("/pokemon/all", pokemonController.getAllPokemons);
router.get("/pokemon/name/:name",tokenValidation, pokemonController.getPokemonByName);
router.get("/pokemon/id/:id", tokenValidation, pokemonController.getPokemonById);


module.exports = router
