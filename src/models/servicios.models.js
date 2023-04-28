const { DataTypes } = require('sequelize')
const db = require('../utils/database')
const Users = require('./user.model')

const Servicios = db.define('servicios', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    descripcion: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    precio: {
        allowNull: false,
        type: DataTypes.NUMBER,
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

module.exports = Servicios