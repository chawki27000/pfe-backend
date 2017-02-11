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
var R4 = new RuleEngine(rules.rules4);
var R5 = new RuleEngine(rules.rules5);
var R6 = new RuleEngine(rules.rules6);
var R7 = new RuleEngine(rules.rules7);
var R8 = new RuleEngine(rules.rules8);
var R9 = new RuleEngine(rules.rules9);
var R10 = new RuleEngine(rules.rules10);
var R11 = new RuleEngine(rules.rules11);
var R12 = new RuleEngine(rules.rules12);
var R13 = new RuleEngine(rules.rules13);

var fact1_r7 = {
    "test_abnormal": false,
};

R7.execute(fact1_r7, function(result) {
    console.log("RESULT : "+result.result);
    console.log("continue : "+result.continue);
});
