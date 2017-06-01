var RuleEngine = require('node-rules');
const rule_ibu = require('./ibuprofene_rules');
const rule_asp = require('./aspirine_rules');


// TODO : test ibuprofene et aspirine
var fact_ibu = {
    "dose" : 12000,
    "poids": 50,
    "duree": 1
}

var Ribu = new RuleEngine(rule_ibu.rules1)

Ribu.execute(fact_ibu, function(result) {
    console.log("diag : "+result.diag);
    console.log("treatment : "+result.treatment);
    console.log("complementaire : "+result.complementaire);
})
