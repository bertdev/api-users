const isEmailValid = require('../helpers/isEmailValid');
const isPasswordValid = require('../helpers/isPasswordValid');

const UserRepository = require('../repositories/UsersRepository');

class UserController {
  async store(req, res) {
    const {
      name: { firstName = '', lastName = '' },
      email = '',
      password = '',
      age = 0,
    } = req.body;

    if (!email || !isEmailValid(email)) {
      return res.status(400).json({ error: 'email inválido!' });
    }

    if (!password || !isPasswordValid(password)) {
      return res.status(400).json({ error: 'senha inválida!' });
    }

    if (!firstName) {
      return res.status(400).json({ error: 'primerio nome é obrigatório!' });
    }

    await UserRepository.create({
      firstName,
      lastName,
      email,
      password,
      age,
    });

    res.sendStatus(204);
  }
}

module.exports = new UserController();
