const debug = require('debug')('app:user')
const _ = require('lodash')
const { User } = require('../models')

/**
 * This is user service.
 * @class UserService
 */
class UserService {
	/**
	 * create new user
	 * @param {object} user 
	 * @memberof UserService
	 */
  create(user) {
    return User.create(user)
  }
	/**
	 * get user information
	 * @param {string} userId 
	 * @returns {object} user 
	 */
  async find(userId) {
    const user = await User.findOne({ _id: userId })
    return user
  }

}

module.exports = new UserService()
