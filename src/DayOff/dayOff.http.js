const dayOffController = require('./dayOff.controller')
const responses = require('../utils/handleResponses')

const getAll = (req, res) => {
    dayOffController.getAllFechas()
        .then(data => {
            responses.success({
                status: 200,
                data: data,
                message: 'Getting all dates',
                res
            })
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: 'Error getting all dates',
                res
            })
        })
}

const getByFecha = (req, res) => {
    const fecha = req.params.fecha
    dayOffController.getFecha(fecha)
        .then(data => {
            if (data) {
                responses.success({
                    status: 200,
                    data,
                    message: `Getting date: ${fecha}`,
                    res
                })
            } else {
                responses.error({
                    status: 400,
                    message: `Date: ${fecha} not found`,
                    res
                })
            }
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: 'Something bad getting date'
            })
        })
}

const register = async (req, res) => {
    const userId = req.user.id
    const dateObj = req.body
    dayOffController.createFecha(dateObj, userId)
        .then(data => {
            responses.success({
                status: 201,
                data,
                message: `Date created succesfully: ${data.fecha}`,
                res
            })
        })
        .catch(err => {
            console.log(err);
            responses.error({
                success: false,
                status: 400,
                message: 'Fecha ya seleccionada',
                res
            })
        })
}

const remove = (req, res) => {
    const fecha = req.params.fecha

    dayOffController.deleteFecha(fecha)
        .then(data => {
            if (data) {
                responses.success({
                    status: 200,
                    data,
                    message: `Date: ${fecha} deleted successfully`,
                    res
                })
            } else {
                responses.error({
                    status: 404,
                    data: err,
                    message: `The date ${fecha} not found`,
                    res
                })
            }
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: `Error ocurred trying to delete date ${fecha}`,
                res
            })
        })
}

module.exports = {
    getAll,
    getByFecha,
    register,
    remove
}