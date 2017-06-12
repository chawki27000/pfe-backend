var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');


const Toxidrome = require('../models/toxidrome')
const Case = require('../models/case');
const Child = require('../models/child');

const Hemodynamic = require('../models/hemodynamic');
const Pleuro = require('../models/pulmonaire');
const Neurologic = require('../models/neurologic');

module.exports = function(app) {
    app.use('/v1/toxidrome/', router);
}

router.get('/', function(req, res, next) {
    res.json({
        'message': 'hello V1 API - Toxidrome'
    })
})



// var getCondidat = function(toxi, callback) {
//     var condidat = [];
//     Case.find({}, function (err, result) {
//
//
//         for (var j = 0; j < result.length; j++) { // boucle pour le parcours des cas
//             var tab = []
//             console.log("LENGTH : "+result[j].sign.length);
//
//             for (var i = 0; i < result[j].sign.length; i++) { // boucle pour extraction des signes
//                 tab.push({sign: result[j].sign[i].types, val: result[j].sign[i].gravity})
//             }
//             console.log(tab);
//             // sortir les toxidromes
//             // getToxidrome(toxi, function (tab) {
//             //     // comparaison des toxidromes. le 1er seulements
//             //     var toxidrome = tab[0];
//             //
//             //     // Matching
//             //     if (toxi === tab[0]) {
//             //         console.log("Matching");
//             //         condidat.push(result.child)
//             //     }
//             // })
//             if (toxi == result.toxidrome) {
//                 console.log("Matching");
//                 condidat.push(result.child)
//             }
//         }
//         callback(condidat)
//     })
// }

var getAge = function (age) {
    if (age >= 0 && age < 4) {
        return 0
    }
    else if (age >= 4 && age < 8) {
        return 0.5
    }
    else if (age >= 8) {
        1
    }
}

var distanceEuclidienne = function (num1, num2) {
    return Math.sqrt(Math.pow(num1, 2) - Math.pow(num2, 2))
}

router.post('/get', function(req, res, next) {

    console.log("SIGNES SAISIES");
    for (var i = 0; i < req.body.sign.length; i++) {
        console.log(req.body.sign[i].sign);
    }

    console.log("TOXIDROMES ASSOCIES");
    getToxidrome(req.body.sign, function (tab) {
        res.send(tab)
    })
})

