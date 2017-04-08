var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

const Model = require('../models/neurologic');

module.exports = function(app) {
    app.use('/v1/neurologic/', router);
};

router.get('/', function(req, res, next) {
    res.json({
        'message': 'hello V1 API - Neurologic'
    });
})

router.post('/insert', function(req, res, next) {
    //params extraction
    const params = {
        doctor: req.body.doctor,
        child: req.body.child,
        param1: req.body.param1,
        param2: req.body.param2,
        param3: req.body.param3,
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
});
