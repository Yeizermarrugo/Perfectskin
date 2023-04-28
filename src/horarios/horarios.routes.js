const router = require('express').Router()
const horario = require('./horarios.http')
const passportJwt = require('../middleware/auth.middleware')
const roleAdminMiddleware = require('../middleware/admin.role')

router.get('/', horario.getAll)
router.post('/', [passportJwt, roleAdminMiddleware], horario.register)

router.get('/:id', horario.getById)
router.patch('/:id',[passportJwt, roleAdminMiddleware], horario.edit)
router.delete('/:id',[passportJwt, roleAdminMiddleware], horario.remove)

module.exports = {router}