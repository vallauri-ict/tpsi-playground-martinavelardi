"use strict"

const URL = "http://localhost:3000";

let intestazioni = [{ "tag": "th", "text": "nomeModello", "width": "15%" },
    { "tag": "th", "text": "alimentazione", "width": "15%" },
    { "tag": "th", "text": "colore", "width": "15%" },
    { "tag": "th", "text": "anno", "width": "10%" },
    { "tag": "th", "text": "img", "width": "20%" },
    { "tag": "th", "text": "Dettagli", "width": "13%" },
    { "tag": "th", "text": "elimina", "width": "12%" }
];


$(document).ready(function() {
    let _lstMarche = $("#lstMarche");
    let _lstModelli = $("#lstModelli");
    let _table = $("table");
    let _dettagli = $(".row").eq(2).children("div").eq(1);

    _dettagli.hide();

    let request = inviaRichiesta("get", URL + "/marche");
    request.fail(errore);
    request.done(function(marche) {
        // carico le marche
        for (const marca of marche) {
            let option = $("<option>");
            option.val(marca.id);
            option.text(marca.nome);
            option.appendTo(_lstMarche);
        }
        // da fare qua perché altrimenti non ho i dati
        _lstMarche.prop("selectedIndex", -1); // tolgo la selezione
    });

    _lstMarche.on("change", function(params) {
        _lstModelli.html("");
        let codiceMarca = _lstMarche.val();
        let request = inviaRichiesta("get", URL + "/modelli?codMarca=" + codiceMarca);
        request.fail(errore);
        request.done(function(modelli) {
            // carico i modelli di quella determinata marca
            for (const modello of modelli) {
                let option = $("<option>");
                option.val(modello.id);
                option.text(modello.nome + " - " + modello.alimentazione);
                option.appendTo(_lstModelli);
            }
            _lstModelli.prop("selectedIndex", -1);
        });
    });

    _lstModelli.on("change", function() {
        let codiceModello = _lstModelli.val();
        let request = inviaRichiesta("get", URL + "/modelli?codMarca=" + codiceMarca);
        request.fail(errore);
        request.done(function(automobili) {
            let thead = $("<thead>");
            thead.appendTo(_table);
            let tr = $("<tr>");
            tr.appendTo(thead);
            for (let i = 0; i < intestazioni.length; i++) {
                let th = `<${intestazioni[i].tag}>`;
                // let th = $("<th>");
                th.appendTo(tr);
                th.text(intestazioni[i].text);
                th.css({ "width": intestazioni[i].width });
            }
        });

    });
});