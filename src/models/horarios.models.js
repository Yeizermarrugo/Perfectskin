const { DataTypes } = require('sequelize')
const db = require('../utils/database')
const Servicios = require('./servicios.models')

const Horarios = db.define('horarios', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },
    servicioId: {
        allowNull: false,
        type: DataTypes.UUID,
        field: "servicio_id",
        references: {
            model: Servicios,
            key: 'id'
        }
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    }, 
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'createdAt'
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updatedAt'
    }
})

module.exports = Horarios