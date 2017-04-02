var RuleEngine = require('node-rules');
const rule = require('./paracetamol_rules');

// var fact = {
//     "age": 2,
//     "types": "mounth",
//     "fc": 99
// }

var fact2 = {
    "symptomatique_abnormal": true,
}

var fact3 = {
    "single": true,
    "risk": true,
    "dose_parac": 26,
}

var R = new RuleEngine(rule.rules1)
var R2 = new RuleEngine(rule.rules12)
// var R3 = new RuleEngine(rule.rules3)

// R.execute(fact, function(result) {
//     console.log("Resulat 1 : "+result.result);
// })
//
// R2.execute(fact2, function(result) {
//     console.log("Resulat 2 : "+result.result);
// })

R.execute(fact3, function(result) {
    console.log("Resulat 3 : "+result.result);
})
R2.execute(fact2, function(result) {
    console.log("Resulat 2 : "+result.result);
})
