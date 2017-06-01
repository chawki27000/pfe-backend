var rules1 = [{
        "name": "rule 1",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when(this.dose >= (this.poids*120)/1000 && this.duree < 2);
        },
        "consequence": function(R) {
            this.diag = "intoxication par l’aspirine"

            this.treatment = "Mesures d’urgence : \n1- examens paracliniques immédiats : \nSalicylémie : attendre 2h pour le prélèvement. \nGaz sanguin : pour détecter une acidose métabolique \nGlycémie, ionogramme, urée et créatinémie \n"
            this.treatment += "2- Évacuation gastrique par lavage gastrique \n"
            this.treatment += "3- Surveillance paraclinique : \n-INR toutes les 12h  pour préveni une hémoragie Salicylémie toutes les 2-3 h tant que le taux ne baisse pas pH urinaire toutes les 2h pour détecter une hypokaliémie radiographie thoracique nécessaire si SaO2 n’est pas normale \n"
            this.treatment += "4- Traitement : -lavage gastrique et charbon activé corriger toute acidémie avec du bicarbonate I.V : maintenir le pH à 7.4 ou plus. \nalcalinisation de l’urine : mais s’assurer d’abord que la kaliémie est normale."

            this.complementaire = "Envisager une hémodialyse si l’enfant présente une acidose insensible, insuffisance rénale."
            R.stop();
        }
    },
    {
            "name": "rule 2",
            "priority": 1,
            "on": true,
            "condition": function(R) {
                R.when(this.dose >= (this.poids*400)/1000 && this.duree > 2 && this.vomi == true);
            },
            "consequence": function(R) {
                this.diag = "intoxication par l’aspirine"

                this.treatment = "Mesures d’urgence : \n1-examens paracliniques immédiats : \nSalicylémie \nGaz sanguin : pour détecter une acidose métabolique \nGlycémie, ionogramme, urée et créatinémie \n"
                this.treatment += "2- Évacuation gastrique par lavage gastrique \n"
                this.treatment += "3- Surveillance paraclinique : \n-INR toutes les 12h  pour préveni une hémoragie Salicylémie toutes les 2-3 h tant que le taux ne baisse pas pH urinaire toutes les 2h pour détecter une hypokaliémie radiographie thoracique nécessaire si SaO2 n’est pas normale"
                this.treatment += "4- Traitement : ajuster le rapport hydrique en fonction du degré de déshydratation corriger toute acidémie avec du bicarbonate I.V : maintenir le pH à 7.4 ou plus."
                this.complementaire = "hémodialyse si la salicylémie dépasse 5mmol/L (69mg/dL)"
                R.stop();
            }
        },

];

module.exports = {
    rules1: rules1,
}
