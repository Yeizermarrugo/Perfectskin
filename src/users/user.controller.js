const uuid = require('uuid');
const { hashPassword } = require('../utils/crypt');

const Users = require('../models/user.model');

// const userDB = [
//     {
//         "id": "cf06fcf2-b1a1-4545-984a-19daf54e6f51",
//         "nombre": "Yeizer",
//         "apellido": "Marrugo",
//         "email": "yeizermarrugo@gmail.com",
//         "password": "1234",
//         "telefono": "3002385126",
//         "role": "admin"
//     }
// ]

const getAllUsers = async () =>{
    const data = await Users.findAll({
    attributes: {
        exclude: ["password","createdAt", "updatedAt"]
    }})
    return data
    //? Select * from users;
}

const getUserById = async (id) =>{
    const data = await Users.findOne({
        where: {id: id},
        attributes: {exclude: ["password"]}
    })
    return data
    //? select * from users where id = ${id};
}

const createUser = async(data) =>{
    const newUser = await Users.create({
        id: uuid.v4(),
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        password: hashPassword(data.password),
        telefono: data.telefono,
        roleId: '5660e2cd-3335-4398-b3d9-48f9765bbfb6'
    })
    return newUser
}

const editUser = async (userId, data, userRole) => {
    const {id, password, roleId, ...restOfProperties} = data
    if ('6288423f-4596-41db-9d22-e93639025e61' === data.roleId){
        const response = await Users.update(
            {...restOfProperties, roleId},
            {where: {id: userId}}
        )
        return response
    }else{
        const response = await Users.update(restOfProperties, {where: {id: userId}})
        return response
    }
}

const deleteUser = async (id) =>{
    const data = await Users.destroy({
        where: {
            id: id
        }
    })
    return data
}

const getUserByEmail = async (email) =>{
    const data = await Users.findOne({
        where: {
            email: email
        }
    })
    return data
    //? select * from users where email = ${email};
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    editUser,
    deleteUser
}