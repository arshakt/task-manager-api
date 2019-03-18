const Joi = require('joi');

class ValidationMiddleware {
  static createUser (req, res, next){
    const schema = {
      body: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
      }
    };

    const { error } = Joi.validate({ body: req.body }, schema);

    if (error) {
      error.status = 400;
      return next(error);
    }

    return next();
  }

  static loginUser (req, res, next){
    const schema = {
      body: {
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
      }
    };

    const { error } = Joi.validate({ body: req.body }, schema);

    if (error) {
      error.status = 400;
      return next(error);
    }

    return next();
  }

  static createTask (req, res, next){
    const schema = {
      body: {
        name: Joi.string().required(),
        description: Joi.string(),
        status: Joi.string(),
        parentId: Joi.number().min(0)
      }
    };

    const { error } = Joi.validate({ body: req.body }, schema);

    if (error) {
      error.status = 400;
      return next(error);
    }

    return next();
  }

  static updateTask (req, res, next){
    const schema = {
      body: {
        name: Joi.string().required(),
        description: Joi.string(),
        status: Joi.string(),
        parentId: Joi.number().integer().min(0)
      },
      params: {
        id: Joi.number().integer().min(1).required()
      }
    };

    const { error } = Joi.validate({ body: req.body, params: req.params }, schema);

    if (error) {
      error.status = 400;
      return next(error);
    }

    return next();
  }

  static deleteTask (req, res, next){
    const schema = {
      params: {
        id: Joi.number().integer().min(1).required()
      }
    };

    const { error } = Joi.validate({ params: req.params }, schema);

    if (error) {
      error.status = 400;
      return next(error);
    }

    return next();
  }

  static getTask (req, res, next){
    const schema = {
      params: {
        id: Joi.number().integer().min(1).required()
      }
    };

    const { error } = Joi.validate({ params: req.params }, schema);

    if (error) {
      error.status = 400;
      return next(error);
    }

    return next();
  }
}

module.exports = ValidationMiddleware;
