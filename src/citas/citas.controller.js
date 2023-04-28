const uuid = require('uuid');
const Citas = require('../models/citas.models')
const Servicios = require('../models/servicios.models')
const Horarios = require('../models/horarios.models')
const Users = require('../models/user.model')
const DayOff = require('../models/dayOff.models')
const response = require('../utils/handleResponses')
const getAllCitas = async () => {
    const data = await Citas.findAll({
        include: [
            {
                model: Users,
                attributes: {
                    exclude: ['password', 'roleId', 'createdAt', 'updatedAt']
                }
            },
            {
                model: Servicios,
                attributes: {
                    exclude: ['userId', 'createdAt', 'updatedAt', 'usuarioId']
                }
            },
            {
                model: Horarios,
                attributes: {
                    exclude: ['servicioId', 'createdAt', 'updatedAt']
                }
            }
        ],
        attributes: {
            exclude: ['userId', 'serviceId', 'horarioId', 'isFinished', 'isCanceled', 'usuarioId', 'servicioId']
        }
    })
    return data
}

const getCitasById = async (id) => {
    const data = await Citas.findOne({
        where: {
            id: id,
        }, attributes: {
            exclude: ["createdAt", "updatedAt", "usuarioId"]
        }
    })
    return data
}

const getAllCitasByUser = async (userId) => {
    const data = await Citas.findAll({
        where: { userId },
        include: [
            {
                model: Users,
                attributes: {
                    exclude: ['password', 'roleId', 'createdAt', 'updatedAt']
                }
            },
            {
                model: Servicios,
                attributes: {
                    exclude: ['userId', 'createdAt', 'updatedAt', 'usuarioId']
                }
            },
            {
                model: Horarios,
                attributes: {
                    exclude: ['servicioId', 'createdAt', 'updatedAt']
                }
            }
        ],
        attributes: {
            exclude: ['userId', 'serviceId', 'horarioId', 'isFinished', 'isCanceled', 'usuarioId', 'servicioId']
        }
    })
    return data
}

const createCitas = async (data, userId,) => {
    const currentDate = new Date().toLocaleDateString("en-US", { timeZone: "America/Bogota" });
    const fecha = new Date(data.fecha);
    const minDate = new Date();

    console.log(currentDate);
    if (fecha < currentDate) {
        return {
            success: false
        };
    }

    if (fecha < minDate) {
        return {
            success: false,
            status: 400,
            message: 'La cita debe ser programada con al menos 1 día de anticipación'
        };
    }
    const existeFecha = await DayOff.findOne({
        where: { fecha: data.fecha }
    })
    if (existeFecha !== null) {
        return {
            success: false,
            status: 400,
            message: 'No se aceptan citas este dia, por favor seleccione otra fecha'
        }
    }
    const existeCita = await Citas.findOne({ where: { horarioId: data.horarioId, fecha: data.fecha } });
    if (existeCita !== null) {
        return {
            status: 400,
            success: false,
            message: "Ya hay citas programadas para este día y esta hora, por favor seleccione otra fecha u otra hora",
        };
    }
    const newCita = await Citas.create({
        id: uuid.v4(),
        userId: userId,
        serviceId: data.serviceId,
        horarioId: data.horarioId,
        fecha: data.fecha
    })
    return { success: true, data: newCita }
}

const editCita = async (id, data, userId) => {
    const response = await Citas.update(data, {
        where: { id: id }
    })
    response
}

const deleteCita = async (id) => {
    const data = await Citas.destroy({
        where: { id: id }
    })
    return data
}



module.exports = {
    getAllCitas,
    getCitasById,
    createCitas,
    editCita,
    deleteCita,
    getAllCitasByUser
}