const RuleEngine = require('node-rules');
const rules = require('./rules');

// declare a fact
var fact1 = {
    "single": true,
    "risk": true,
    "dose_parac": 20
};

var fact2 = {
    "single": true,
    "risk": true,
    "dose_parac": 160,
    "unknown": true,
};

// initialize the rule engine
var R = new RuleEngine(rules.rules1);

// Now pass the fact on to the rule engine for results
// RULES 1 : Application
R.execute(fact2, function(result) {
    console.log("RESULT : "+result.result);
    console.log("unknow : "+result.unknown);
    console.log("contenue : "+result.contenue);
});
