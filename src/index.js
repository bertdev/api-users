require('dotenv').config();
const express = require('express');
const passport = require('passport');
const mongoConnect = require('./app/database/mongo');
const routes = require('./routes');
const errorHandler = require('./app/middlewares/errorHandler');

mongoConnect();

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(routes);
app.use(errorHandler);

app.listen(3000, () => console.log('deu bom'));
