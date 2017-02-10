const RuleEngine = require('node-rules');
const rules = require('./rules');

// declare a fact
var fact1_r1 = {
    "single": true,
    "risk": true,
    "dose_parac": 20
};

var fact2_r1 = {
    "single": true,
    "risk": true,
    "dose_parac": 160,
    "unknown": true,
};

// initialize the rule engine
var R1 = new RuleEngine(rules.rules1);
var R2 = new RuleEngine(rules.rules2);
var R3 = new RuleEngine(rules.rules3);

// Now pass the fact on to the rule engine for results
// RULES 1 : Application

// R1.execute(fact2_r1, function(result) {
//     console.log("RESULT : "+result.result);
//     console.log("unknow : "+result.unknown);
//     console.log("continue : "+result.continue);
//
// });

// RULES 2 : Application
var fact1_r2 = {
    "continue": true,
    "taken" : 0.5,

};

// R2.execute(fact1_r2, function(result) {
//     console.log("RESULT : "+result.result);
//     console.log("level_available : "+result.level_available);
// });

// RULES 3 : Application
var fact1_r3 = {
    "level_available": true,
};

R3.execute(fact1_r3, function(result) {
    console.log("RESULT : "+result.result);
});
