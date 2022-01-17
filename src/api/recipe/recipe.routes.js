const RecipeRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { postNewRecipe, getAllRecipes, getRecipe, patchRecipe, deleteRecipe, getRecipeByNation } = require('./recipe.controller')


RecipeRoutes.get('/', getAllRecipes)
RecipeRoutes.get('/:id', getRecipe)
RecipeRoutes.get('/nation/:nation', getRecipeByNation)
RecipeRoutes.post('/', [isAuth], upload.single('img'), postNewRecipe)
RecipeRoutes.patch('/:id', [isAuth], upload.single('img'), patchRecipe)

//UNAVIABLE FOR USERS
//RecipeRoutes.delete('/:id', [isAuth], upload.single('img'), deleteRecipe)

module.exports = RecipeRoutes