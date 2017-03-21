var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

const Model = require('../models/hemodynamic');

module.exports = function (app) {
    app.use('/v1/hemodynamic/', router);
};

router.get('/', function (req, res, next) {
    res.json({
        'message': 'hello V1 API - Hemodynamic'
    });
});

router.post('/insert', function (req, res, next) {
    //params extraction
    const params = {
        doctor: req.body.doctor,
        child: req.body.child,
        pouls: req.body.pouls,
        ta: req.body.ta,
        marbrure: req.body.marbrure,
        extr_temp: req.body.extr_temp,
        temp: req.body.temp,
        turg_jugul: req.body.turg_jugul,
        hepat_jugul: req.body.hepat_jugul,
        pres_vein: req.body.pres_vein,
        diurese: req.body.diurese,
        auscu_card: req.body.auscu_card,
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
