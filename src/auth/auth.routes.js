const router = require('express').Router()
const authService = require('./auth.http')


router.post('/login', authService.login)
router.post('/register', authService.signUp)


module.exports = {router}