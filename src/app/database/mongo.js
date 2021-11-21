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
    console.log(error);
  }
};

module.exports = mongoConnect;
