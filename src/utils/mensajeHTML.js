const moment = require('moment-timezone');

const generarMensajeHTML = (cita, horario) => {
  const fecha = moment(cita.fecha).locale('es').tz('America/Bogota');
  const nombreDia = fecha.format('dddd');
  const diaMes = fecha.format('D');
  const nombreMes = fecha.format('MMMM');


  return  `<!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
              margin: 0;
              padding: 0;
            }
        
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
        
            .header {
              background-color: #fbcce7 ;
              padding: 20px;
              text-align: center;
            }
        
            .content {
              padding: 20px;
            }
        
            .message {
              margin-bottom: 20px;
              text-align: center;
            }
        
            .message p {
              font-size: 16px;
              line-height: 1.5;
              color: #333333;
              text-align: center;
            }
        
            .footer {
              background-color: #fbcce7 ;
              padding: 20px;
              text-align: center;
              font-size: 14px;
              color: #666666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Confirmación de cita</h1>
            </div>
            <div class="content">
              <div class="message">
              <p>¡Hola! Tu cita ha sido agendada para el <strong>${nombreDia} ${diaMes} de ${nombreMes}</strong> a las <strong>${horario.hora}</strong>.</p>
         
              </div>
            </div>
            <div class="footer">
              <p>No responda a este correo electrónico. Para cualquier consulta, póngase en contacto con nuestro equipo de atención al cliente.</p>
            </div>
          </div>
        </body>
        </html>
        `;
}

module.exports = {generarMensajeHTML}