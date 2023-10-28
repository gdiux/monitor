const { response } = require('express');

const Center = require('../models/centers.model');

/** =====================================================================
 *  GET CENTERS
=========================================================================*/
const getCenters = async(req, res) => {

    try {

        const { desde, hasta, ...query } = req.body;

        const [centers, total] = await Promise.all([
            Center.find(query)
            .limit(hasta)
            .skip(desde),
            Center.countDocuments()
        ]);

        res.json({
            ok: true,
            centers,
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
 *  GET CENTER ID
=========================================================================*/
const getCenterId = async(req, res = response) => {

    try {
        const id = req.params.id;

        const centerDB = await Center.findById(id);
        if (!centerDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun centro de votación con este ID'
            });
        }

        res.json({
            ok: true,
            center: centerDB
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
    getCenters,
    getCenterId
};