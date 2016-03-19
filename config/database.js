const mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.DB_1_PORT_27017_TCP_ADDR + '/node-meetup'); //mongodb docker

const db = mongoose.connection;
const Schema = mongoose.Schema;

db.on('error', function(err){
	console.log('Erro de conexao.', err)
});
db.once('open', function () {
	console.log('Conexão aberta.')
});


module.exports = {
    mongoose : mongoose,
    Schema     : mongoose.Schema
};


