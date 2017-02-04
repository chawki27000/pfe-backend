var RuleEngine = require('node-rules');

// rules definition
var rules = [
    {
        "name": "rule 1",
        "priority": 1,
        "on": true,
        "condition": function (R) {
            R.when(this.single && this.risk && dose_parac < 75);
        },
        "consequence": function (R) {
            this.result = "Discharge the patient if sure of the dose ingested";
            R.stop();
        }
    },
    {
        "name": "rule 2",
        "priority": 1,
        "on": true,
        "condition": function (R) {
            R.when(this.single && this.risk && dose_parac >= 75);
        },
        "consequence": function (R) {
            this.taken = true;
            R.next();
        }
    },
    {
        "name": "rule 3",
        "priority": 1,
        "on": true,
        "condition": function (R) {
            R.when(this.single && !this.risk && (dose_parac < 150 || this.unknown));
        },
        "consequence": function (R) {
            this.result = "Discharge the patient if sure of the dose ingested";
            R.stop();
        }
    },
    {
        "name": "rule 4",
        "priority": 1,
        "on": true,
        "condition": function (R) {
            R.when(this.single && !this.risk && dose_parac >= 150);
        },
        "consequence": function (R) {
            this.taken = true;
            R.next();
        }
    },
    {
        "name": "rule 5",
        "priority": 1,
        "on": true,
        "condition": function (R) {
            R.when(this.unknown);
        },
        "consequence": function (R) {
            console.log("Start treatment with N-acetylcysteine. See Treatment Box for doses.");
            console.log("Take blood for baseline INR, LFTs, creatinine and venous bicarbonate (if bicarbonate abnormal then check arterial blood gases)");
            R.next();
        }
    },
    {
        "name": "rule 6",
        "priority": 1,
        "on": true,
        "condition": function (R) {
            R.when(this.abnormal);
        },
        "consequence": function (R) {
            this.result = "Call National Poisons Information Service";
            R.stop();
        }
    },
    {
        "name": "rule 7",
        "priority": 1,
        "on": true,
        "condition": function (R) {
            R.when(!this.abnormal);
        },
        "consequence": function (R) {
            console.log("Start treatment with i.v. N-acetylcysteine See treatment box for doses");
            console.log("On completion of N-acetylcysteine recheck INR, creatinine and venous bicarbonate (if bicarbonate abnormal then check arterial blood gases)");
        }
    },
    {
        "name": "rule 8",
        "priority": 1,
        "on": true,
        "condition": function (R) {
            R.when(this.symptomatic_abnormal);
        },
        "consequence": function (R) {
            this.result = "Continue with maintenance N-acetylcysteine at a dose of 150 mg/kg over 24 hours 38 39 and call National Poisons Information Service";
            R.stop();
        }
    },
    {
        "name": "rule 9",
        "priority": 1,
        "on": true,
        "condition": function (R) {
            R.when(!this.symptomatic_abnormal);
        },
        "consequence": function (R) {
            this.result = "Discharge the patient";
            R.stop();
        }
    },

];
