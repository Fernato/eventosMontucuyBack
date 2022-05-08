const {response} = require('express');
const bcrypt = require('bcryptjs/dist/bcrypt');

const usuarioModel = require('../models/usuarioModel');

const getUsuarios = async (req, res = response) => {

    try {
        
        const usuarios = await usuarioModel.find();
    
        res.status(200).json({
            ok:true,
            usuarios
        })
    } catch (error) {

        console.log(error)
       res.status(500).json({
           ok:false
       })
        
    }


}

const crearUsuario = async ( req, res = response ) => {
   const {usuario, password} = req.body;

   try {
       
        let usuarioM = await usuarioModel.findOne({usuario})

        if( usuarioM){
            return res.status(400).json({
                ok:false,
                msg: 'Ya existe ese usuario'
            })
        }
        usuarioM = new usuarioModel(req.body)

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuarioM.password = bcrypt.hashSync(password, salt);

        await usuarioM.save()
            
        res.status(201).json({
            ok: true,
            uid: usuarioM.id
        })

    } catch (error) {
       console.log(error)
       res.status(500).json({
           ok:false
       })
       
   }
}

const login = async ( req, res = response) => {

    const {usuario, password} = req.body;

    try {
        let usuarioM = await usuarioModel.findOne({usuario})

        if( !usuarioM){
            return res.status(400).json({
                ok:false,
                msg: 'Usuario o contraseña no son correctos'
            })
        }
        //confirmar contraseña

        const validPassword = bcrypt.compareSync( password , usuarioM.password);

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'Contraseña incorrecta'
            })
        }

        res.json({
            ok: true,
            uid: usuarioM.id
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
    }

    
}

module.exports = {
    getUsuarios,
    crearUsuario,
    login
}