const express = require('express');
const UserController = require('./app/controllers/UsersController');

const Router = express();

Router.post('/users', UserController.store);

module.exports = Router;
