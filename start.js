const {startNginx} = require('./index.js')

startNginx('example.conf')
.then(() =>console.log('nginx started'))
