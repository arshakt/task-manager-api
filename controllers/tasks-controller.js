const {Task} = require('../db-sequelize/sequelize');
const {NotFoundError} = require('../libs/errors');

class TaskController {
  static async createTask(req, res, next) {
    const {name, description, status, parentId} = req.body;
    const {userId} = req;

    try {
      if(parentId){
        const parentTask = await Task.findOne({
          where: {id, parentId},
          attributes: ['id']
        });

        if(!parentTask){
          throw new NotFoundError(`Parent task with id ${parentId} is not found.`)
        }
      }
      const task = await Task.create({name, description, status, userId, parentId});

      res.send({data: task});
    } catch (error) {
      return next(error);
    }

  }

  static async getTask(req, res, next) {
    const {id} = req.params;
    const {userId} = req;

    try {
      const task = await Task.findOne({
        where: {id, userId},
        attributes: ['id', 'name', 'description', 'status', 'parentId'],
        raw: true
      });

      if (!task) {
        throw new NotFoundError(`Task with id ${id} is not found or does not belong to you.`)
      }

      res.send({data: task});

    } catch (error) {
      return next(error)
    }
  }

  static async listTasks(req, res, next) {
    const {userId} = req;

    try {
      const task = await Task.findAll({
        where: {userId},
        attributes: ['id', 'name', 'description', 'status', 'parentId'],
        raw: true
      });

      res.send({data: task});
    } catch (error) {
      return next(error)
    }
  }

  static async deleteTask(req, res, next) {
    const {id} = req.params;
    const {userId} = req;

    try {
      const task = await Task.destroy({
        where: {id, userId}
      });

      if (!task) {
        throw new NotFoundError(`Task with id ${id} is not found or does not belong to you.`)
      }

      res.send({data: null});
    } catch (error) {
      return next(error)
    }
  }

  static async updateTask(req, res, next) {
    const {id} = req.params;
    const {userId} = req;
    const {name, description, status, parentId} = req.body;

    try {
      if(parentId){
        const parentTask = await Task.findOne({
          where: {id, parentId},
          attributes: ['id']
        });

        if(!parentTask){
          throw new NotFoundError(`Parent task with id ${parentId} is not found.`)
        }
      }
      const task = await Task.findOne({
        where: {id, userId},
        attributes: ['id', 'name', 'description', 'status', 'parentId']
      });

      if (!task) {
        throw new NotFoundError(`Task with id ${id} is not found or does not belong to you.`)
      }

      const _task = await task.update({name, description, status, parentId}, {where: {id, userId}});

      res.send({data: _task});
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = TaskController;
