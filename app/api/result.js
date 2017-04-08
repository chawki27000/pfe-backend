var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');


const Model = require('../models/result');

module.exports = function(app) {
    app.use('/v1/result/', router);
}

router.get('/', function(req, res, next) {
    res.json({
        'message': 'hello V1 API - Result'
    })
})

router.post('/insert', function(req, res, next) {
    //params extraction
    const params = {
        doctor: req.body.doctor,
        child: req.body.child,
        hemo_id: req.body.hemo_id,
        pleuro_id: req.body.pleuro_id,
        neuro_id: req.body.neuro_id,
        hemo: {
            fc: req.body.fc,
            ta: req.body.ta,
            temp: req.body.temp,
        },
        pleuro: {
            fr: req.body.fr,
            resp: req.body.resp,
            ampl: req.body.ampl,
        },
    }
    // saving data
    const modelSave = new Model(params);
    modelSave.save((err, result) => {
        if (err) {
            res.json({
                'success': false
            })
        }
        res.json({
            'success': true,
            'id': result._id
        })
    })
})
