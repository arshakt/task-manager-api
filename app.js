const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const UserControllers = require('./controllers/users-controller');
const TaskControllers = require('./controllers/tasks-controller');
const {NotFoundError} = require('./libs/errors');

const AuthMiddleware = require('./middlewares/auth-middleware');
const ValidationMiddleware = require('./middlewares/validation-middleware');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/users', ValidationMiddleware.createUser, UserControllers.createUser);
app.post('/login', ValidationMiddleware.loginUser, UserControllers.loginUser);

app.get('/tasks', AuthMiddleware.authorize, TaskControllers.listTasks);
app.post('/tasks', ValidationMiddleware.createTask, AuthMiddleware.authorize, TaskControllers.createTask);
app.get('/tasks/:id', ValidationMiddleware.getTask, AuthMiddleware.authorize, TaskControllers.getTask);
app.patch('/tasks/:id', ValidationMiddleware.updateTask, AuthMiddleware.authorize, TaskControllers.updateTask);
app.delete('/tasks/:id', ValidationMiddleware.deleteTask, AuthMiddleware.authorize, TaskControllers.deleteTask);

app.use((req, res, next) => {
  const error = new NotFoundError('Path not found');

  return next(error);
});

app.use((err, req, res, next) => {
  const response = {
    message: err.message || 'Internal server error',
    status: err.status || 500,
  };

  res.status(response.status).send(response);
});

app.listen(3000);
