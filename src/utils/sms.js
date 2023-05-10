require('dotenv').config();
const twilio = require('twilio');

function sendMessage(recipientNumber, messageBody) {
    const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
    console.log("Este es el client--->",client);
    const twilioNumber = process.env.TWILIO_NUMBER;
    client.messages
        .create({
            body: messageBody,
            from: twilioNumber,
            to: recipientNumber
        })
        .then(message => console.log(message.sid))
        .catch(error => console.log(error));
}

module.exports = sendMessage;
