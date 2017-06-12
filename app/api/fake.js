var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

var faker = require('faker');
var request = require("request");

const Child = require('../models/child');
const Case = require('../models/case');
const Hemodynamic = require('../models/hemodynamic');
const Pulmonaire = require('../models/pulmonaire');
const Result = require('../models/result');

module.exports = function(app) {
    app.use('/v1/fake/', router);
}

router.get('/', function(req, res, next) {
    res.json({
        'message': 'hello V1 API - Fake'
    })
})

// 58beb17cec9e6a23e393c370
router.get('/generate/:number', function(req, res, next) {
    var number = req.params.number


    for (var i = 0; i < number; i++) { // LOOP FOR DATA GENERATING
        // generate child data
        const childSave = new Child({
            age: {
                num: faker.random.number(15),
                types: faker.random.arrayElement(['years', 'mounth'])
            },
            weight: faker.random.number({'min': 5, 'max': 60}),
            school_mother: faker.random.number(14),
            school_father: faker.random.number(14),
            address_parent: faker.address.streetAddress(),
        });
        childSave.save((err, result) => {

        // generate hemodynamic data
        const hemoSave = new Hemodynamic({
            doctor: "58beb17cec9e6a23e393c370",
            child: result._id,
            pouls: faker.random.number({'min': 30, 'max': 160}),
            ta: faker.random.number({'min': 50, 'max': 180}),
            marbrure: faker.random.boolean(),
            trc: faker.random.number({'min': 0, 'max': 6}),
            extr_temp: faker.random.boolean(),
            temp: faker.random.number({'min': 28, 'max': 40}),
            turg_jugul: faker.random.boolean(),
            hepat_jugul: faker.random.boolean(),
            pres_vein: faker.random.number({'min': 0, 'max': 40}),
            diurese: faker.random.arrayElement(['Polyurie', 'Oligurie', 'Anurie']),
            auscu_card: faker.random.arrayElement(['normal', 'abnormal']),
        });
        hemoSave.save((err, hemo) => {

            // generate Pleuro-pulmonaire data
            const pleuroSave = new Pulmonaire({
                doctor: "58beb17cec9e6a23e393c370",
                child: result._id,
                fr: faker.random.number({'min': 10, 'max': 60}),
                amplitude: faker.random.arrayElement(['Normal', 'Decreased', 'Increased', 'Null']),
                spo2: faker.random.arrayElement(['1', '2', '3']),
                fio2: faker.random.number({'min': 0, 'max': 100}),
                rythme: faker.random.arrayElement(['Normal', 'Sighs', 'Periodic', 'Irregular']),
                cyanose: faker.random.boolean(),
                sign_lutte: faker.random.arrayElement(['tirage', 'battement', 'epuisement', 'balancement']),
                sueur: faker.random.boolean(),
                auscul_pleuro: {
                    bruit: faker.random.arrayElement(['Absent', 'Stridor', 'Cornage', 'Wheezing']),
                    toux: faker.random.arrayElement(['Absent', 'Sèche', 'Aiguë'])
                }
            })

            pleuroSave.save((err, pleuro) => {
                // generate result data
                const resultSave = new Result({
                    doctor: "58beb17cec9e6a23e393c370",
                    child: result._id,
                    hemo_id: hemo._id,
                    pleuro_id: pleuro._id,
                })
                resultSave.save((err, result) => {

                })
            })

        })



        // generate drugs toxications
        var tab1 = []
        var num = faker.random.number({'min': 1, 'max': 16})
        var sign = ['Coma', 'Convulsions', 'Myosis', 'Mydriase', 'Agitation', 'Hallucinations', 'Fièvre',
        'Myoclonies', 'Tremblements', 'Dysarthrie', 'Confusion', 'Paralysie', 'Céphalées',
        'Insomnie', 'Hyperréfléxie', 'Hypokaliémie', 'Palpitation', 'Bronchorrhée', 'Bronchospasme',
        'Bloc auriculo-ventriculaire', 'QT long', 'Trouble de rythme', 'Insuffisance cardiaque', 'Vomissements', 'Diarrhées', 'Douleurs Abdominales', 'Constipation', 'Frisson', 'Rétention Urinaire', 'IRA', 'Insuffisance hépatique', 'Hypoglycémie',
        'Hyperglycémie', 'Alcalose', 'Acidose', 'Hypokaliémie', 'Myosis', 'Somnolence', 'Ictère cutano muqueux'
      ]
        for (var i = 0; i < num; i++) {
            tab1.push({
                types: faker.random.arrayElement(sign),
                gravity: 0
            })
        }
        const caseSave = new Case({
            doctor: "58beb17cec9e6a23e393c370",
            child: result._id,
            taken_hour: {
                hour: faker.random.number({'min': 0, 'max': 72}),
                minute: faker.random.number({'min': 0, 'max': 59}),
            },
            taken_place: faker.random.arrayElement(['cuisine', 'chambre', 'salle de bain']),
            alone: faker.random.boolean(),
            drugs: [{
                id: faker.random.arrayElement(['592a0941a147b227e26df364', '592a09f7a147b227e26df369', '592a0a7ba147b227e26df36d']),
                quantity: faker.random.number({'min': 1, 'max': 10}),
                dose : 500
            }],
            sign: tab1
        })

        caseSave.save((err, result) => {

        })
    });
    }
    res.end()
})
