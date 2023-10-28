const { response } = require('express');

const Candidate = require('../models/candidates.model');
const User = require('../models/users.model');
const Voto = require('../models/votos.model');

/** =====================================================================
 *  GET CANDIDATES
=========================================================================*/
const getCandidates = async(req, res) => {

    try {

        const { desde, hasta, ...query } = req.body;

        const [candidates, total] = await Promise.all([
            Candidate.find(query)
            .limit(hasta)
            .skip(desde),
            Candidate.countDocuments()
        ]);

        for (let i = 0; i < candidates.length; i++) {
            const candidate = candidates[i];

            const votos = await Voto.find({candidate: candidate._id});

            let qty = 0;
            for (const voto of votos) {
                qty = qty + voto.qty;
            }

            candidates[i].votos = qty;
        }

        res.json({
            ok: true,
            candidates,
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
 *  GET CANDIDATE ID
=========================================================================*/
const getCandidateId = async(req, res = response) => {

    try {
        const id = req.params.id;

        const candidateDB = await Candidate.findById(id)
            .populate('User');
        if (!candidateDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun candidato con este ID'
            });
        }

        res.json({
            ok: true,
            center: candidateDB
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
    getCandidates,
    getCandidateId
};