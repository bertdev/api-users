const bycript = require('bcrypt');
const User = require('../models/User');

class UserRepository {
  async create({
    firstName, lastName, email, password, age,
  }) {
    const hash = await bycript.hash(password, 10);
    const newUser = new User({
      name: {
        firstName,
        lastName,
      },
      email,
      password: hash,
      age,
    });
    try {
      await newUser.save();
      return true;
    } catch (error) {
      return false;
    }
  }

  async findByEmail(emailUser) {
    try {
      const user = await User.findOne({ email: emailUser });
      return user;
    } catch {
      return false;
    }
  }
}

module.exports = new UserRepository();
