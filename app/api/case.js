var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

const Model = require('../models/case');

module.exports = function(app) {
    app.use('/v1/case/', router);
}

router.get('/', function(req, res, next) {
    res.json({
        'message': 'hello V1 API - Case'
    })
})

router.get('/all', function(req, res, next) {
    Model.find({}, function(err, result) {
        if (err) {
            res.json({
                'success': false
            })
        }
        res.json({
            'success': true,
            'data': result
        })
    })
});

router.post('/insert', function(req, res, next) {
    //params extraction
    const params = {
        doctor: req.body.doctor,
        child: req.body.child,
        taken_hour: {
            hour: req.body.hour,
            minute: req.body.minute,
        },
        taken_place: req.body.taken_place,
        alone: req.body.alone,
        drugs: req.body.drugs,
        sign: req.body.sign,
        diagnostic: req.body.diagnostic
    }
    // saving data
    const modelSave = new Model();
    // manuel data receive
    modelSave.doctor = params.doctor
    modelSave.child = params.child
    modelSave.taken_hour.hour = params.taken_hour.hour
    modelSave.taken_hour.minute = params.taken_hour.minute
    modelSave.taken_place = params.taken_place
    modelSave.alone = params.alone
    modelSave.diagnostic = params.diagnostic
    for (var i = 0; i < params.drugs.length; i++) {
        console.log(params.drugs[i]);
        modelSave.drugs.push({id:params.drugs[i].id, quantity: params.drugs[i].val})
    }
    for (var i = 0; i < params.sign.length; i++) {
        modelSave.sign.push({types: params.sign[i].sign, gravity: params.sign[i].val})
    }

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

router.post('/insert', function(req, res, next) {
    //params extraction
    const params = {
        doctor: req.body.doctor,
        child: req.body.child,
        taken_hour: {
            hour: req.body.hour,
            minute: req.body.minute,
        },
        taken_place: req.body.taken_place,
        alone: req.body.alone,
        drugs: req.body.drugs,
        sign: req.body.sign,
        diagnostic: req.body.diagnostic
    }
    // saving data
    const modelSave = new Model();
    // manuel data receive
    modelSave.doctor = params.doctor
    modelSave.child = params.child
    modelSave.taken_hour.hour = params.taken_hour.hour
    modelSave.taken_hour.minute = params.taken_hour.minute
    modelSave.taken_place = params.taken_place
    modelSave.alone = params.alone
    modelSave.diagnostic = params.diagnostic
    for (var i = 0; i < params.drugs.length; i++) {
        console.log(params.drugs[i]);
        modelSave.drugs.push({id:params.drugs[i].id, quantity: params.drugs[i].val})
    }
    for (var i = 0; i < params.sign.length; i++) {
        modelSave.sign.push({types: params.sign[i].sign, gravity: params.sign[i].val})
    }

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
