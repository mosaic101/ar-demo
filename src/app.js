const express = require('express')
var path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const Session = require('express-session')
const FileStore = require('session-file-store')(Session)

const routes = require('./routes/index')

global.Promise = require('bluebird')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'assets')))

const session = Session({
  store: new FileStore({ path: './sessions' }),
  secret: 'ar-demo',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
})

// Use express-session middleware for express
app.use(session)

// app.set('trust proxy', 1) // trust first proxy
app.use(bodyParser.json({ limit: '10000kb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// res middleware
app.use(require('./middlewares/res'))

app.use('/', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  res.error(err, 404, false)
  next()
})

module.exports = app
