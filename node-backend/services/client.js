const net = require('net')

const CSERVER_HOST = process.env.BACKEND_HOST || 'server'
const CSERVER_PORT = parseInt(process.env.BACKEND_PORT || '8080')

const sendToCppServer = (message) => {
    return new Promise((resolve, reject) => {
        const client = net.createConnection({ host: CSERVER_HOST, port: CSERVER_PORT }, () => {
            client.write(message + '\n')
        })
        client.on('data', (data) => {
            resolve(data.toString().trim())
            client.end()
        })

        client.on('error', (err) => {
            reject(err)
        })
    })
}

module.exports = {sendToCppServer}