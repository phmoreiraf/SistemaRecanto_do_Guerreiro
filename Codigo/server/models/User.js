const { Sequelize, Model } = require("sequelize");

class User extends Model {
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

                email: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },

                senha: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
            },

            {
                sequelize,
                modelName: "User",
                freezeTableName: true,
                timestamps: true, // Adiciona timestamps automaticamente
            }
        );
    }
}

module.exports = User;