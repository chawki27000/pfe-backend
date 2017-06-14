var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

const Model = require('../models/drug');

module.exports = function(app) {
    app.use('/v1/drug/', router);
}

router.get('/', function(req, res, next) {
    res.json({
        'message': 'hello V1 API - drug'
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

router.post('/find/', function(req, res, next) {
    
    Model.find({'_id': req.body.medoc}, function(err, result) {
        console.log(result);
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
