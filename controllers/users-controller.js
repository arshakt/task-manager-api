const bcrypt = require('bcrypt');
const crypto = require('crypto');
const {User} = require('../db-sequelize/sequelize');
const {NotAuthorizedError} = require('../libs/errors');

class UserController {
  static async createUser(req, res, next) {
    const {firstName, lastName, email, password} = req.body;

    try {
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await User.create({firstName, lastName, email, password: passwordHash});

      res.send({data:  {userId: user.id } });
    } catch (error) {
      return next(error);
    }
  }

  static async loginUser(req, res, next) {
    const {email, password} = req.body;

    try {
      const user = await User.findOne({
        where: {email: email},
        attributes: ['id', 'firstName', 'lastName', 'password'],
        raw: true
      });

      if (!user) {
        throw new NotAuthorizedError('Invalid credentials.');
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new NotAuthorizedError('Invalid credentials.');
      }
      const buffer = await crypto.randomBytes(16);
      const token = buffer.toString('hex');

      await User.update({token}, {where: {email: email}});

      res.send({data:  {token} });

    } catch (error) {
      return next(error)
    }
  }
}

module.exports = UserController;
