var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

const Child = require('../models/child');

module.exports = function (app) {
    app.use('/v1/child/', router);
};

router.get('/', function (req, res, next) {
    res.json({
        'message': 'hello V1 API - Child'
    });
});

router.get('/all', function(req, res, next) {
    Child.find({}, function(err, result) {
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


router.get('/query/:id', function(req, res, next) {
    Child.findById(req.params.id, function(err, result) {
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
router.post('/insert', function (req, res, next) {
    //params extraction
    const params = {
        age: {
            num: req.body.num,
            types: req.body.types
        },
        weight: req.body.weight,
        school_mother: req.body.school_mother,
        school_father: req.body.school_father,
        address_parent: req.body.address_parent,
    }
    // saving data
    const modelSave = new Child(params);
    modelSave.save((err, result) => {
        if (err) {
            res.json({'success': false})
        }
        res.json({
            'success': true,
            'id': result._id
        })
    });

});
