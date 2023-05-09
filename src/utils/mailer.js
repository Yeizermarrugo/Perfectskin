const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuración del transportador de correo
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const enviarCorreoCita = (email, asunto, mensaje) => {
  const mailOptions = {
    from: transporter.options.auth.user, // Utiliza el correo electrónico del remitente configurado en el transportador de correo
    to: email,
    subject: asunto,
    html: mensaje
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
};

// Ejemplo de cómo usar la función enviarCorreoCita
const cita = {
  email: 'ejemplo@correo.com',
  fecha: '2023-05-10',
  hora: '15:00'
};

const asunto = 'Confirmación de cita';
const mensaje = `¡Hola! Tu cita ha sido agendada para el ${cita.fecha} a las ${cita.hora}.`;

enviarCorreoCita(cita.email, asunto, mensaje);

module.exports = enviarCorreoCita

