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

// Functions
var getToxidrome = function (signs) {
    Toxidrome.find({}, function (err, result) {

        var tab = []

        for (var i = 0; i < result.length; i++) { // boucle sur la collection

            var count = 0 // compteur

            for (var j = 0; j < result[i].sign.length; j++) { // boucle sur les signes du toxidrome

                for (var k = 0; k < signs.length; k++) { // boucle sur les signes de l'enfant
                    if (signs[k].sign == result[i].sign[j].name) {
                        count++;
                    }
                }
            }
            // console.log("Toxidrome : "+result[i].name+", score : "+count/result[i].sign.length);
            tab.push({"toxidrome": result[i].name, "score": count/result[i].sign.length})
        }
        tab.sort(function(a, b) {
          return b.score - a.score
        })
        return tab[0]
    })
}

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
        modelSave.drugs.push({id:params.drugs[i].id, quantity: params.drugs[i].val,
                            dose: params.drugs[i].dose})
    }
    for (var i = 0; i < params.sign.length; i++) {
        modelSave.sign.push({types: params.sign[i].sign, gravity: params.sign[i].val})
    }

    // selection du toxidrome
    modelSave.toxidrome = getToxidrome(params.sign)

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

router.post('/approve', function(req, res, next) {
    console.log("ID : "+req.body.id);
    console.log("approve : "+req.body.approve);
    Model.find({child: req.body.id}, function (err, result) {
        if (err) {
            res.json({'success': false})
        }
        //params extraction and update the model.
        // if(req.body.approve){
        //     result.expert.approve = true
        // } else {
        //     result.expert.approve = false
        //     result.expert.proposition = req.body.proposition
        // }

        // Save it
        result.save(function (err, user) {
            res.json({'success': true})
        })
    })
})
