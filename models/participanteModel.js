const {Schema, model } = require('mongoose');

const participanteSchema = Schema({

    cedula:{
        type: String,
        require: true
    },

    nombre:{
        type: String,
    },

    apellidos:{
        type: String,
    }
    
});

module.exports = model('participanteModel', participanteSchema);