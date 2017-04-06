var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

var request = require("request");

// Mongoose link
const Hemo = require('../models/hemodynamic');
const Pleuro = require('../models/pulmonaire');
const Child = require('../models/child');

// Expert System
const hemoExpert = require('./hemodynamic');

// Express Route
module.exports = function(app) {
    app.use('/v1/expert/', router);
};

router.get('/', function (req, res, next) {
    res.json({
        'message': 'hello V1 API - Expert'
    });
});



router.post('/on', function (req, res, next) {
    //params extraction
    var child_id = req.body.child_id
    var hemo_id = req.body.hemo_id
    var pleuro_id = req.body.pleuro_id

    //data extraction
    Child.findOne({_id: child_id}, function (err, child) {
        if (err) return handleError(err);
        Hemo.findOne({_id: hemo_id}, function (err, hemo) {
            if (err) return handleError(err);
            Pleuro.findOne({_id: pleuro_id}, function (err, pleuro) {

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
    })


});
