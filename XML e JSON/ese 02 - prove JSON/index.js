'use strict'

window.onload = function(){
    // Dichiarazione statica di un object
    let studente = {
                    "nome": "mario",
                    "cognome": "rossi",
                    "eta": 16,
                    "studente": true,
                    "images": ["smile.gif", "grim.gif", "frown.gif", "bomb.gif"],
                    "hobbies": [],             // vettore al momento vuoto
                    "pos": {"x": 40, "y": 300},// oggetto annidato
                    "stampa": function() { alert("Hello "+ this.nome); },
                    "fullName": function(){return this.nome+ " " + this.cognome}
    };

    this.console.log(studente['eta']);
    studente.eta++;
    this.console.log(studente.eta);
    this.console.log(studente.fullName());  // funzione più leggibile
    this.console.log(studente['fullName']());   // sintassi standard

    // Aggiunta dinamica di una nuova chiave
    studente['residenza'] = "Fossano";
    studente.classe = "4B info";
    this.console.log(studente.residenza);
    if("classe" in studente)    // controllo l'esistenza della chiave
        this.console.log(studente['classe']);
    else
        this.console.log("Chiave inesistente");

    // Dichiarazione di un nuovo object
    let studente2 = {};
    studente2.nome = "Pluto";
    studente2.residenza = "Alba";

    // Scansione proprietà di un oggetto
    this.console.log("\nSTUDENTE 2");
    for (let key in studente2) {
        if (studente2.hasOwnProperty(key)) {
            this.console.log(key + " = " + studente2[key]);   // key è una variabile per cui posso usare solo questa sintassi            
        }
    }
    this.console.log("\nSTUDENTE");
    for (let key in studente) {
        //if (! studente[key].toString().includes("function()")) {    // devo convertirlo in stringa perché alcuni campi non sono di tipo string
        if (typeof(studente[key]) != "function") {    
            this.console.log(key + " = " + studente[key]);   // key è una variabile per cui posso usare solo questa sintassi                        
        }
    }

    // Serializzazione di un oggetto
    this.console.log(studente); // serializza in automatico
    this.alert(studente);   // NON serializza in automatico, bisogna farlo manualmente
    this.alert(this.JSON.stringify(studente));  // serializzazione manuale

    // Vettore enumerativo delle chiavi
    let keys = this.Object.keys(studente);
    // for of scandisce i valori di un vettore enumerativo
    for (let iterator of keys) {
        this.console.log(iterator);
    }
}