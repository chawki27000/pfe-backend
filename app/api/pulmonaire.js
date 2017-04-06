var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

var RuleEngine = require('node-rules');
const rule = require('../expert_system/pulmonaire_rules');

const Model = require('../models/pulmonaire');

module.exports = function (app) {
    app.use('/v1/pulmonaire/', router);
}

router.get('/', function (req, res, next) {
    res.json({
        'message': 'hello V1 API - Pleuro-pulmonaire'
    })
})

router.post('/insert', function (req, res, next) {
    //params extraction
    const params = {
        doctor: req.body.doctor,
        child: req.body.child,
        fr: req.body.fr,
        amplitude: req.body.amplitude,
        spo2: req.body.spo2,
        fio2: req.body.fio2,
        rythme: req.body.rythme,
        cyanose: req.body.cyanose,
        sign_lutte: req.body.sign_lutte,
        sueur: req.body.sueur,
        auscul_pleuro: {
            bruit: req.body.bruit,
            toux: req.body.toux
        }
    }

    // saving data
    const modelSave = new Model(params);
    modelSave.save((err, result) => {
        if (err){
            res.json({'success': false})
        }
        res.json({
            'success': true,
            'id': result._id
        })
    })
})

router.get('/all', function (req, res, next) {
    Model.find({}, function (err, result) {
        if (err){
            res.json({'success': false})
        }
        res.json({
            'success': true,
            'data': result
        })
    })
})
