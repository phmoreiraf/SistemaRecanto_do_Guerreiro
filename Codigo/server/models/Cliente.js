const { Sequelize, Model } = require("sequelize");

class Cliente extends Model {
    static init(sequelize) {
        super.init({
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },

                nome: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },

                telefone: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },

                email: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },

                logradouro: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },

                complemento: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },

                bairro: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
            },

            {
                sequelize,
                modelName: "Cliente",
                freezeTableName: true,
                timestamps: true, // Adiciona timestamps automaticamente
            }
        );
    }
}

module.exports = Cliente;