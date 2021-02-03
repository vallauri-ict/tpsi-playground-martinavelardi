"use strict"

const URL = "http://localhost:3000";

let intestazioni = [{ "tag": "th", "text": "nomeModello", "width": "15%" },
    { "tag": "th", "text": "alimentazione", "width": "15%" },
    { "tag": "th", "text": "colore", "width": "15%" },
    { "tag": "th", "text": "anno", "width": "10%" },
    { "tag": "th", "text": "img", "width": "20%" },
    { "tag": "th", "text": "Dettagli", "width": "13%" },
    { "tag": "th", "text": "Elimina", "width": "12%" }
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
        let opzioneSelezionata = _lstModelli.children("option").eq(_lstModelli.prop("selectedIndex")).text(); // puntatore jquery perché c'è .eq()
        _lstModelli.prop("nome", opzioneSelezionata.split(' - ')[0]);
        _lstModelli.prop("alimentazione", opzioneSelezionata.split(' - ')[1]);
        let codiceModello = _lstModelli.val();
        let request = inviaRichiesta("get", URL + "/modelli?codModello=" + codiceModello);
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
            let tbody = $("<tbody");
            tbody.appendTo(_table);
            for (const automobile of automobili) {
                let tr = $("<tr>")
                tr.appendTo(tbody)
                let td = $("<td>")
                td.appendTo(tr)
                td.text(_lstModelli.prop("nome"))

                td = $("<td>")
                td.appendTo(tr)
                td.text(_lstModelli.prop("alimentazione"))

                td = $("<td>")
                td.appendTo(tr)
                td.text(automobile.colore)

                td = $("<td>")
                td.appendTo(tr)
                td.text(automobile.anno)

                td = $("<td>")
                td.appendTo(tr)
                let img = $("<img>")
                img.appendTo(td)
                img.prop("src", "img/" + automobile.img)
                img.css({ "height": "65px" })

                td = $("<td>")
                td.appendTo(tr)
                let button = $("<button>")
                button.appendTo(td)
                td.text("Dettagli")

                td = $("<td>")
                td.appendTo(tr)
                button = $("<button>")
                button.appendTo(td)
                td.text("Elimina")
            }
        });

    });
});