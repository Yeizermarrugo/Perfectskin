const { DataTypes } = require('sequelize')
const db = require('../utils/database')

const Users = require('./user.model')
const Servicios = require('./servicios.models')
const Horarios = require('./horarios.models')


const Citas = db.define('citas', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },
    userId: {
        allowNull: false,
        type: DataTypes.UUID,
        field: "usuario_id",
        references: {
            model: Users,
            key: 'id'
        }
    },
    serviceId: {
        allowNull: false,
        type: DataTypes.UUID,
        field: "servicio_id",
        references: {
            model: Servicios,
            key: 'id'
        }
    },
    horarioId: {
        allowNull: false,
        type: DataTypes.UUID,
        field: "horario_id",
        references: {
            model: Horarios,
            key: 'id'
        }
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    isFinished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "is_finished",
    },
    isCanceled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "is_canceled",
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

module.exports = Citas