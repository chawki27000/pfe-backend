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
    "dose_parac": 100
};

//initialize the rule engine
var R = new RuleEngine(rules.rules);

//Now pass the fact on to the rule engine for results
R.execute(fact2, function(result) {
    console.log(result.result);
});
