const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { validationPassword } = require('../../utils/validators/validations')
const { setError } = require('../../utils/error/error')
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    emoji: { type: String, trim: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: "recipes" }]

}, { timestamps: true , collection: "users"})

userSchema.pre("save", function (next) {
    if (!validationPassword(this.password)) {
        return next(setError(400, 'Passwords should contain a minimum of 8 characters and maximum of 12, using a mix of uppercase and lowercase letters, numbers, and special characters.'))
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const User = mongoose.model('users', userSchema)
module.exports = User