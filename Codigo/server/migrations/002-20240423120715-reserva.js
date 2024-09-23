"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Reserva", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            titulo: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            descricao: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            data: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            hora: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            idCliente: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "Cliente",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            adicionais: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            status: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal(
                    "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
                ),
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Reserva");
    },
};