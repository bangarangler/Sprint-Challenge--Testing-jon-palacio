const server = require('./api/server.js')
require('dotenv').config()

const port = process.env.PORT || 3000
server.listen(port, () => {
console.log(`running on localhost:${port}, ... testing is gooooood(subjective)`)
})
