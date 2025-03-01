const consola = require('consola')
module.exports = async (HOST, PORT) => {
  consola.ready({ message: `Pokeapi corre en ${HOST}:${PORT}`, badge: true })

}