const {getUserById} = require("../users/user.controller");
const { ExtractJwt, Strategy } = require('passport-jwt')
const passport = require('passport')

const config = require('../../config').api 

const passportConfigs = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //? 
    secretOrKey: config.secretOrKey
}

passport.use(new Strategy(passportConfigs, (tokenDecoded, done) => {
    getUserById(tokenDecoded.id)
        .then(data => {
            if(data){
               done(null, tokenDecoded) //? El usuario si Existe y es valido
            } else {
               done(null, false, {message: 'Token Incorrect'}) //? El usuario no existe
            }
        })
        .catch(err => {
            done(err, false) //? Error en la base de datos
        })
}))

module.exports = passport.authenticate('jwt', {session: false})