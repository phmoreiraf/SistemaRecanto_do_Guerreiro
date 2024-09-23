const { where } = require('sequelize');
const cliente = require('../models/Cliente');
const fs = require('fs').promises;
const path = require('path');

class clienteController {
    async create(req, res) {
        try {
            const novoCliente = await cliente.create({
                nome: req.body.nome,
                telefone: req.body.telefone,
                email: req.body.email,
                logradouro: req.body.logradouro,
                complemento: req.body.complemento,
                bairro: req.body.bairro
            })
            return res.status(200).json(novoCliente)
        } catch (erro) {
            return res.status(500).json('Cliente não cadastrado' + erro)
        }
    }

    async index(req, res) {
        try {
            const clientesImport = await cliente.findAll()
            return res.status(200).json(clientesImport)
        } catch (erro) {
            return res.status(500).json('Erro ao encontrar os clientes' + erro)
        }
    }
    
    async filterIdCliente(req, res) {
        try {
            const clientesFil = await cliente.findOne({
                where: { id: req.params.id }
            })
            console.log(clientesFil)
            return res.status(200).json(clientesFil)
        } catch (erro) {
            return res.status(500).json('Erro ao pegar os clientes' + erro)
        }
    }

    async update(req, res) {
        try {
            await cliente.update({
                nome: req.body.nome,
                telefone: req.body.telefone,
                email: req.body.email,
                logradouro: req.body.logradouro,
                complemento: req.body.complemento,
                bairro: req.body.bairro,
            }, { where: { id: req.params.id } })
            return res.status(200).json('Sucesso ao atualizar o cliente')
        } catch (erro) {
            return res.status(500).json('Erro ao atualizar' + erro)
        }
    }

    async delete(req, res) {
        try {
            await cliente.destroy({
                where: { id: req.params.id }
            })
            return res.status(200).json('Sucesso ao deletar')
        } catch (erro) {
            return res.status(500).json('Erro ao deletar' + erro)
        }
    }

}

module.exports = new clienteController()