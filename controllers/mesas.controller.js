const { response } = require('express');

const ObjectId = require('mongoose').Types.ObjectId;

const Mesa = require('../models/mesas.model');
const Center = require('../models/centers.model');
const User = require('../models/users.model');

/** =====================================================================
 *  GET MESAS
=========================================================================*/
const getMesas = async(req, res) => {

    try {

        const { desde, hasta, ...query } = req.body;

        const [mesas, total] = await Promise.all([
            Mesa.find(query)
            .populate('center')
            .populate('votacion.candidate')
            .populate('votacion.testigo', 'email name cedula role address img status fecha uid')
            .populate('staff', 'email name cedula role address img status fecha uid')
            .limit(hasta)
            .skip(desde),
            Mesa.countDocuments(query)
        ]);

        res.json({
            ok: true,
            mesas,
            total
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });

    }


};

/** =====================================================================
 *  GET MESA ID
=========================================================================*/
const getMesasId = async(req, res = response) => {

    try {

        const uid = req.uid;
        const id = req.params.id;

        const mesaDB = await Mesa.findById(id)
            .populate('center')
            .populate('votacion.candidate')
            .populate('votacion.testigo', 'email name cedula role address img status fecha uid')
            .populate('staff', 'email name cedula role address img status fecha uid');
        if (!mesaDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ninguna mesa de votación con este ID'
            });
        }

        // AUTHORIZE
        const user = await User.findById(uid);
        if (user.role !== 'ADMIN') {
            if ( (String)(new ObjectId(user._id)) !== (String)(new ObjectId(mesaDB.staff._id))) {
                return res.status(403).json({
                    ok: false,
                    msg: 'No tienes la authorizacion necesaria'
                });                
            }
        }

        res.json({
            ok: true,
            mesa: mesaDB
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};


// EXPORTS
module.exports = {
    getMesas,
    getMesasId
};