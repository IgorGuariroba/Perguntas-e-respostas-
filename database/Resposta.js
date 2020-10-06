const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("resposta",{

    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    perguntaid: {
        type: Sequelize.INTEGER,
        allowNull: false

    }

});

// Criar a tabela caso ela não exista
Resposta.sync({force: false});


//exportar 

module.exports = Resposta;