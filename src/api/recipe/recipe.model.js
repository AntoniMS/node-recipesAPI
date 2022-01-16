const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name: { type: String, required: true, trim: true },
    nation: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    kcal: { type: Number, required: true, trim: true }, //kcal 100g
    img: { type: String, trim: true },
    ingredients: [{ type: Schema.Types.ObjectId, ref: "ingredients", required: true }]
}, { timestamp: true, collection: "recipes" }
)

const Recipe = mongoose.model('recipes', RecipeSchema)
module.exports = Recipe