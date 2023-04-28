const router = require('express').Router()
const dayOff = require('./dayOff.http')
const passportJwt = require('../middleware/auth.middleware')
const roleAdminMiddleware = require('../middleware/admin.role')

router.get('/', dayOff.getAll)
router.post('/',[passportJwt, roleAdminMiddleware], dayOff.register)

router.get('/:fecha', dayOff.getByFecha)
router.delete('/:fecha',[passportJwt, roleAdminMiddleware], dayOff.remove)

module.exports = {router}