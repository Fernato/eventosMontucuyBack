const {Schema, model } = require('mongoose');

const usuarioSchema = Schema({

    usuario:{
        type: String,
        require: true,
        unique: true
    },

    password:{
        type: String,
    }
    
});

module.exports = model('usuarioModel', usuarioSchema);