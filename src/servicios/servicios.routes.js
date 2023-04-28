const router = require('express').Router()
const service = require('./servicios.http')
const passportJwt = require('../middleware/auth.middleware')
const roleAdminMiddleware = require('../middleware/admin.role')

router.get('/', service.getAll)
router.post('/', [passportJwt, roleAdminMiddleware], service.register)


router.get('/:id', service.getById)
router.patch('/:id',[passportJwt, roleAdminMiddleware], service.edit)
router.delete('/:id',[passportJwt, roleAdminMiddleware], service.remove)

module.exports = {router}