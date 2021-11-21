require('dotenv').config();
const express = require('express');
const mongoConnect = require('./app/database/mongo');
const routes = require('./routes');

mongoConnect();

const app = express();

app.use(routes);

app.listen(3000, () => console.log('deu bom'));
