const {stopNginx} = require('./index.js')

stopNginx('example.conf')
.then(() =>console.log('nginx stopped'))
