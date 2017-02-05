var RuleEngine = require('node-rules');

// rules definition
var rules = [{
        "name": "rule 1",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.single && this.risk && this.dose_parac < 75);
        },
        "consequence": function(R) {
            console.log("rule 1");
            this.result = "Discharge the patient if sure of the dose ingested";
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
            this.taken = true;
            this.unknown = true; // INPUT
            R.next();
        }
    },
    {
        "name": "rule 3",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.single && !this.risk && (this.dose_parac < 150 || this.unknown));
        },
        "consequence": function(R) {
            console.log("rule 3");
            this.result = "Discharge the patient if sure of the dose ingested";
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
            this.taken = true;
            R.next();
        }
    },
    {
        "name": "rule 5",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.taken && this.unknown);
        },
        "consequence": function(R) {
            console.log("rule 5");
            console.log("Start treatment with N-acetylcysteine. See Treatment Box for doses.");
            console.log("Take blood for baseline INR, LFTs, creatinine and venous bicarbonate (if bicarbonate abnormal then check arterial blood gases)");
            this.abnormal = false; // INPUT
            R.next();
        }
    },
    {
        "name": "rule 6",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.abnormal);
        },
        "consequence": function(R) {
            console.log("rule 6");
            this.result = "Call National Poisons Information Service";
            R.stop();
        }
    },
    {
        "name": "rule 7",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(!this.abnormal);
        },
        "consequence": function(R) {
            console.log("rule 7");
            console.log("Start treatment with i.v. N-acetylcysteine See treatment box for doses");
            console.log("On completion of N-acetylcysteine recheck INR, creatinine and venous bicarbonate (if bicarbonate abnormal then check arterial blood gases)");
            this.symptomatic_abnormal = true; // INPUT
            R.next();
        }
    },
    {
        "name": "rule 8",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.symptomatic_abnormal);
        },
        "consequence": function(R) {
            console.log("rule 8");
            this.result = "Continue with maintenance N-acetylcysteine at a dose of 150 mg/kg over 24 hours 38 39 and call National Poisons Information Service";
            R.stop();
        }
    },
    {
        "name": "rule 9",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(!this.symptomatic_abnormal);
        },
        "consequence": function(R) {
            console.log("rule 9");
            this.result = "Discharge the patient";
            R.stop();
        }
    },

];

// export the variable
module.exports = {
    rules: rules
}
