//importar modelos aqui
//inicializa os modelos e conecta ao bd
const config = require('../config/bd');
const { Sequelize } = require('sequelize');
const Cliente = require('../models/Cliente');
const Reserva = require('../models/Reserva');
const Gestao = require('../models/Gestao');
const User = require('../models/User');

const models = [Cliente, Reserva, Gestao, User]

class Database {
    constructor() {
        this.connection = new Sequelize(config);
        this.init();
        this.associate();
    }
    init() {
        models.forEach((model) => model.init(this.connection));
    }

    associate() {
        models.forEach((model) => {
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });
    }
}

module.exports = new Database()