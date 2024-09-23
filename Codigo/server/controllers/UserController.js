const user = require("../models/User");
const bcrypt = require("bcrypt");

class UserController {
  async create(req, res) {
    try {
      const password = req.body.senha;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      await user.create({
        id: req.body.id,
        nome: req.body.nome,
        email: req.body.email,
        senha: hash,
      });
      return res.status(200).json("User cadastrado");
    } catch (erro) {
      return res.status(500).json("User não cadastrado " + erro);
    }
  }

  async filterIdUser(req, res) {
    try {
      const userImport = await user.findOne({
        where: { id: req.params.id },
      });
      console.log(userImport);
      return res.status(200).json(userImport);
    } catch (erro) {
      return res.status(500).json("Erro ao pegar os usuario" + erro);
    }
  }

  async verificarLogin(req, res) {
    try {
      const { email, senha } = req.body;
      const usuario = await user.findOne({ where: { email } });
      if (!usuario) {
        return res.status(401).json("E-mail ou senha incorretos");
      }

      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

      if (senhaCorreta) {
        return res.status(200).json("Login bem-sucedido");
      } else {
        return res.status(401).json("E-mail ou senha incorretos");
      }
    } catch (erro) {
      return res.status(500).json("Erro ao verificar o login " + erro);
    }
  }

  async index(req, res) {
    try {
      const userImport = await user.findAll();
      return res.status(200).json(userImport);
    } catch (erro) {
      return res.status(500).json("Erro ao encontrar o usuario" + erro);
    }
  }
}

module.exports = new UserController();
