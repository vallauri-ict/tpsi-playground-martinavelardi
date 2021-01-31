"use strict";
$(document).ready(function() {
    let wrapper = $("#wrapper") // si può anche omettere, jquery lo fa in automatico
    let utenti = [
        { "id": 1, "nome": "pippo", "password": "pippo" },
        { "id": 2, "nome": "pluto", "password": "pluto" },
        { "id": 3, "nome": "minnie", "password": "minnie" },
        { "id": 4, "nome": "sonny", "password": "sonny" }
    ];
    let ombrelloni = [];

    /*
    	[{"id":1, stato:[0,0,0,0, etc]},
    	 {"id":2, stato:[0,0,0,0, etc]},
    	 {"id":3, stato:[0,0,0,0, etc]}]  */

    for (let i = 1; i <= 666; i++) {
        let ombrellone = { "id": i, stato: [] } // creo l'ombrellone
        for (let j = 1; j <= 107; j++) // 107 è il numero dei giorni totali
            ombrellone.stato.push(0) // metto 107 "0" nello stato
        ombrelloni.push(ombrellone);
    }
    let json = { "utenti": utenti, "ombrelloni": ombrelloni }
    json = JSON.stringify(json, null, 3)

    let blob = new Blob([json], { type: 'application/json' })
    $("a").prop("href", URL.createObjectURL(blob))

    // <a href="#" download="ombrelloni.json">salva json su disco</a>
    // "download" mostra il nome proposto da dare al file
    // download fa aprire una finestra di dialogo dopo che sono state eseguite le istruzioni interne a un click
    /*$("<a>").prop({ "download": "ombrelloni.json", "href": "#" }).text("salva json su disco")
        .appendTo(wrapper).on("click", function() {
            let json = { "utenti": utenti, "ombrelloni": ombrelloni }
            json = JSON.stringify(json, null, 3)
            // trasforma questo json in un nuovo oggetto blob
            // un blob è un file temporaneo in memoria centrale
            let blob = new Blob([json], { type: 'application/json' });
            // URL.createObjectURL restituisce l'indirizzo del file temporaneo (blob)
            $(this).prop("href", URL.createObjectURL(blob));
        })*/
})