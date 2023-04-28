const router = require('express').Router();
const citas = require('./citas.http')
const passportJwt = require('../middleware/auth.middleware');
const roleAdminMiddleware = require('../middleware/admin.role')

router.get('/', citas.getAll)
router.post('/',passportJwt, citas.register)

router.get('/me', passportJwt || roleAdminMiddleware, citas.getAllAppointmentsByUser)

router.get('/:id', passportJwt, citas.getById)
router.patch('/:id', passportJwt, citas.edit)
router.delete('/:id',[passportJwt || roleAdminMiddleware], citas.remove)

module.exports = {router}