const corsMiddleware = require('cors')

const corsOriginAllowed = process.env.CORS_ALLOWED.split(', ') // ! Ojo con el espacio después de la coma a la hora de definir los ENV vars en el servidor. ("https:pictau.com, http://.." --> es correcto ) ("https:pictau.com,http://.." --> es INCORRECTO )

// const corsOptionsDelegate = function (req, callback) {
//   let corsOptions
//   if (corsOriginAllowed.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true, optionsSuccessStatus: 200 }
//     console.log('ORIGIN TRUE')
//   } else {
//     corsOptions = { origin: false }
//   }
//   callback(null, corsOptions)
// }

const corsOptions = {
  origin: corsOriginAllowed,
  optionsSuccessStatus: 200
}

const validCORS = function (origin) {
  if (corsOriginAllowed.indexOf(origin) !== -1) {
    return true
  } else {
    return false
  }
}

const whiteListCORS = module.exports = corsMiddleware(corsOptions)
whiteListCORS.validCORS = validCORS
