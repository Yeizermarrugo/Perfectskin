const router = require('express').Router()
const roleAdminMiddleware = require('../middleware/admin.role')
// const {roleAdminMiddleware} = require('../middleware/role.middleware')
const userService = require('./user.http')
const passportJwt = require('../middleware/auth.middleware')

//* /api/v1/perfectskin/users/
router.get('/',[passportJwt, roleAdminMiddleware], userService.getAll)
// router.post('/', userService.register)

//? /api/v1/users/me
router.get('/me', passportJwt, userService.getMyUserById)
router.patch('/me', passportJwt, userService.editMyuser)
router.delete('/me', passportJwt, userService.removeMyUser)


router.get('/:id', userService.getById)
router.patch('/:id',[passportJwt, roleAdminMiddleware], userService.edit)
router.delete('/:id',[passportJwt, roleAdminMiddleware], userService.remove)



module.exports = {router}
