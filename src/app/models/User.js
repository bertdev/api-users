const { Schema, model, connection } = require('mongoose');

const user = Schema({
  name: {
    firstName: { type: String, required: true },
    lastName: String,
  },
  email: { type: String, required: true },
  password: String,
  age: Number,
});

const modelName = 'User';

module.exports = (connection && connection.models[modelName])
  ? connection.models[modelName]
  : model(modelName, user);
