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

router.get('/query/:id', function (req, res, next) {
    Model.find({child: req.params.id},null,{sort:{'createdAt': -1}}, function (err, result) {
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
})

router.get('/query/id/:id', function (req, res, next) {
    Model.findById(req.params.id, function (err, result) {
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
})

router.post('/update', function (req, res, next) {
    Model.findById(req.body.id, function (err, result) {
        if (err) {
            res.json({'success': false})
        }
        //params extraction and update the model
        result.feedback = req.body.feedback
        result.comment = req.body.comment
        result.explanation = req.body.explanation

        // Save it
        result.save(function (err, user) {
            res.json({'success': true})
        })
    })
})
