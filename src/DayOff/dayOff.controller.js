const uuid = require('uuid');
const DayOff = require('../models/dayOff.models');
const Users = require('../models/user.model');
const response = require('../utils/handleResponses')

const getAllFechas = async () =>{
    const data = await DayOff.findAll({
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

const getFecha = async (fecha) =>{
    const data = await DayOff.findOne({
        where: {fecha: fecha,
        },attributes: {
            exclude: ["createdAt", "updatedAt", "usuarioId", "userId"]
        }
    })
    return data
}

const createFecha = async(data, userId) =>{
    const existeFecha = await DayOff.findOne({
        where: {fecha: data.fecha} || null
    })
    if(existeFecha !== null){
        return response.error({
            success: false,
            message: 'Fecha ya seleccionada'
        })
    }
    const newFecha = await DayOff.create({
        id: uuid.v4(),
        fecha: data.fecha,
        userId: userId
    })
    return newFecha
}

const deleteFecha = async (fecha) => {
    const data = await DayOff.destroy({
        where: {
            fecha: fecha
        }
    })
    return data
}

module.exports = {
    getAllFechas,
    getFecha,
    createFecha,
    deleteFecha
}