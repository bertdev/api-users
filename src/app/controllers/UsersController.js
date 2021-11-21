const bycript = require('bcrypt');
const { generateToken } = require('../config/passport');
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

    const emailIsAlreadyUsed = await UserRepository.findByEmail(email);
    if (emailIsAlreadyUsed) {
      return res.status(400).json({ error: 'esse email já está em uso' });
    }

    if (!password || !isPasswordValid(password)) {
      return res.status(400).json({ error: 'senha inválida!' });
    }

    if (!firstName) {
      return res.status(400).json({ error: 'primerio nome é obrigatório!' });
    }

    const userCreated = await UserRepository.create({
      firstName,
      lastName,
      email,
      password,
      age: Number(age),
    });

    if (!userCreated) {
      return res.status(500).json({ error: 'problemas na criação do usuario' });
    }

    res.sendStatus(201);
  }

  async login(req, res) {
    const { email, password } = req.body;

    const user = await UserRepository.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Email não registrado!' });
    }

    const isSamePassword = await bycript.compare(password, user.password);
    if (!isSamePassword) {
      res.status(401).json({ error: 'Senha inválida!' });
    }

    const token = generateToken({ email: user.email, name: user.name });
    return res.status(200).json({ token });
  }
}

module.exports = new UserController();
