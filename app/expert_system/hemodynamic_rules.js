// ****  RULES 1 : frequence anomaly ****
var rules1 = [{
        "name": "rule 1",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.age && this.types);
        },
        "consequence": function(R) {

            if (this.types == "year" && this.age > 7) {
                this.grand = true
            } else if (this.types == "year" && this.age <= 7 && this.age > 3) {
                this.enfant = true
            } else if ((this.types == "year" && this.age <= 3 && this.age >= 1) || (this.types == "mounth")) {
                this.nourrisson = true
            } else {
                this.nouveau = true
            }
            R.next();
        }
    },
    {
        "name": "rule 2",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.grand && this.fc);
        },
        "consequence": function(R) {
            if (this.fc > 100) {
                this.result = "Tachycardie"
            } else if (this.fc < 50) {
                this.result = "Bradycardie"
            } else {
                this.result = "Normal"
            }
            R.stop();
        }
    },
    {
        "name": "rule 3",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.enfant && this.fc);
        },
        "consequence": function(R) {
            if (this.fc > 140) {
                this.result = "Tachycardie"
            } else if (this.fc < 70) {
                this.result = "Bradycardie"
            } else {
                this.result = "Normal"
            }
            R.stop();
        }
    },
    {
        "name": "rule 4",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.nourrisson && this.fc);
        },
        "consequence": function(R) {
            if (this.fc > 160) {
                this.result = "Tachycardie"
            } else if (this.fc < 100) {
                this.result = "Bradycardie"
            } else {
                this.result = "Normal"
            }
            R.stop();
        }
    },
    {
        "name": "rule 5",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.nouveau && this.fc);
        },
        "consequence": function(R) {
            if (this.fc > 160) {
                this.result = "Tachycardie"
            } else if (this.fc < 120) {
                this.result = "Bradycardie"
            } else {
                this.result = "Normal"
            }
            R.stop();
        }
    },

];

// ****  RULES 2 : TA ****
var rules2 = [
    {
        "name": "rule 1",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.ta);
        },
        "consequence": function(R) {
            if (this.ta >= 100 && this.ta < 150) {
                this.result = "Hypertension diastolique"
            }
            else if (this.ta >= 150) {
                this.result = "Hypertension systolique"
            }
            else if (this.ta <= 60) {
                this.result = "Hypotension diastolique"
            }
            else if (this.ta < 110 && this.ta > 60) {
                this.result = "Hypotension systolique"
            }
            R.stop();
        }
    }
]

// ****  RULES 3 : Temperature ****
var rules3 = [
    {
        "name": "rule 1",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.temp);
        },
        "consequence": function(R) {
            if (this.temp >= 35.6 && this.temp <= 37.2){
                this.result = "Normal"
            }
            else if(this.temp < 35.6) {
                this.result = "Hypothermie"
            }
            else if(this.temp > 37.2 && this.temp <= 37.8){
                this.result = "Subfebrile"
            }
            else if(this.temp > 37.8 && this.temp <= 38.5){
                this.result = "Hyperthermie legere"
            }
            else if(this.temp > 38.5 && this.temp <= 39){
                this.result = "Hyperthermie moderee"
            }
            else if(this.temp > 39){
                this.result = "Hyperthermie elevee"
            }
            R.stop();
        }
    }
]

module.exports = {
    rules1: rules1,
    rules2: rules2,
    rules3: rules3,
}
