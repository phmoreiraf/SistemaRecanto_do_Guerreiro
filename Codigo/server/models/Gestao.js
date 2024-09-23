const { Sequelize, Model } = require("sequelize");

class Gestao extends Model {
    static init(sequelize) {
        super.init({
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },

                idCliente: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    references: {
                        model: "cliente",
                        key: "id",
                    },
                    onUpdate: "CASCADE",
                    onDelete: "SET NULL",
                },

                idReserva: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    references: {
                        model: "reserva",
                        key: "id",
                    },
                    onUpdate: "CASCADE",
                    onDelete: "SET NULL",
                },

                custos: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },

                descricao: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
            },

            {
                sequelize,
                modelName: "Gestao",
                freezeTableName: true,
                timestamps: true, // Adiciona timestamps automaticamente
            }
        );
    }
}

module.exports = Gestao;