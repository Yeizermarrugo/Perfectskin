const Usuarios = require('./user.model')
const Roles = require('./roles.model')
const Servicios = require('./servicios.models')
const Horarios = require('./horarios.models')
const DayOff = require('./dayOff.models')
const Citas = require('./citas.models')

const initModel = () => {

    //?Usuarios <- Roles
    Roles.hasMany(Usuarios)
    Usuarios.belongsTo(Roles)

    //?Usuarios -> Servicios
    Usuarios.hasMany(Servicios)
    Servicios.belongsTo(Usuarios)

    //?Horarios -> Servicios
    Horarios.belongsTo(Servicios);
    Servicios.hasMany(Horarios);

    //?Usuarios -> DayOff
    Usuarios.hasMany(DayOff)
    DayOff.belongsTo(Usuarios)

    //?Usuaros -> Citas
    Usuarios.hasMany(Citas)
    Citas.belongsTo(Usuarios)

    //?Horarios -> Citas
    Horarios.hasMany(Citas)
    Citas.belongsTo(Horarios)

    //?Servicios -> Citas
    Servicios.hasMany(Citas)
    Citas.belongsTo(Servicios)
}

module.exports = initModel;