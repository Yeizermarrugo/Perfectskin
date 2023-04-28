const uuid = require('uuid');
const Servicios = require('../models/servicios.models');
const Users = require('../models/user.model');

const getAllServices = async () =>{
    const data = await Servicios.findAll({
        include: [{
            model: Users,
            attributes: {
                exclude: ["password", "createdAt", "updatedAt", "roleId", "telefono" ]
            }
        }
    ],
        attributes: {
            exclude: ["createdAt", "updatedAt", "usuarioId", "userId"]
        }})
    return data
}

const getServiceById = async (id) =>{
    const data = await Servicios.findOne({
        where: {id: id,
        },attributes: {
            exclude: ["createdAt", "updatedAt", "usuarioId", "userId"]
        }
    })
    return data
}

const createService = async(data, userId) =>{
    const newService = await Servicios.create({
        id: uuid.v4(),
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        userId: userId
    })
    return newService
}

const editService = async (id, data) => {
    const response = await Servicios.update(data,{
        where: {id: id}
    })
    return response
}

const deleteService = async (id) => {
    const data = await Servicios.destroy({
        where: {
            id: id
        }
    })
    return data
}

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    editService,
    deleteService
}