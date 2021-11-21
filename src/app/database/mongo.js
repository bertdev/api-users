require('dotenv').config();
const { connect } = require('mongoose');

const mongoConnect = async () => {
  try {
    await connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('mongo deu bom');
  } catch (error) {
    console.log('erro de conexão com o mongo:', error);
  }
};

module.exports = mongoConnect;
