const express = require('express');
const UserController = require('./app/controllers/UsersController');

const Router = express();

Router.post('/users', UserController.store);
Router.post('/login', UserController.login);

module.exports = Router;
