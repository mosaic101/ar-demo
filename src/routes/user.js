const express = require('express')
const router = express.Router()
const Joi = require('joi')

const joiValidator = require('../middlewares/joiValidator')
const userService = require('../services/userService')

router.get('/:id', joiValidator({
  params: {
    id: Joi.string().guid({ version: ['uuidv4'] }).required()
  }
}), async (req, res) => {
  try {
    let id = req.params.id
    let data = await userService.find(id)
    return res.success(data)
  }
  catch (err) {
    return res.error(err)
  }
})


module.exports = router
