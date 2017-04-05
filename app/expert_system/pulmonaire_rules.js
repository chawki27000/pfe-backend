// ****  RULES 1 : FR analysis ****
var rules1 = [{
        "name": "rule 1",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.age && this.types);
        },
        "consequence": function(R) {

            if (this.types == "year" && this.age > 8) {
                this.grand = true
            } else if (this.types == "year" && this.age <= 8 && this.age > 2) {
                this.enfant = true
            } else if ((this.types == "year" && this.age <= 2 && this.age >= 1) || (this.types == "mounth")) {
                this.nourrisson = true
            } else {
                this.nouveau = true
            }
            R.next();
        }
    },
    // Normal : 12 −> 20
    {
        "name": "rule 2",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.grand && this.fr);
        },
        "consequence": function(R) {
            if (this.fr > 20) {
                this.result = "Polypnée"
                this.fast = true
            } else if (this.fr < 12) {
                this.result = "Bradypnée"
            } else if (this.fr <= 20 && this.fr >= 12) {
                this.result = "normal"
            }
            // TODO : absence de ventilation
            R.stop();
        }
    },
    // Normal : 20 −> 30
    {
        "name": "rule 3",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.enfant && this.fr);
        },
        "consequence": function(R) {
            if (this.fr > 30) {
                this.result = "Polypnée"
            } else if (this.fr < 20) {
                this.result = "Bradypnée"
            } else if (this.fr <= 30 && this.fr >= 20) {
                this.result = "normal"
            }
            // TODO : absence de ventilation
            R.stop();
        }
    },
    // Normal : 40 −> 60
    {
        "name": "rule 4",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.nouveau && this.fr);
        },
        "consequence": function(R) {
            if (this.fr > 60) {
                this.result = "Polypnée"
            } else if (this.fr < 40) {
                this.result = "Bradypnée"
            } else if (this.fr <= 60 && this.fr >= 40) {
                this.result = "normal"
            }
            // TODO : absence de ventilation
            R.stop();
        }
    },
    // Normal : 30 −> 60
    {
        "name": "rule 5",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.nourrisson && this.fr);
        },
        "consequence": function(R) {
            if (this.fr > 60) {
                this.result = "Polypnée"
            } else if (this.fr < 30) {
                this.result = "Bradypnée"
            } else if (this.fr <= 60 && this.fr >= 30) {
                this.result = "normal"
            }
            // TODO : absence de ventilation
            R.stop();
        }
    }
];

// ****  RULES 2 : FR + amplitude analysis ****
// "1" Normal
// "2" Decreased
// "3" Increased
// "0" Null
var rules2 = [{
    "name": "rule 1",
    "priority": 1,
    "on": true,
    "condition": function(R) {
        R.when(this.apml);
    },
    "consequence": function(R) {
        if (this.fr == "Polypnée" && this.apml == "2") {
            this.result = "Détresse respiratoire"
        } else if (this.fr = "Bradypnée" && this.apml == "2") {
            this.result = "Paralysie respiratoire"
        }
        R.stop();
    }
}]

// TODO : détresse respiratoire + signes de lutte
// ****  RULES 3 :  ****
