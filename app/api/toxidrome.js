var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');


const Toxidrome = require('../models/toxidrome')
const Case = require('../models/case');

module.exports = function(app) {
    app.use('/v1/toxidrome/', router);
}

router.get('/', function(req, res, next) {
    res.json({
        'message': 'hello V1 API - Toxidrome'
    })
})

router.post('/get', function(req, res, next) {

    console.log("SIGNES SAISIES");
    for (var i = 0; i < req.body.sign.length; i++) {
        console.log(req.body.sign[i].sign);
    }

    console.log("TOXIDROMES ASSOCIES");
    Toxidrome.find({}, function (err, result) {



        for (var i = 0; i < result.length; i++) { // bouble sur la collection

            var count = 0 // compteur

            for (var j = 0; j < result[i].sign.length; j++) { // bouble sur les signes du toxidrome
                // console.log(result[i].sign.length)
                for (var k = 0; k < req.body.sign.length; k++) { // boucle sur les signes de l'enfant
                    if (req.body.sign[k].sign == result[i].sign[j].name) {
                        count++;
                    }
                }

            }
            console.log("Toxidrome : "+result[i].name+", score : "+count/result[i].sign.length);
        }
    })

})
