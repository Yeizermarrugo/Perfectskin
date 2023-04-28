const jwt = require('jsonwebtoken');
const { loginUser } = require('./auth.controlle');
const responses = require('../utils/handleResponses')
const config = require('../../config').api
const User = require('../models/user.model');
const { createUser } = require('../users/user.controller')


const login = (req, res) => {
    const { email, password } = req.body
    loginUser(email, password)
        .then(data => {
            if (data) {

                const token = jwt.sign({
                    id: data.id,
                    email: data.email,
                    password: data.password
                }, config.secretOrKey, {
                    expiresIn: '1d'
                })

                responses.success({
                    res,
                    status: 200,
                    message: 'Correct Credentials!',
                    data: token
                })
            } else {
                responses.error({
                    res,
                    status: 401,
                    message: 'Invalid Credentials'
                })
            }
        })
        .catch(err => {
            responses.error({
                res,
                status: 400,
                data: err,
                message: 'Something Bad'
            })
        })
}

const signUp = async (req, res) => {
    // Obtener la data del usuario a registrar
    const data = req.body;

    // Verificar que el usuario no exista
    const user = await User.findOne({ where: { email: data.email } }) || null;

    if (user !== null) {
        return res.json({
            success: false,
            message: 'Usuario ya existe'
        });
    }

    // Crear un nuevo usuario
    createUser(data)
        .then(data => {
            responses.success({
                status: 201,
                data,
                message: `User created succesfully with id: ${data.id}`,
                res
            })
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: 'Error ocurred trying to create a new user',
                res,
                fields: {
                    nombre: 'String',
                    apellido: 'String',
                    email: 'example@example.com',
                    password: 'String',
                    telefono: '+52 1234 123 123'
                }
            })
        })
}


module.exports = {
    login,
    signUp
}