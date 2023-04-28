const { DataTypes } = require('sequelize')
const db = require('../utils/database')
const Users = require('./user.model')

const DayOff = db.define('fechas', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    disponible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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

module.exports = DayOff