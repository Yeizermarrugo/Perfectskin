require('dotenv').config()

const configs = {
    api: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'http://localhost:7000',
        nodeEnv: process.env.NODE_ENV || 'development',
        secretOrKey : process.env.JWT_SECRET
    },
    db: {
        development: {
            //? Aqui deberan estar las configuraciones para la conexion con sequelize
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '1234',
            database: 'Perfectskin',
            define: {
                timestamps: true, //? Nos obliga a que todas las tablas tengan la propiedad createdAt y upadtedAt
                underscored: true,
                underscoredAll: true 
            }
        },
        production: {
            //? Aqui deberan estar las configuraciones para la conexion con sequelize
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            define: {
                timestamps: true, //? Nos obliga a que todas las tablas tengan la propiedad createdAt y upadtedAt
                underscored: true,
                underscoredAll: true 
            },
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        },
        testing: {
            //? Aqui deberan estar las configuraciones para la conexion con sequelize
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '1234',
            database: 'Perfectskin',
            define: {
                timestamps: true, //? Nos obliga a que todas las tablas tengan la propiedad createdAt y upadtedAt
                underscored: true,
                underscoredAll: true 
            }
        }
    }
}

module.exports = configs