router.post('/compare', function(req, res, next) {

    var sim = []
    var disimilarite = 0
    var similarite = 0
    var count = 0
    var child_id = req.body.child

    // Selection des cas condidat
    Case.find({toxidrome: req.body.toxidrome}, function (err, cas) {

        for (var i = 0; i < cas.length; i++) { // boucle sur les condidats potentiels
            disimilarite = 0
            // Comparaison de deux par deux (L'un d'eux est constant, notre cas)

            // extraction des deux condidat
            Hemodynamic.find({child: {$in: [child_id, cas[i].child]}}, function (err, result) {
                if (result[0].marbrure != result[1].marbrure) {
                    disimilarite += 1
                    count++
                } else {count++}
                if (result[0].extr_temp != result[1].extr_temp) {
                    disimilarite += 1
                    count++
                } else {count++}
                if (result[0].turg_jugul != result[1].turg_jugul) {
                    disimilarite += 1
                    count++
                } else {count++}
                if (result[0].hepat_jugul != result[1].hepat_jugul) {
                    disimilarite += 1
                    count++
                } else {count++}
                if (result[0].diurese != result[1].diurese) {
                    disimilarite += 1
                    count++
                } else {count++}
                if (result[0].auscu_card != result[1].auscu_card) {
                    disimilarite += 1
                    count++
                } else {count++}

                Pleuro.find({child: {$in: [child_id, cas[i].child]}}, function (err, result) {
                if (result[0].cyanose != result[1].cyanose) {
                    disimilarite += 1
                    count++
                } else {count++}
                if (result[0].sueur != result[1].sueur) {
                    disimilarite += 1
                    count++
                } else {count++}
                if (result[0].rythme != result[1].rythme) {
                    disimilarite += 1
                    count++
                } else {count++}
                if (result[0].amplitude != result[1].amplitude) {
                    disimilarite += 1
                    count++
                } else {count++}
                if (result[0].auscul_pleuro.bruit != result[1].auscul_pleuro.bruit) {
                    disimilarite += 1
                    count++
                } else {count++}
                if (result[0].auscul_pleuro.toux != result[1].auscul_pleuro.toux) {
                    disimilarite += 1
                    count++
                } else {count++}

                Child.find({_id: {$in: [child_id, cas[i].child]}}, function (err, result) {
                var age1 = getAge(result[0].age.num)
                var age2 = getAge(result[1].age.num)

                disimilarite += distanceEuclidienne(age1, age2)
                count++

                Case.find({child: {$in: [child_id, cas[i].child]}}, function (err, result) {
                for (var i = 0; i < result[0].sign.length; i++) {
                    for (var j = 0; j < result[1].sign.length; j++) {
                        if (result[0].sign[i].types != result[1].sign[j].types) {
                            disimilarite += 1

                        }
                    }
                }
                count += result[0].sign.length

                disimilarite = disimilarite/count
                similarite = 1 - disimilarite
                sim.push({'id': condidat[i], 'sim': similarite})
            })
            })
            })
            })
        }
    })

    getCondidat(req.body.toxidrome, function (condidat) {
        // res.send(condidat)
        for (var i = 0; i < condidat.length; i++) { // boucle sur les condidats potentiels

            disimilarite = 0
            // Comparaison de deux par deux (L'un d'eux est constant, notre cas)

            // extraction des deux condidat
            Hemodynamic.find({child: {$in: [child, condidat[i]]}}, function (err, result) {
                if (result[0].marbrure != result[1].marbrure) {
                    disimilarite += 1
                    count++
                } else {count++}
                if (result[0].extr_temp != result[1].extr_temp) {
                    disimilarite += 1
                    count++
                } else {count++}
                if (result[0].turg_jugul != result[1].turg_jugul) {
                    disimilarite += 1
                    count++
                } else {count++}
                if (result[0].hepat_jugul != result[1].hepat_jugul) {
                    disimilarite += 1
                    count++
                } else {count++}
                if (result[0].diurese != result[1].diurese) {
                    disimilarite += 1
                    count++
                } else {count++}
                if (result[0].auscu_card != result[1].auscu_card) {
                    disimilarite += 1
                    count++
                } else {count++}

                Pleuro.find({child: {$in: [child, condidat[i]]}}, function (err, result) {
                if (result[0].cyanose != result[1].cyanose) {
                    disimilarite += 1
                    count++
                } else {count++}
                if (result[0].sueur != result[1].sueur) {
                    disimilarite += 1
                    count++
                } else {count++}
                if (result[0].rythme != result[1].rythme) {
                    disimilarite += 1
                    count++
                } else {count++}
                if (result[0].amplitude != result[1].amplitude) {
                    disimilarite += 1
                    count++
                } else {count++}
                if (result[0].auscul_pleuro.bruit != result[1].auscul_pleuro.bruit) {
                    disimilarite += 1
                    count++
                } else {count++}
                if (result[0].auscul_pleuro.toux != result[1].auscul_pleuro.toux) {
                    disimilarite += 1
                    count++
                } else {count++}

                Child.find({_id: {$in: [child, condidat[i]]}}, function (err, result) {
                var age1 = getAge(result[0].age.num)
                var age2 = getAge(result[1].age.num)

                disimilarite += distanceEuclidienne(age1, age2)
                count++

                Case.find({child: {$in: [child, condidat[i]]}}, function (err, result) {
                for (var i = 0; i < result[0].sign.length; i++) {
                    for (var j = 0; j < result[1].sign.length; j++) {
                        if (result[0].sign[i].types != result[1].sign[j].types) {
                            disimilarite += 1

                        }
                    }
                }
                count += result[0].sign.length

                disimilarite = disimilarite/count
                similarite = 1 - disimilarite
                sim.push({'id': condidat[i], 'sim': similarite})
            })
            })
            })
            })
        }

    })
    console.log(sim);
    res.send(sim)
})
