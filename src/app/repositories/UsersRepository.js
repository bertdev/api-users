const bycript = require('bcrypt');
const User = require('../models/User');

class UserRepository {
  async findByEmail(emailUser) {
    try {
      const user = await User.findOne({ email: emailUser });
      return user;
    } catch {
      return false;
    }
  }

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

  async update(query, newUserData) {
    const user = await User.findOne({ email: query });
    user.name.firstName = newUserData.firstName || user.name.firstName;
    user.name.lastName = newUserData.lastName || user.name.lastName;
    user.email = newUserData.email || user.email;
    user.age = newUserData.age || user.age;
    try {
      await user.save();
      return await User.findOne({ email: newUserData.email || query });
    } catch (error) {
      return false;
    }
  }

  async delete(emailUser) {
    try {
      const user = await User.findOne({ email: emailUser });
      user.remove();
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = new UserRepository();
