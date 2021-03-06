const debug = require('debug')('app:mqtt')
const mqtt = require('mqtt')
const config = require('getconfig')

const MQTT_URL = `mqtt://${config.mqtt.host}:${config.mqtt.port}`

const settings = {
  clientId: 'CLOUD_' + Math.random().toString(16).substr(2, 8),
  clean: true,
  keepalive: 3,
  reconnectPeriod: 5 * 1000,
  connectTimeout: 10 * 1000
}
const client = mqtt.connect(MQTT_URL, settings)

// subcribe topic
client.subscribe(`$queue/station/connect`, { qos: 1 })
client.subscribe(`$queue/station/disconnect`, { qos: 1 })

// connect
client.on('connect', connack => debug('cloud connect successfully!', connack))

// message
// client.on('message', (topic, message, packet) =>  debug(`message`, topic, message.toString(), packet))

// reconnect
client.on('reconnect', () => debug('reconnect'))
// close
client.on('close', () => debug('close'))
// offline
client.on('offline', () => debug('offline'))

module.exports = client
