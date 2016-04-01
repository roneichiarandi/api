const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI); //mongodb docker

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


