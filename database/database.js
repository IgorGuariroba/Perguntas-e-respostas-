const Sequelize = require("sequelize"); // configurando o sequelize para conexão como banco

const connection = new Sequelize('pergunta','igor','123',{

    host:'mysql_db_container',
    dialect: 'mysql'

});



//exportar essa conecxão criada para outros arquivos
module.exports = connection;