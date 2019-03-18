const {User} = require('../db-sequelize/sequelize');
const {NotAuthorizedError} = require('../libs/errors');

class AuthMiddleware {
  static async authorize(req, res, next) {
    const {token} = req.headers;

    const user = await User.findOne({
      where: {token},
      attributes: ['id'],
      raw: true
    });

    if (!user) {
      const error = new NotAuthorizedError('Invalid token.');
      return next(error);
    }

    req.userId = user.id;
    return next();
  }
}

module.exports = AuthMiddleware;
