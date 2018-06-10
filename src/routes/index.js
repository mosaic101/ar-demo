const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
})

router.use('/api/user', require('./user'))
    
module.exports = router

