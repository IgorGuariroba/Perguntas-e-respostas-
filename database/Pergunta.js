const Sequelize = require("sequelize");
const connection = require("./database");

//Criar um modulo
const Pergunta = connection.define('perguntas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull:false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// Criar a tabela caso ela não exista
Pergunta.sync({force: false}).then(() => {});


//exportar 

module.exports = Pergunta;