const Recipe = require('./recipe.model')
const { setError } = require('../../utils/error/error')
const { deleteFile } = require('../../middlewares/deleteFile')


const postNewRecipe = async (req, res, next) => {
    try {
        const newRecipe = new Recipe()
        newRecipe.name = req.body.name
        newRecipe.nation = req.body.nation
        newRecipe.description = req.body.description
        newRecipe.kcal = req.body.kcal
        newRecipe.ingredients = req.body.ingredients

        if (req.file) {
            newRecipe.img = req.file.path
        }
        const recipeDB = await newRecipe.save()
        return res.status(201).json(recipeDB)
    } catch (error) {
        return next(setError(500, 'Recipe not saved'))
    }
}

const getAllRecipes = async (req, res, next) => {
    try {
        const recipesDB = await Recipe.find().populate('ingredients')
        res.status(200).json(recipesDB)
    } catch (error) {
        return next(setError(500, 'Recipe failed server'))
    }
}

const getRecipe = async (req, res, next) => {
    try {
        const { id } = req.params
        const recipeDB = await Recipe.findById(id).populate('ingredients')
        if (!recipeDB) {
            return next(setError(404, 'Recipe not found'))
        }
        return res.status(200).json(recipeDB)
    } catch (error) {
        return next(setError(500, 'Recipe server error'))
    }
}

const getRecipeByNation = async (req, res, next) => {
    const { nation } = req.params
    try {
        console.log(nation);
        const recipeDB = await Recipe.find({
            nation
        })
        if (!recipeDB) {
            return next(setError(404, ` ${nation} not found`))
        }
        return res.status(200).json(recipeDB)
    } catch (error) {
        return next(setError(500, 'Recipes server error'))
    }
}

const patchRecipe = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchRecipe = new Recipe(req.body)
        patchRecipe._id = id
        if (req.file) {
            patchRecipe.img = req.file.path
        }
        const recipeDB = await Recipe.findByIdAndUpdate(id, patchRecipe)
        if (!recipeDB) {
            return next(setError(404, 'Recipe not found'))
        }
        if (recipeDB.img) deleteFile(recipeDB.img)
        return res.status(200).json({ new: patchRecipe, old: recipeDB })
    } catch (error) {
        return next(setError(500, 'Recipe Patch server error'))
    }
}

const deleteRecipe = async (req, res, next) => {
    try {
        const { id } = req.params
        const recipeDB = await Recipe.findByIdAndDelete(id)
        if (!recipeDB) {
            return next(setError(404, 'Recipe not found'))
        }
        if (recipeDB.img) deleteFile(recipeDB.img)
        return res.status(200).json(recipeDB)
    } catch (error) {
        return next(setError(500, 'Recipe removed server error'))
    }
}

module.exports = {
    postNewRecipe,
    getAllRecipes,
    getRecipe,
    getRecipeByNation,
    patchRecipe,
    deleteRecipe
}
