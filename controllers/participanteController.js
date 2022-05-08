const {response} = require('express');
const participanteModel = require('../models/participanteModel');


const getParticipantes = async (req, res = response) => {

    try {
        
        const participantes = await participanteModel.find();
    
        res.status(200).json({
            ok: true,
            participantes
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
    }

}
const getParticipante = async ( req, res = response) => {

    try {        
        const {id} = req.params;

        const participante = await participanteModel.findOne({id})

        if(!participante){

            return res.status(400).json({
                ok:false,
                msg: 'Ese participante no existe'
            })

        }
        res.status(200).json({
            ok: true,
            participante
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
        
    }
}

const crearParticipante = async ( req, res = response ) => {

    try {

        const {cedula, nombre, apellidos} = req.body;

        let participante = await participanteModel.findOne({cedula})

        if(participante){
            return res.status(400).json({
                ok:false,
                msg: 'Ese participante ya existe'
            })
        }
        
        participante = new participanteModel(req.body)
        participante.save()

        res.status(201).json({
            ok: true
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
    }
}

const eliminarParticipante = async ( req, res = response) => {

    try {

        const {id} = req.params;

        let participante = await participanteModel.findOne({id})

        if(!participante){
            return res.status(400).json({
                ok:false,
                msg: 'Ese participante no existe'
            })
        }

        await participanteModel.deleteOne({id})
    
        res.status(200).json({
            ok: true
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
    }

}

const actualizarParticipante = async ( req, res = response) => {

    try {
        
        const {id} = req.params;

        let participante = await participanteModel.findOne({id})

        if(!participante){
            return res.status(400).json({
                ok:false,
                msg: 'Ese participante no existe'
            })
        }

        await participanteModel.updateOne({id}, req.body)
    
        res.status(200).json({
            ok: true
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false
        })
    }

}

module.exports = {
    getParticipantes,
    getParticipante,
    crearParticipante,
    actualizarParticipante,
    eliminarParticipante,

}