function runNginx(configFile, {additionalArgs, fullPath}={}) {
  if(!configFile) {
    console.log('gulp-nginx: configFile is required')
    return Promise.reject('configFile is required')
  }

  const spawn = require('child_process').spawn

  const pwd = fullPath?fullPath:process.env.PWD
  const path = fullPath?fullPath:'nginx'
  const args = ['-p', pwd, '-c', configFile].concat(additionalArgs?additionalArgs:[])

  //console.log(`path: ${path}, args: ${args}`)
  const nginx = spawn(path, args, {shell: true}) 

  nginx.stdout.on('data', (data) => console.log(`${data}`))
  nginx.stderr.on('data', (data) => console.error(`${data}`))

  return new Promise((resolve) => {
    nginx.on('close', resolve)
  })
}

function startNginx(configFile) {
  return runNginx(configFile)
}

function stopNginx(configFile) {
  return runNginx(configFile, {additionalArgs: ['-s', 'stop']})
}

module.exports = {runNginx, startNginx, stopNginx}

