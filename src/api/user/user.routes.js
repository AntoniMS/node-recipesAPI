const UserRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const { postNewUser, loginUser, logoutUser, getUser, addFavorite } = require('./user.controller')

UserRoutes.post('/register', postNewUser)
UserRoutes.post('/login', loginUser)
UserRoutes.post('/logout', [isAuth], logoutUser)
UserRoutes.get('/:id', [isAuth], getUser)
UserRoutes.patch('/addFavorite/:id',[isAuth], addFavorite)


module.exports = UserRoutes