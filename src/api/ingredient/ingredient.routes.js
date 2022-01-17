const IngredientRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { postNewIngredient, getAllIngredients, getIngredient, getIngredientByName,getIngredientByFood, patchIngredient, deleteIngredient } = require('./ingredient.controller')


IngredientRoutes.get('/', getAllIngredients)
IngredientRoutes.get('/:id', getIngredient)
IngredientRoutes.get('/name/:name', getIngredientByName)
IngredientRoutes.get('/food/:food', getIngredientByFood)
IngredientRoutes.post('/', [isAuth], upload.single('img'), postNewIngredient)
IngredientRoutes.patch('/:id', [isAuth], upload.single('img'), patchIngredient)

//UNAVIABLE FOR USERS
//IngredientRoutes.delete('/:id', [isAuth], upload.single('img'), deleteIngredient)  

module.exports = IngredientRoutes