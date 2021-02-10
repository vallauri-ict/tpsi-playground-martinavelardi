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
                option.prop("modello",modello)  // dentro ogni opzione salvo tutte le info relative al modello
            }
            _lstModelli.prop("selectedIndex", -1);
        });
    });

    _lstModelli.on("change", function() {
        let opzioneSelezionata = _lstModelli.children("option").eq(_lstModelli.prop("selectedIndex")); // puntatore jquery perché c'è .eq()
        //_lstModelli.prop("nome", opzioneSelezionata.split(' - ')[0]);
        //_lstModelli.prop("alimentazione", opzioneSelezionata.split(' - ')[1]);

        // salvo nel lst le informazioni relative al modello selezionato
        _lstModelli.prop("modello",opzioneSelezionata.prop("modello"))
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
                td.text((_lstModelli.prop("modello")).nome)

                td = $("<td>")
                td.appendTo(tr)
                td.text((_lstModelli.prop("alimentazione")).alimentazione)

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
                button.addClass("btn btn-xs btn-success")
                button.prop("automobile",automobile)    // !! passo il json dell'automobile
                button.appendTo(td)
                td.text("Dettagli")
                button.on("click",dettagliClick)

                td = $("<td>")
                td.appendTo(tr)
                button = $("<button>")
                button.addClass("btn btn-xs btn-secondary")
                button.prop("id",automobile.id) // salvo l'id per capire quale record voglio eliminare
                button.appendTo(td)
                td.text("Elimina")
                button.on("click",eliminaClick)

                pos++
            }
        });

    });

    let _salva=$("#btnSalva")
    _salva.on("click",function () {
        let url=URL+"/automobili/"+$("#txtId").val()
        let request=inviaRichiesta("patch",url,{"prezzo":parseInt($("#txtPrezzo").val())})
        request.fail(errore)
        request.done(function () {
            alert("Record aggiornato correttamente")
            _lstModelli.trigger("change")
        })
    })

    function dettagliClick() {
        _dettagli.show()
        $("#txtId").val(($(this).prop("automobile")).id)  // passo un oggetto completo
        $("#txtNome").val((_lstModelli.prop("modello")).nome)
        $("#txtAlimentazione").val((_lstModelli.prop("modello")).alimentazione)
        $("#txtCilindrata").val(($(this).prop("modello")).cilindrata)
        $("#txtTarga").val(($(this).prop("modello")).targa)
        $("#txtColore").val(($(this).prop("modello")).colore)
        $("#txtAnno").val(($(this).prop("modello")).anno)
        $("#txtKm").val(($(this).prop("modello")).km)
        $("#txtPrezzo").val(($(this).prop("modello")).prezzo)
    }

    function eliminaClick() {
        let url=URL+"/automobili/"+$(this).prop("id")
        let request=inviaRichiesta("delete",url)
        request.fail(errore)
        request.done(function () {
            alert("Record eliminato correttamente")
            _lstModelli.trigger("change")   // forza l'evento change, come se avessi cliccato col mouse
        })
    }
});