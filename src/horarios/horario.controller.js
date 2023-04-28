const uuid = require('uuid');
const Horarios = require('../models/horarios.models')
const Servicios = require('../models/servicios.models')

const getAllhorarios = async () => {
    const data = await Horarios.findAll({
        include: [{
            model: Servicios,
            attributes: {
                exclude: ["createdAt", "updatedAt", "userId", "usuarioId" ]
            }
        }],
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    })
    return data
}

const getHorarioById = async (id) => {
    const data = await Horarios.findOne({
        where: {id: id},
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    })
    return data
}

const createHorario = async(data) => {
    const newHorario = await Horarios.create({
        id: uuid.v4(),
        hora: data.hora,
        servicioId: data.servicio_id,
    })
    return newHorario
}

const editHorario = async(id, data) => {
    const response = await Horarios.update(data,{
        where: {id: id}
    })
    return response
}

const deleteHorario = async(id) => {
    const data = await Horarios.destroy({
        where: {id: id}
    })
    return data
}

module.exports= {
    getAllhorarios,
    getHorarioById,
    createHorario,
    editHorario,
    deleteHorario
}