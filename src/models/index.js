const fs = require('fs')
const path = require('path')
const debug = require('debug')('app:mongo')
const mongoose = require('mongoose')
const config = require('getconfig')

const { host, port, database } = config.mongodb

const DATABASE_URL = `mongodb://${host}:${port}/${database}?authSource=admin`

const options = {
  autoIndex: true, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  promiseLibrary: global.Promise
}

mongoose.connect(DATABASE_URL, options)

const mongodb = mongoose.connection

mongodb.on('error', err => debug(`connection error:${err}`))
mongodb.once('open', () => debug('mongodb connect successfully'))

let db = {}

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function (file) {
    let model = require(path.join(__dirname, file))
    db[model.modelName] = model
  })


module.exports = db
