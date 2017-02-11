var RuleEngine = require('node-rules');

// rules definition
// ****  RULES 1 : single overdose ****
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
// ****  RULES 2 : when taken in 1/1-4/1-8 ****
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

// ****  RULES 3 : traitement when (level_available) ****
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

// ****  RULES 4 : traitement when (paracetamol_level) ****
var rules4 = [{
        "name": "rule 1",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(!this.paracetamol_level && this.doubt_traitment);
        },
        "consequence": function(R) {
            this.result = "Discontinue N-acetylcysteine (if started) and discharge the patient";
            R.stop();
        }
    },
    {
        "name": "rule 2",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.paracetamol_level);
        },
        "consequence": function(R) {
            this.result += "Start treatment with i.v. N-acetylcysteine See treatment box for doses";
            this.result += "On completion of N-acetylcysteine recheck INR, creatinine and venous bicarbonate (if bicarbonate abnormal then check arterial blood gases)";
            R.stop();
        }
    },
];

// ****  RULES 5 : traitement when (sympomatique_abdonormal) ****
var rules5 = [
    {
        "name": "rule 1",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.sympomatique_abdonormal);
        },
        "consequence": function(R) {
            this.result = "Continue with maintenance N-acetylcysteine at a dose of 150 mg/kg over 24 hours and call National Poisons Information Service";
            R.stop();
        }
    },
    {
        "name": "rule 2",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(!this.sympomatique_abdonormal);
        },
        "consequence": function(R) {
            this.result = "Discharge the patient";
            R.stop();
        }
    }
];

// ****  RULES 6 : when taken is unknown ****
var rules6 = [
    {
        "name": "rule 1",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.unknown);
        },
        "consequence": function(R) {
            console.log("Start treatment with i.v. N-acetylcysteine See treatment box for doses");
            console.log("ake blood for baseline INR, LFTs, creatinine and venous bicarbonate (if bicarbonate abnormal then check arterial blood gases)");
            R.next();
        }
    },

];

// ****  RULES 7 : traitment when is not (test_abnormal)****
var rules7 = [
    {
        "name": "rule 1",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.test_abnormal);
        },
        "consequence": function(R) {
            this.continue = true;
            R.stop();
        }
    },
    {
        "name": "rule 2",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(!this.test_abnormal);
        },
        "consequence": function(R) {
            this.continue = false;
            this.result = "Call National Poisons Information Service";
            R.stop();
        }
    },
];

// ****  RULES 8 : when taken in 8-24 ****
rules8 = [
    {
        "name": "rule 1",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.taken >= 8 && this.taken < 24);
        },
        "consequence": function(R) {
            this.result += "Start treatment with i.v. N-acetylcysteine See treatment box for doses\n";
            this.result += "Take blood for paracetamol level, INR, LFTs, creatinine and venous bicarbonate (if bicarbonate abnormal then check arterial blood gases)\n";
            this.result += "Check paracetamol level result and plot on the treatment nomogram";
            R.stop();
        }
    }
];

// ****  RULES 9 : traitment when (paracetamol_level) ****
rules9 = [
    {
        "name": "rule 1",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.paracetamol_level);
        },
        "consequence": function(R) {
            this.result = "Check INR, creatinine and venous bicarbonate results (if bicarbonate abnormal then check arterial blood gases)";
            this.output = true;
            R.stop();
        }
    },
    {
        "name": "rule 2",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(!this.paracetamol_level);
        },
        "consequence": function(R) {
            this.output = false;
            R.stop();
        }
    },
];

// ****  RULES 10 : traitment when (lab_text_abnormal) ****
rules10 = [
    {
        "name": "rule 1",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.lab_text_abnormal);
        },
        "consequence": function(R) {
            this.result = "Start treatment with i.v. N-acetylcysteine (see treatment box for doses), if not already started. Call National Poisons Information Service";
            this.output = true;
            R.stop();
        }
    },
    {
        "name": "rule 2",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(!this.lab_text_abnormal);
        },
        "consequence": function(R) {
            this.output = false;
            R.stop();
        }
    }
];

// export the variable
module.exports = {
    rules1: rules1,
    rules2: rules2,
    rules3: rules3,
    rules4: rules4,
    rules5: rules5,
    rules6: rules6,
    rules7: rules7,
}
