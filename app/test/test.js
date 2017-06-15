var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

const _ = require('lodash');
const platform = require('platform');
const Benchmark = require('benchmark');

// benchmarking tools
var suite = new Benchmark.Suite;


// const Toxidrome = require('../models/toxidrome')
const Case = require('../models/case');
const Child = require('../models/child');

const Hemodynamic = require('../models/hemodynamic');
const Pleuro = require('../models/pulmonaire');
const Neurologic = require('../models/neurologic');


////////////////////////////////////////////////////////////////////////////////
let myPromise = new Promise((resolve, reject) => {
    let sim = [];
    let child_id = "5941025bb940186d55f23a04"
    // Selection des cas condidat
    Case.find({}, function(err, cas) {
        let cc = 0

        for (var i = 0; i < cas.length; i++) { // boucle sur les condidats potentiels
            console.log(cas.length);
            // Comparaison de deux par deux (L'un d'eux est constant, notre cas)

            const case_id = _.cloneDeep(cas[i].child);

            // extraction des deux condidat
            Hemodynamic.find({
                'child': {
                    $in: [child_id, case_id]
                }
            }, function(err, result) {
                let count = 0;
                let disimilarite = 0
                let similarite = 0
                if (result[0].marbrure != result[1].marbrure) {
                    disimilarite += 1
                    count++
                } else {
                    count++
                }
                if (result[0].extr_temp != result[1].extr_temp) {
                    disimilarite += 1
                    count++
                } else {
                    count++
                }
                if (result[0].turg_jugul != result[1].turg_jugul) {
                    disimilarite += 1
                    count++
                } else {
                    count++
                }
                if (result[0].hepat_jugul != result[1].hepat_jugul) {
                    disimilarite += 1
                    count++
                } else {
                    count++
                }
                if (result[0].diurese != result[1].diurese) {
                    disimilarite += 1
                    count++
                } else {
                    count++
                }
                if (result[0].auscu_card != result[1].auscu_card) {
                    disimilarite += 1
                    count++
                } else {
                    count++
                }


                Pleuro.find({
                    'child': {
                        $in: [child_id, case_id]
                    }
                }, function(err, result1) {

                    if (result1[0].cyanose != result1[1].cyanose) {
                        disimilarite += 1
                        count++
                    } else {
                        count++
                    }
                    if (result1[0].sueur != result1[1].sueur) {
                        disimilarite += 1
                        count++
                    } else {
                        count++
                    }
                    if (result1[0].rythme != result1[1].rythme) {
                        disimilarite += 1
                        count++
                    } else {
                        count++
                    }
                    if (result1[0].amplitude != result1[1].amplitude) {
                        disimilarite += 1
                        count++
                    } else {
                        count++
                    }
                    if (result1[0].auscul_pleuro.bruit != result1[1].auscul_pleuro.bruit) {
                        disimilarite += 1
                        count++
                    } else {
                        count++
                    }
                    if (result1[0].auscul_pleuro.toux != result1[1].auscul_pleuro.toux) {
                        disimilarite += 1
                        count++
                    } else {
                        count++
                    }


                    Child.find({
                        _id: {
                            $in: [child_id, case_id]
                        }
                    }, function(err, result2) {
                        var age1 = getAge(result2[0].age.num)
                        var age2 = getAge(result2[1].age.num)


                        disimilarite += distanceEuclidienne(age1, age2)
                        count++

                        Case.find({
                            child: {
                                $in: [child_id, case_id]
                            }
                        }, function(err, result3) {
                            // console.log(result3[1]);
                            // for (var i = 0; i < result3[0].sign.length; i++) {
                            //     for (var j = 0; j < result3[1].sign.length; j++) {
                            //         if (result3[0].sign[i].types != result3[1].sign[j].types) {
                            //             disimilarite += 1
                            //
                            //         }
                            //     }
                            // }
                            // count += result3[0].sign.length

                            disimilarite = disimilarite / count
                            similarite = 1 - disimilarite

                            sim.push({
                                'id': case_id,
                                'sim': similarite
                            })
                            cc++

                            if (cc === cas.length - 1) {
                                resolve(sim);
                            }
                        })

                    })
                })
            })

        }

    })

})

console.time("testWithoutToxi");
myPromise.then((sim) => {
    sim.sort(function(a, b) {
        return b.sim - a.sim
    })

})
console.timeEnd("testWithoutToxi");
