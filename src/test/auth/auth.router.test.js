const { describe, it, before } = require('mocha')
const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../../index')
const { createUser, deleteUser } = require('../../users/user.controller')

chai.use(chaiHttp)

before(() => {
    createUser()
})



describe('Testing de la ruta /api/v1/perfectskin/auth/login', () => {
    it('Deberia generar un error 401 al no mandarle credenciales', (done) => {
        chai.request(app)
            .post('/api/v1/perfectskin/auth/login')
            .end((err, res) => {
                chai.assert.equal(res.status, 401)
                done()
            })
    })

    it('Deberia generar un error 401 al mandarle credenciales incorrectas', (done) => {
        chai.request(app)
            .post('/api/v1/perfectskin/auth/login')
            .set("content-type", "application/json")
            .send({email: "marquito@gmail.com", password: 'root'})
            .end((err, res) => {
                chai.assert.equal(res.status, 401)
                done()
            })
    })

    it('Deberia generar un estatus 200 al mandar credenciales correctas', (done) => {
        chai.request(app)
            .post('/api/v1/perfectskin/auth/login')
            .set("content-type", "application/json")
            .send({email: "yeizermarrugo@gmail.com", password: 'ABC123'})
            .end((err, res) => {
                chai.assert.equal(res.status, 200)
                done()
            })
    })

})