//? Para respuestas exitosas
const success = ({status, data, items, message, res}) => {
    res.status(status).json({
        error: false,
        status: status,
        message: message,
        items: data.length,
        data: data
    })
} 



//? Para respuestas de errores
const error = ({status, data, message, res, fields}) => {
    res.status(status).json({
        error: true,
        status: status,
        message: message,
        fields: fields,
        data
    })
}

module.exports = {
    success,
    error
}

//? Error de conexion
//? Not Found
//? Errores de Sintaxis
//? Errores al hacer las peticiones creacionales

//* Ejemplos de usos en los servicios:
/*
const getAllProducts = (req, res) => {
    findAllProcts()
        .then(data => {
            success({
                res,
                data,
                status: 200,
                message: 'All products collected succesfully'
            })
        })
        .catch(err => {
            error({
                res,
                data: err,
                status: 400,
                message: 'Se produjo un error al mostrar todos los productos',
            })
        })
}
const getProductById = (req, res) => {
    findProductById(id)
        .then(data => {
            if(data){
                success({
                    res,
                    data,
                    status: 200,
                    message: 'Product with id' + data.id
                })
            } else {
                error({
                    res,
                    status: 404,
                    message: 'Producto no encontrado'
                })
            }
        })
        .catch(err => {
            error({
                res,
                data: err,
                status: 400,
                message: 'Se produjo un error al mostrar un producto',
            })
        })
}
*/