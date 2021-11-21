const express = require('express');
const { privateRoute } = require('./app/config/passport');
const UserController = require('./app/controllers/UsersController');

const Router = express();

Router.post('/users', UserController.store);
Router.post('/login', UserController.login);
Router.put('/users', privateRoute, UserController.update);

module.exports = Router;
