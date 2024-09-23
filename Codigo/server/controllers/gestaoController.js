const { where } = require("sequelize");
const gestao = require("../models/Gestao");
const fs = require("fs").promises;
const path = require("path");

class gestaoController {
  async create(req, res) {
    try {
      const novaGestao = await gestao.create({
        idReserva: req.body.idReserva,
        idCliente: req.body.idCliente,
        custos: req.body.custos,
        descricao: req.body.descricao,
      });
      return res.status(200).json(novaGestao);
    } catch (erro) {
      return res.status(500).json("Gestao não cadastrado" + erro);
    }
  }

  async index(req, res) {
    try {
      const gestaoImport = await gestao.findAll();
      return res.status(200).json(gestaoImport);
    } catch (erro) {
      return res.status(500).json("Erro ao encontrar a gestao" + erro);
    }
  }

  async filterIdGestao(req, res) {
    try {
      const gestaoFil = await gestao.findOne({
        where: { id: req.params.id },
      });
      console.log(gestaoFil);
      return res.status(200).json(gestaoFil);
    } catch (erro) {
      return res.status(500).json("Erro ao pegar as gestoes" + erro);
    }
  }

  async update(req, res) {
    try {
      await gestao.update(
        {
          idReserva: req.body.idReserva,
          idCliente: req.body.idCliente,
          custos: req.body.custos,
          descricao: req.body.descricao,
        },
        { where: { id: req.params.id } }
      );
      return res.status(200).json("Sucesso ao atualizar");
    } catch (erro) {
      return res.status(500).json("Erro ao atualizar" + erro);
    }
  }

  async delete(req, res) {
    try {
      await gestao.destroy({
        where: { id: req.params.id },
      });
      return res.status(200).json("Sucesso ao deletar");
    } catch (erro) {
      return res.status(500).json("Erro ao deletar" + erro);
    }
  }
}

module.exports = new gestaoController();
