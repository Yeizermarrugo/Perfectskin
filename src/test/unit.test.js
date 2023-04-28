const { assert } = require('chai');
const { it, describe } = require('mocha');

const { getAllUsers,getUserById,createUser,editUser,getUserByEmail } = require('../users/user.controller')



describe('Testing de creacion de usuario con contraseña encriptada', () => {
    it('Deberia retornar el nuevo usuario con la contraseña ABC123 encriptada', (done) => {
        getUserById('676479b0-d7d4-11ed-9335-9fc7efe1e922')
        .then(data => {
            assert.notEqual(data.password, 'ABC123')
            done()
        })
        .catch(done)
    })
})