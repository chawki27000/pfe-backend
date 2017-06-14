var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

var RuleEngine = require('node-rules');
const rule = require('../expert_system/hemodynamic_rules');

const Model = require('../models/hemodynamic');

module.exports = function(app) {
    app.use('/v1/hemodynamic/', router);
};

router.get('/', function(req, res, next) {
    res.json({
        'message': 'hello V1 API - Hemodynamic'
    });
});

router.post('/insert', function(req, res, next) {
    //params extraction
    const params = {
        doctor: req.body.doctor,
        child: req.body.child,
        pouls: req.body.pouls,
        ta: req.body.ta,
        marbrure: req.body.marbrure,
        trc: req.body.trc,
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

router.get('/query/:id', function(req, res, next) {
    Model.findById(req.params.id, function(err, result) {
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

router.get('/query/cod/:id', function(req, res, next) {
    Model.find({child: req.params.id}, function(err, result) {
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

router.post('/expert', function(req, res, next) {

    var tab = {}
    //rule engine declaration
    var R = new RuleEngine(rule.rules1) // FC Rule
    var R1 = new RuleEngine(rule.rules2) // TA Rule
    var R2 = new RuleEngine(rule.rules3) // Temp Rule

    // Fact R
    var fact = {
        "age": req.body.age,
        "types": req.body.types,
        "fc": req.body.fc,
    }

    // Fact R1
    var fact1 = {
        "ta": req.body.ta
    }

    // Fact R2
    var fact2 = {
        "temp": req.body.temp
    }

    // Callback Functions
    function rule1(callback) {
        // Lunch
        R.execute(fact, (result) => {
            tab.fc = result.result
            callback()
        })
    }

    function rule2(callback) {
        // Lunch
        R1.execute(fact1, (result) => {
            tab.ta = result.result
        })
    }

    function rule3(callback) {
        // Lunch
        R2.execute(fact2, (result) => {
            tab.temp = result.result
        })
    }

    function logTab() {
        res.json(tab)
    }

    rule1(logTab)
    rule2(logTab)
    rule3(logTab)


});
