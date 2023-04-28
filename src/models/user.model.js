const {DataTypes} = require('sequelize')
const db  = require('../utils/database')

const Users = db.define('usuarios', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    apellido: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING(30),
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    telefono: {
        allowNull: false,
        type: DataTypes.STRING,
    },
     roleId: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: '5660e2cd-3335-4398-b3d9-48f9765bbfb6',
        field: "role_id",
        references: {
            model: 'Roles',
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

module.exports = 
    Users
