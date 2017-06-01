var rules1 = [{
        "name": "rule 1",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.dose >= (this.poids*400)/1000 && this.duree <= 1);
        },
        "consequence": function(R) {
            this.diag = "intoxication sévère par l’ibuprofène"
            this.treatment = "1- examen paraclinique immédiat: gaz sanguin, urée, créatinine, glycémie, ionogramme \n"
            this.treatment += "2-prévenir l’absorption de l’ibuprofène : administrer une dose du charbon  activé 1g/kg de poids \n"
            this.treatment += "3- surveillance clinique et paraclinique : Signes vitaux et oxymétrie de pouls : toutes les 4h \nSignes neurologiques et score de glascow toutes les 4h \nSi insuffisance rénale : gaz sanguin, urée, créatinine, ionogramme toutes les 4-12h "
            R.stop();
        }
    },
    {
            "name": "rule 2",
            "priority": 1,
            "on": true,
            "condition": function(R) {
                R.when(this.dose >= (this.poids*400)/1000 && this.duree > 1);
            },
            "consequence": function(R) {
                this.diag = "intoxication sévère par l’ibuprofène"
                this.treatment = "1- examen paraclinique immédiat: gaz sanguin, urée, créatinine, glycémie, ionogramme \n"
                this.treatment += "2- surveillance clinique et paraclinique :\nSignes vitaux et oxymétrie de pouls : toutes les 4h \nSignes neurologiques et score de glascow toutes les 4h \n Si insuffisance rénale : gaz sanguin, urée, créatinine, ionogramme toutes les 4-12h \n"
                this.complementaire = "Traiter les complications :\nInsuffisance rénale \nAcidose métabolique"
                R.stop();
            }
        },

];

module.exports = {
    rules1: rules1,
}
