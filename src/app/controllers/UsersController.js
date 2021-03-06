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

    const token = generateToken({ email: user.email, name: user.name.firstName });
    return res.status(200).json({ token });
  }

  async update(req, res) {
    const newUserData = {
      firstName: req.body.name?.firstName || '',
      lastName: req.body.name?.lastName,
      email: req.body.email || '',
      age: req.body.age,
    };

    if (newUserData.email && !isEmailValid(newUserData.email)) {
      return res.status(400).json({ error: 'email inválido!' });
    }

    if (!newUserData.firstName && newUserData.firstName === '') {
      return res.status(400).json({ error: 'primerio nome é obrigatório!' });
    }

    const user = await UserRepository.update(req.user.email, {
      ...newUserData,
    });

    if (!user) {
      return res.status(500).json({ error: 'falha ao atualizar' });
    }

    const token = generateToken({ email: user.email, name: user.name.firstName });
    res.status(200).json({
      name: user.name,
      email: user.email,
      age: user.age || null,
      newToken: token,
    });
  }

  async delete(req, res) {
    const { email } = req.user;

    const userWasDeleted = await UserRepository.delete(email);
    if (!userWasDeleted) {
      return res.status(500).json({ error: 'houve um problema excluindo seu user, tente mais tarde!' });
    }

    res.sendStatus(204);
  }
}

module.exports = new UserController();
