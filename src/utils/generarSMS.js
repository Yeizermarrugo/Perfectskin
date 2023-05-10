const moment = require('moment-timezone');

const generarSMS = (cita, horario)=>{
    const fecha = moment(cita.fecha).locale('es').tz('America/Bogota');
    const nombreDia = fecha.format('dddd');
    const diaMes = fecha.format('D');
    const nombreMes = fecha.format('MMMM');
    return `¡Hola! Tu cita ha sido agendada para el ${nombreDia} ${diaMes} de ${nombreMes} a las ${horario.hora}. Recuerda confirmar tu asistencia, en caso de cancelar o reagendar tu cita contactarse con Perfectskin al numero: 3005615455 o modificar tu cita directamente en nuestra pagina
    ¡Te esperamos!`
}

module.exports = generarSMS