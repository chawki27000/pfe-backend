var RuleEngine = require('node-rules');

// rules definition
// ****  RULES 1 ****
var rules1 = [

    {
        "name": "rule 1",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.single && this.risk && this.dose_parac < 75);
        },
        "consequence": function(R) {
            console.log("rule 1");
            this.result = "Discharge the patient if sure of the dose ingested";
            this.continue = false;
            R.stop();
        }
    },
    {
        "name": "rule 2",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.single && this.risk && this.dose_parac >= 75);
        },
        "consequence": function(R) {
            console.log("rule 2");
            this.continue = true;
            R.stop();
        }
    },
    {
        "name": "rule 3",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.single && !this.risk && this.dose_parac < 150);
        },
        "consequence": function(R) {
            console.log("rule 3");
            this.result = "Discharge the patient if sure of the dose ingested";
            this.continue = false;
            R.stop();
        }
    },
    {
        "name": "rule 4",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.single && !this.risk && this.dose_parac >= 150);
        },
        "consequence": function(R) {
            console.log("rule 4");
            this.continue = true;
            R.stop();
        }
    },

];
// ****  RULES 2 ****
var rules2 = [{
    "name": "rule 1",
    "priority": 1,
    "on": true,
    "condition": function(R) {
        R.when(this.continue);
    },
    "consequence": function(R) {
        console.log("rule 1");
        if (this.taken < 1) {
            this.result += "50 g charcoal orally (1 g/kg bodyweight in children)\n";
        }
        if (this.taken < 1 || (this.taken >= 1 && this.taken < 4)) {
            this.result += "Wait until 4 hours post- ingestion\n";
        }
        if (this.taken < 1 || (this.taken >= 1 && this.taken < 4) || (this.taken >= 4 && this.taken < 8)) {
            this.result += "Take blood for paracetamol level\n";
            this.level_available = true;
        }
        R.stop();
    }
}];

// ****  RULES 3 ****
var rules3 = [{
        "name": "rule 1",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.level_available);
        },
        "consequence": function(R) {
            this.result = "Check paracetamol level result and plot on the treatment nomogram\n";
            this.result += "DIAGRAMME";
            R.stop();
        }
    },

    {
        "name": "rule 2",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(!this.level_available);
        },
        "consequence": function(R) {
            this.result += "Start treatment with i.v. N-acetylcysteine See treatment box for doses\n";
            this.result += "Check paracetamol level result and plot on the treatment nomogram\n";
            this.result += "DIAGRAMME";
            R.stop();
        }
    },

];

// export the variable
module.exports = {
    rules1: rules1,
    rules2: rules2,
    rules3: rules3,
}
