const Ingredient = require('./ingredient.model')
const { setError } = require('../../utils/error/error')
const { deleteFile } = require('../../middlewares/deleteFile')


const postNewIngredient = async (req, res, next) => {
    try {
        const newIngredient = new Ingredient()
        newIngredient.name = req.body.name
        newIngredient.source = req.body.source
        newIngredient.food = req.body.food
        newIngredient.gluten = req.body.gluten
        if (req.file) {
            newIngredient.img = req.file.path
        }
        const ingredientDB = await newIngredient.save()
        return res.status(201).json(ingredientDB)
    } catch (error) {
        return next(setError(500, 'Ingredient not saved'))
    }
}

const getAllIngredients = async (req, res, next) => {
    try {
        const ingredientsDB = await Ingredient.find()
        res.status(200).json(ingredientsDB)
    } catch (error) {
        return next(setError(500, 'Ingredient failed server'))
    }
}

const getIngredient = async (req, res, next) => {
    try {
        const { id } = req.params
        const ingredientDB = await Ingredient.findById(id)
        if (!ingredientDB) {
            return next(setError(404, 'Ingredient not found'))
        }
        return res.status(200).json(ingredientDB)
    } catch (error) {
        return next(setError(500, 'Ingredient server error'))
    }
}

const getIngredientByName = async (req, res, next) => {
    const { name } = req.params
    try {
        console.log(name);
        const ingredientDB = await Ingredient.find({
            name
        })//.populate('ingredients') 
        if (!ingredientDB) {
            return next(setError(404, ` ${name} not found`))
        }
        return res.status(200).json(ingredientDB)
    } catch (error) {
        return next(setError(500, 'Ingredients server error'))
    }
}

const getIngredientByFood = async (req, res, next) => {
    const { food } = req.params
    try {
        console.log(food);
        const ingredientDB = await Ingredient.find({
            food
        })//.populate('ingredients') 
        if (!ingredientDB) {
            return next(setError(404, ` ${food} not found`))
        }
        return res.status(200).json(ingredientDB)
    } catch (error) {
        return next(setError(500, 'Ingredients server error'))
    }
}

const patchIngredient = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchIngredient = new Ingredient(req.body)
        patchIngredient._id = id
        if (req.file) {
            patchIngredient.img = req.file.path
        }
        const ingredientDB = await Ingredient.findByIdAndUpdate(id, patchIngredient)
        if (!ingredientDB) {
            return next(setError(404, 'Ingredient not found'))
        }
        if (ingredientDB.img) deleteFile(ingredientDB.img)
        return res.status(200).json({ new: patchIngredient, old: ingredientDB })
    } catch (error) {
        return next(setError(500, 'Ingredient Patch server error'))
    }
}

const deleteIngredient = async (req, res, next) => {
    try {
        const { id } = req.params
        const ingredientDB = await Ingredient.findByIdAndDelete(id)
        if (!ingredientDB) {
            return next(setError(404, 'Ingredient not found'))
        }
        if (ingredientDB.img) deleteFile(ingredientDB.img)
        return res.status(200).json(ingredientDB)
    } catch (error) {
        return next(setError(500, 'Ingredient removed server error'))
    }
}

module.exports = {
    postNewIngredient,
    getIngredientByName,
    getIngredientByFood,
    getAllIngredients,
    getIngredient,
    patchIngredient,
    deleteIngredient
}
