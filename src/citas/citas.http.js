const citasController = require('./citas.controller')
const responses = require('../utils/handleResponses')
const Users = require('../models/user.model')
const Roles = require('../models/roles.model')
const Horarios = require('../models/horarios.models')
const enviarCorreoCita = require('../utils/mailer')
const {generarMensajeHTML} = require('../utils/mensajeHTML')
const generarSMS = require('../utils/generarSMS')
const sendMessage = require('../utils/sms')

const getAll = (req, res) => {
    citasController.getAllCitas()
        .then(data => {
            responses.success({
                status: 200,
                data: data,
                message: 'Getting all Appointment',
                res
            })
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: 'Error getting all Appointment',
                res
            })
            console.log(err);
        })
}

const getById = (req, res) => {
    const id = req.params.id
    citasController.getCitasById(id)
        .then(data => {
            if (data) {
                responses.success({
                    status: 200,
                    data,
                    message: `Getting appoinment with id: ${id}`,
                    res
                })
            } else {
                responses.error({
                    status: 404,
                    message: `Appointment with Id: ${id}, not found`,
                    res
                })
            }
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: 'Something bad getting the Appointment',
                res
            })
        })
}

const getAllAppointmentsByUser = (req, res) => {
    const userId = req.user.id
    citasController.getAllCitasByUser(userId)
        .then(data => {
            if (data) {
                responses.success({
                    status: 200,
                    data,
                    message: `Getting yours appoinments: ${userId}`,
                    res
                })
            } else {
                responses.error({
                    status: 404,
                    message: `Appointment by ${req.user}, not found`,
                    res
                })
            }
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: 'Something bad getting the Appointment',
                res
            })
        })
}

// const register = async (req, res) => {
//     const userId = req.user.id
//     const data = req.body
//     const currentDate = new Date().toLocaleDateString("en-US", { timeZone: "America/Bogota" });;
//     const selectedDate = new Date(data.fecha);

//     if (selectedDate < currentDate) {
//         return res.status(400).json({ error: 'No se aceptan citas en fechas pasadas' });
//     }
//     const result = await citasController.createCitas(data, userId);
//     if (result.success) {
//         res.status(201).json({ data: result.data, message: `Appointment created successfully with id: ${result.data.id} for the day ${result.data.fecha}` });
//     } else {
//         res.status(400).json({ error: result.message });
//     }
// }

const register = async (req, res) => {
    const userId = req.user.id;
    const data = req.body;
    const currentDate = new Date().toLocaleDateString("en-US", { timeZone: "America/Bogota" });
    const selectedDate = new Date(data.fecha);

    if (selectedDate < currentDate) {
        return res.status(400).json({ error: 'No se aceptan citas en fechas pasadas' });
    }

    // Agrega el correo del usuario al objeto cita
    const user = await Users.findByPk(userId);
    console.log(user.email, "<---- Este es el user");

    const result = await citasController.createCitas(data, userId);
    console.log("Este es el result", result);
    const horario = await Horarios.findByPk(result.data?.horarioId);
    console.log("Este es el horario", horario);

    if (result.success) {
        // Envía el correo electrónico y mensaje de texto después de que se crea la cita
        const cita = result.data;
        const asunto = 'Confirmación de cita';
        const mensaje = generarMensajeHTML(cita, horario);
        const messageBody = generarSMS(cita, horario)
        console.log(cita);
        enviarCorreoCita(user.email, asunto, mensaje);
        sendMessage(user.telefono, messageBody)
        res.status(201).json({ data: result.data, message: `Appointment created successfully with id: ${result.data.id} for the day ${result.data.fecha}` });
    } else {
        res.status(400).json({ error: result.message });
    }
}


  

const edit = async (req, res) => {
    try {
        const id = req.params.id;
        const citaId = req.params.id;
        const newData = req.body;
        const userId = req.user.id; // obtener el ID del usuario autenticado
        const user = await Users.findByPk(req.user.id);
        const roles = await Roles.findAll({ id: { $in: user.role_id } })
        const cita = await citasController.getCitasById(id);
        if (!cita) {
            return res.status(404).json({ message: "La cita no existe" });
        } else {

            for (let i = 0; i < roles.length; i++) {
                if (cita.userId !== userId && user.roleId !== "6288423f-4596-41db-9d22-e93639025e61") {
                    return res.status(403).json({ message: "No estas autorizado para modificar esta cita" })
                }
            }
        }
        const response = await citasController.editCita(citaId, newData);

        res.status(200).json({ message: "Cita actualizada con exito", newData });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ha ocurrido un error al editar la cita.');
    }
};



const remove = async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;
    const user = await Users.findByPk(req.user.id);
    const roles = await Roles.findAll({ id: { $in: user.role_id } })
    const cita = await citasController.getCitasById(id)
    if (!cita) {
        return res.status(404).json({ message: "La cita no existe" })
    }
    for (let i = 0; i < roles.length; i++) {
        if (cita.userId !== userId && user.roleId !== "6288423f-4596-41db-9d22-e93639025e61") {
            return res.status(403).json({ message: "No estas autorizado para eliminar esta cita" })
        }
    }
    await citasController.deleteCita(id)
        .then(data => {
            if (data) {
                responses.success({
                    status: 200,
                    data,
                    message: `Appointment with id: ${id} deleted successfully`,
                    res
                })
            } else {
                responses.error({
                    status: 404,
                    data: err,
                    message: `The appointment with id: ${id} not found`
                })
            }
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: `Error ocurred trying to delete appointment with id: ${id}`,
                res
            })
        })
}




module.exports = {
    getAll,
    getById,
    register,
    edit,
    remove,
    getAllAppointmentsByUser
}