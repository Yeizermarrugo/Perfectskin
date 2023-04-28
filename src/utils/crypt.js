const bcrypt = require('bcrypt');

const hashPassword = (plainPassword) => {
    return bcrypt.hashSync(plainPassword, 10)
}

//? Retornar un booleano 
const comparePassword = (plainPassword, hashedPassword) => {
    return bcrypt.compareSync(plainPassword, hashedPassword)
}

// console.log(hashPassword('root'))

// console.log(comparePassword('root', '$2b$10$w1o5/RIHUoJGT3IMqGXaoedd7xqRT5yyTg1oMwrHC4vxCBIAmPT7S'))

module.exports = {
    hashPassword,
    comparePassword
}