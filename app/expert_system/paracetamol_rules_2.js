var rules1 = [{
        "name": "rule 1",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when((this.dose >= (this.poids * 150) / 1000 || this.dose_inconnu == true) && this.duree <= 4);
        },
        "consequence": function(R) {
            this.diag = "intoxication sévère par le paracétamol"
            this.treatment = "1- examen clinique : INR, gaz sanguin, transminases (AST, ALT), urée, créatinine, glycémie \n"
            this.treatment += " 2- évaluer le risque d’hépotoxicité : faire le dosage du paracétamol sérique au moins 4h après l’ingestion \n"
            this.treatment += "3- prévenir l’absorption : décontamination digestive par le lavage gastrique avant la 6ème heure"
            this.treatment += "4- prévenir l’hypotoxicité : administrer l’antidote N-acétylcystéine selon le protocole suivant : dose d’attaque : 140mg/kg de poids par voie orale dose d’entretien : 70mg/kg de poids chaque 4 heure à 17 reprises"
            R.stop();
        }
    },
    {
        "name": "rule 2",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when((this.dose >= (this.poids * 150) / 1000 || this.dose_inconnu == true) && this.duree > 4 && this.duree <= 12);
        },
        "consequence": function(R) {
            this.diag = "intoxication sévère par le paracétamol"
            this.treatment = "1- examen clinique : INR, gaz sanguin, transminases (AST, ALT), urée, créatinine, glycémie \n"
            this.treatment += "2- évaluer en urgence le risque d’hépotoxicité : faire le dosage du  paracétaml sérique\n"
            this.treatment += "3- prévenir l’hypotoxicité : administrer l’antidote N-acétylcystéine selon le protocole suivant : dose d’attaque : 140mg/kg de poids par voie orale dose d’entretien : 70mg/kg de poids chaque 4 heure à 17 reprises\n"
            this.treatment += "4- cesser le traitement par le N-acétylcystéine dans les cas suivant : oconcentration sérique du paracétamol se situe sous la ligne inférieure du nomogramme de Rumack et Mattew transminases, INR, gaz sanguin normaux \n"
            R.stop();
        }
    },
    {
        "name": "rule 3",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when((this.dose >= (this.poids * 150) / 1000 || this.dose_inconnu == true) && this.duree > 12 && this.duree < 24 && (this.somnolence == true || this.nausee == true || this.vomissement == true));
        },
        "consequence": function(R) {
            this.diag = "intoxication sévère par le paracétamol"
            this.treatment = "1- examen paraclinique immédiat: INR, gaz sanguin, transminases (AST, ALT), urée, créatinine, glycémie \n"
            this.treatment += "2- évaluer en urgence le risque d’hépotoxicité : faire le dosage du paracétaml sérique \n"
            this.treatment += "prévenir l’hypotoxicité : administrer l’antidote N-acétylcystéine selon  le protocole suivant : -dose d’attaque : 140mg/kg de poids par voie orale dose d’entretien : 70mg/kg de poids chaque 4 heure à 17 reprises \n"
            this.treatment += "4- cesser le traitement par le N-acétylcystéine dans les cas suivant : oconcentration sérique du paracétamol se situe sous la ligne inférieure du nomogramme de Rumack et Mattew transminases, INr, gaz sanguin normaux \n"
            R.stop();
        }
    },
    {
        "name": "rule 4",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when((this.dose >= (this.poids * 150) / 1000 || this.dose_inconnu == true) && this.duree > 12 && this.duree < 24 && (this.douleur == true || this.icm == true));
        },
        "consequence": function(R) {
            this.diag = "intoxication sévère par le paracétamol : possibilité d’une atteinte hépatique"
            this.treatment = "1- orienter l’enfant vers réanimation \n"
            this.treatment += "2- administrer l’antidote N-acétylcystéine selon le protocole suivant : -dose d’attaque : 140mg/kg de poids par voie orale -dose d’entretien : 70mg/kg de poids chaque 4 heure à 17 reprises"

            this.treatment += "3- Surveillance paraclinique : oINR à répéter en fonction de la gravité de l’atteinte hépatique : indice permettant de décider l’arrêt de l’administation de l’antidote. Glycémie toute les 1-12h : sureviller le risque d’une hypoglycémie Urée et créatinine toutes les 12h : surveiller le risque d’une atteinte renale Phosphorémie toutes les 12-24h : surveiller le risque d’une hyperphosphaturie Transaminases(AST, ALT) toutes les 12-24h Examen des urines tous les jours : déceler précocément une atteinte renale EEG : une surveillance quotidienne est utile \n"
            this.complementaire += "Traiter les complications : Hémorragie secondaire à l’élévation du INR : contrôler les hémoragies importantes avec du plasma fraie congelé plutôt qu’aveclavitamine K car le foie ne peut plus activer lesfaceurs de coagulation») ; Traiter Insuffisance rénale Traiter acidose métabolique : bicarbonate en I.V \n"
            R.stop();
        }
    },
    {
        "name": "rule 5",
        "priority": 1,
        "on": true,
        "condition": function(R) {
            R.when((this.dose < (this.poids * 150) / 1000 || this.dose_inconnu == false) && this.duree <= 4);
        },
        "consequence": function(R) {
            this.diag = "dose ingérée n’est pas toxique"
            this.treatment = "l’enfant peut rentrer chez lui mais reste sous surveillance pendant 24h \n"
            R.stop();
        }
    }

];

module.exports = {
    rules1: rules1,
}
