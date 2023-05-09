const serviceController = require('./servicios.controller')
const responses = require('../utils/handleResponses')


const getAll = (req, res) =>{
    serviceController.getAllServices()
    .then(data =>{
        responses.success({
            status: 200,
            data: data,
            message: 'Getting all Services',
            res
        })
    })
    .catch(err =>{
        responses.error({
            status: 400,
            data: err,
            message: 'Error getting all Services',
            res
        })
        console.log(err);
    })
}

const getById = (req, res) =>{
    const id = req.params.id
    serviceController.getServiceById(id)
    .then(data =>{
        if(data){
            responses.success({
                status: 200,
                data,
                message: `Getting service with id: ${id}`,
                res
            })
        }else{
            responses.error({
                status:404,
                message: `Service with Id: ${id}, not found`,
                res
            })
        }
    })
    .catch(err => {
        responses.error({
            status: 400,
            data: err,
            message: 'Something bad getting the service',
            res
        })
    })
}

const register = async (req, res) => {
        const userId = req.user.id
        const servObj = req.body
        console.log(userId);
        console.log(servObj);
        serviceController.createService(servObj, userId)
            .then(data => {
                responses.success({
                    status: 201,
                    data,
                    message: `Service created succesfully with id: ${data.id}`,
                    res
                })
            })
            .catch(err => {
                console.log(err);
                responses.error({
                    status: 400,
                    data: err,
                    message: 'Error ocurred trying to create a new service',
                    res,
                    fields: {
                        nombre: 'String',
                        descripcion: 'String',
                        precio: 'Number'
                    }
                })
            })
    }

const edit = (req, res) => {
    const id = req.params.id
    const data = req.body
    if (!Object.keys(data).length) { // si no existen los key, entro al error
        return res.status(400).json({ message: 'Missing data' })
    } else if (
        !data.nombre ||
        !data.descripcion ||
        !data.precio
    ) {
        return res.status(400).json({
            message: 'All fields must be completed', fields: {
                nombre: 'string',
                descripcion: 'string',
                precio: 'Number'
            }
        })
    } else {
        const response = serviceController.editService(id, data)
        return res.status(200).json({
            message: 'Service edited succesfully',
            service: data
        })
    }

}

const remove = (req, res) => {
    const id = req.params.id

    serviceController.deleteService(id)
        .then(data => {
            if (data) {
                responses.success({
                    status: 200,
                    data,
                    message: `Service with id: ${id} deleted successfully`,
                    res
                })
            } else {
                responses.error({
                    status: 404,
                    data: err,
                    message: `The service with ID ${id} not found`,
                    res
                })
            }
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: `Error ocurred trying to delete service with id ${id}`,
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