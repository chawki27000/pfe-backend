var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

var request = require("request");

// Mongoose link
const Hemo = require('../models/hemodynamic');
const Pleuro = require('../models/pulmonaire');
const Child = require('../models/child');
const Case = require('../models/case');
const Drug = require('../models/drug');

// Expert System
const hemoExpert = require('./hemodynamic');

var RuleEngine = require('node-rules');
const rule_ibu = require('../expert_system/ibuprofene_rules');
const rule_asp = require('../expert_system/aspirine_rules');
const rule_parac = require('../expert_system/paracetamol_rules_2');

// Express Route
module.exports = function(app) {
    app.use('/v1/expert/', router);
};

router.get('/', function (req, res, next) {
    res.json({
        'message': 'hello V1 API - Expert'
    });
});

router.post('/on/1', function (req, res, next) {
    //params extraction
    var child_id = req.body.child_id
    var hemo_id = req.body.hemo_id

    //data extraction
    Child.findOne({_id: child_id}, function (err, child) {
        if (err) return handleError(err);
        Hemo.findOne({_id: hemo_id}, function (err, hemo) {
            if (err) return handleError(err);
                request({
                    uri: "http://localhost:3000/v1/hemodynamic/expert",
                    method: "POST",
                    form: {
                        age: child.age.num,
                        types: child.age.types,
                        fc: hemo.pouls,
                        ta: hemo.ta,
                        temp: hemo.temp
                    }
                }, function (error, response, body) {
                    res.send(body) // Expertise Hemodynamique
            })
        })
    })
});

router.post('/on/2', function (req, res, next) {

    //params extraction
    var child_id = req.body.child_id
    var pleuro_id = req.body.pleuro_id

    //data extraction
    Child.findOne({_id: child_id}, function (err, child) {
        if (err) return handleError(err)
        Pleuro.findOne({_id: pleuro_id}, function (err, pleuro) {
            if (err) return handleError(err);
                request({
                    uri: "http://localhost:3000/v1/pulmonaire/expert",
                    method: "POST",
                    form: {
                        age: child.age.num,
                        types: child.age.types,
                        fr: pleuro.fr,
                        ampl: pleuro.amplitude
                    }
                }, function (error, response, body) {
                    console.log(body);
                    var ampl = ''
                    // Add Amplitude Expert
                    if (pleuro.amplitude == "3") {
                        ampl = "Polypnée"
                    }
                    else if (pleuro.amplitude == "2") {
                        ampl = "Oligopnée"
                    }
                    else if (pleuro.amplitude == "0") {
                        ampl = "Apnée"
                    }
                    res.json({
                        body: body,
                        ampl: ampl
                    }) // Expertise Pleuro-pulmonaire
                })
        })
    })
})

router.post('/toxicity/', function (req, res, next) {

    //params extraction
    var child_id = req.body.child_id

    // extraction des informations sur l'enfant
    Child.findOne({_id: child_id}, function (err, child) {
        if (err) return handleError(err)

        // extraction des informations maladives sur l'enfant
        Case.findOne({child: child_id},{},{ sort: { 'createdAt' : -1 } }, function (err, result) {
            if (err) return handleError(err)
            console.log("result : "+result);

            // extraction des medicament
            var tab_drug = []
            for (var i = 0; i < result.drugs.length; i++) {
                tab_drug.push(result.drugs[i].id)
            }

            Drug.find({_id: {$in: tab_drug}}, function (err, drugs) {
                if (err) return handleError(err)
                // var
                var paracetamol = 0;
                var aspirine = 0;
                var ibuprofene = 0;
                console.log("DRUGS : "+drugs);
                for (var j = 0; j < drugs.length; j++) {

                    //console.log(drugs[j].masse)
                    for (var i = 0; i < result.drugs.length; i++) {
                        //console.log(drugs[j]._id+" : "+result.drugs[i].id);
                        if (String(drugs[j]._id) == String(result.drugs[i].id)) {

                            if (drugs[j].category == 'Antipyrétique') {
                                paracetamol += (drugs[j].masse*result.drugs[i].quantity)
                            }
                            else if (drugs[j].category == 'Antalgique') {
                                aspirine += (drugs[j].masse*result.drugs[i].quantity)
                            }
                            else if (drugs[j].category == 'anti-inflammatoire') {
                                ibuprofene += (drugs[j].masse*result.drugs[i].quantity)
                            }
                        }
                    }
                }
                res.json({
                    "paracetamol": paracetamol,
                    "aspirine": aspirine,
                    "ibuprofene": ibuprofene,
                })
            })

        })

    })

})

router.post('/toxicity/expert', function (req, res, next) {

    //params extraction
    var child_id = req.body.child_id
    var aspirine = req.body.aspirine
    var ibuprofene = req.body.ibuprofene
    var paracetamol = req.body.paracetamol

    Child.findOne({_id: child_id}, function (err, child) {
        if (err) return handleError(err)

        // extraction des informations maladives sur l'enfant
        Case.findOne({child: child_id},{},{ sort: { 'createdAt' : -1 } }, function (err, result) {
            if (err) return handleError(err)

            // Prepare fact
            var fact_ibu = {
                "dose" : ibuprofene,
                "poids": result.weight,
                "duree": result.taken_hour.hour
            }
            var Ribu = new RuleEngine(rule_ibu.rules1)

            Ribu.execute(fact_ibu, function(result1) {
                // Prepare fact
                var fact_asp = {
                    "dose" : aspirine,
                    "poids": result.weight,
                    "duree": result.taken_hour.hour,
                    "vomi": false
                }
                var Rasp = new RuleEngine(rule_asp.rules1)

                Rasp.execute(fact_asp, function(result2) {
                    // Prepare fact
                    var fact_parac = {
                        "dose" : paracetamol,
                        "dose_inconnu" : false,
                        "poids": result.weight,
                        "duree": result.taken_hour.hour,
                        "vomissement": false,
                        "somnolence": false,
                        "nausee": false,
                        "douleur": false,
                        "icm": false,
                    }

                    var Rparac = new RuleEngine(rule_parac.rules1)
                    Rparac.execute(fact_parac, function(result3) {
                        res.json({
                            "ibuprofene": result1,
                            "aspirine": result2,
                            "paracetamol": result3,
                        })
                    })

                })
            })

        })
    })
})
