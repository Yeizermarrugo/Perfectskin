const express = require('express');
const helmet = require('helmet');
const compression = require('compression')
const resHandler = require('./utils/handleResponses')
const initModels = require('./models/initModels')
const config = require('../config').api
//*archivos de rutas
const userRoute = require('./users/user.routes').router
const authRoute = require('./auth/auth.routes').router
const serviceRoute = require('./servicios/servicios.routes').router
const horarioRoute = require('./horarios/horarios.routes').router
const dayOffRoute = require('./DayOff/dayOff.routes').router
const citasRoute = require('./citas/citas.routes').router

//* Conexion BD
const db = require('./utils/database')

//*configuracion inicial
const app = express();
app.use(express.json())
app.use(helmet());
app.use(compression());

db.authenticate()
    .then(() => console.log('Database Authenticated'))
    .catch(() => console.log(err))

db.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.log(err))

initModels();

app.get('/', (req, res) => {
    resHandler.success({
        res,
        status: 200,
        message: 'Servidor inicializado correctamente',
        data: {
            "Citas": `${config.host}/api/v1/perfectskin/citas`,
        }
    })
})



app.use('/api/v1/perfectskin/users', userRoute);
app.use('/api/v1/perfectskin/auth', authRoute);
app.use('/api/v1/perfectskin/servicios', serviceRoute);
app.use('/api/v1/perfectskin/horas', horarioRoute)
app.use('/api/v1/perfectskin/dayoff', dayOffRoute)
app.use('/api/v1/perfectskin/citas', citasRoute)
app.use('*', (req, res)=> {
    resHandler.error({
        res,
        status: 404,
        message: `URL not found, please try with ${config.host}`,
    })
})


app.listen(config.port,() => {
    console.log(`Server started at port ${config.port}`)
})

module.exports = app