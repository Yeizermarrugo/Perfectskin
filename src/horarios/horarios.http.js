const horarioController = require('./horario.controller')
const responses = require('../utils/handleResponses')

const getAll = (req, res) => {
    horarioController.getAllhorarios()
    .then(data =>{
        responses.success({
            status: 200,
            data: data,
            message: 'Getting all hours',
            res
        })
    })
    .catch(err => {
        responses.error({
            status: 400,
            data: err,
            message: 'Error getting all hours',
            res
        })
    })
}

const getById = (req, res) => {
    const id = req.params.id
    horarioController.getHorarioById(id)
    .then(data => {
        if(data){
            responses.success({
                status: 200,
                data,
                message: `Getting hour with id: ${id}`,
                res
            })
        }else{
            responses.error({
                status: 400,
                message: `Hour with id: ${id} not found`,
                res
            })
        }
    })
    .catch(err => {
        responses.error({
            status: 400,
            data: err,
            message: 'Something bad getting hour'
        })
    })
}

const register = async (req, res) => {
    const horaObj = req.body
    horarioController.createHorario(horaObj)
    .then(data => {
        responses.success({
            status: 201,
            data,
            message: `Hour created succesfully with id: ${data.id}`,
            res
        })
    })
    .catch(err => {
        console.log(err);
        responses.error({
            status: 400,
            data: err,
            message: 'Error ocurred trying to create a new hour',
            res,
            fields: {
                hora: 'String',
                servicio_id: 'String'
            }
        })
    })
}

const edit = (req, res) =>{
    const id = req.params.id
    const data = req.body
    if (!Object.keys(data).length) { // si no existen los key, entro al error
        return res.status(400).json({ message: 'Missing data' })
    } else if (
        !data.hora
    ) {
        return res.status(400).json({
            message: 'All fields must be completed', fields: {
                hora: 'String'
            }
        })
    } else {
        const response = horarioController.editHorario(id, data)
        return res.status(200).json({
            message: 'Service edited succesfully',
            service: response
        })
    }
}

const remove = (req, res) => {
    const id = req.params.id
    horarioController.deleteHorario(id)
    .then(data => {
        if (data) {
            responses.success({
                status: 200,
                data,
                message: `Hour with id: ${id} deleted successfully`,
                res
            })
        } else {
            responses.error({
                status: 404,
                data: err,
                message: `The hour with ID ${id} not found`,
                res
            })
        }
    })
    .catch(err => {
        responses.error({
            status: 400,
            data: err,
            message: `Error ocurred trying to delete hour with id ${id}`,
            res
        })
    })
}

module.exports = {
    getAll,
    getById,
    register,
    edit,
    remove
}