const { where } = require("sequelize");
const reserva = require("../models/Reserva");
const fs = require("fs").promises;
const path = require("path");

class reservaController {
    async create(req, res) {
        try {
            const novaReserva = await reserva.create({
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                data: req.body.data,
                hora: req.body.hora,
                idCliente: req.body.idCliente,
                adicionais: req.body.adicionais,
                status: req.body.status,
            });
            return res.status(200).json(novaReserva);
        } catch (erro) {
            return res.status(500).json("Reserva não cadastrada" + erro);
        }
    }
    async filter(req, res) {
        try {
            const { data, status } = req.query;
            const reservaFil = await reserva.findAll({
                where: {
                    data: data,
                    status: status,
                },
            });
            console.log(reservaFil);
            return res.status(200).json(reservaFil);
        } catch (erro) {
            return res.status(500).json("Erro ao encontrar a reserva" + erro);
        }
    }

    async index(req, res) {
        try {
            const reservasImport = await reserva.findAll();
            return res.status(200).json(reservasImport);
        } catch (erro) {
            return res.status(500).json("Erro ao encontrar as reservas" + erro);
        }
    }

    async filterIdReserva(req, res) {
        try {
            const reservasFil = await reserva.findOne({
                where: { id: req.params.id },
            });
            console.log(reservasFil);
            return res.status(200).json(reservasFil);
        } catch (erro) {
            return res.status(500).json("Erro ao pegar as reservas" + erro);
        }
    }

    async updateStatus(req, res) {
        try {
            await reserva.update({
                status: req.body.status,
            }, { where: { id: req.params.id } });
            return res.status(200).json("Sucesso ao atualizar a reserva");
        } catch (erro) {
            return res.status(500).json("Erro ao atualizar" + erro);
        }
    }
    async update(req, res) {
        try {
            await reserva.update({
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                data: req.body.data,
                hora: req.body.hora,
                idCliente: req.body.idCliente,
                adicionais: req.body.adicionais,
                status: req.body.status,
            }, { where: { id: req.params.id } });
            return res.status(200).json("Sucesso ao atualizar a reserva");
        } catch (erro) {
            return res.status(500).json("Erro ao atualizar" + erro);
        }
    }

    async delete(req, res) {
        try {
            await reserva.destroy({
                where: { id: req.params.id },
            });
            return res.status(200).json("Sucesso ao deletar");
        } catch (erro) {
            return res.status(500).json("Erro ao deletar" + erro);
        }
    }
}

module.exports = new reservaController();