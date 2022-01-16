const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        source: { type: String, required: true, trim: true },
        food: { type: String, required: true, trim: true },
        gluten: { type: Boolean, required: true, trim: true },
        img: { type: String, trim: true }
    },
    {
        timestamp: true, collection: "ingredients"
    }
);

const Ingredient = mongoose.model('ingredients', ingredientSchema)
module.exports = Ingredient