"option strict"

$(document).ready(function() {
    const _lstCitta = $("#lstCitta")
    const _lstGeneri = $("#lstGeneri")
    const _btnFiltro = $("#btnFiltro")
    const _tbody = $("table tbody");
    const _divDettagli = $("#divDettagli")

    _divDettagli.hide();
    caricaComboCitta();
    caricaComboGeneri();
    caricaTabella();





    /***********************************************/
    _lstCitta.on("click", "li", function() {
        let record = $(this).prop("citta");
        _lstCitta.prop("citta", record);
        if (record == undefined) {
            _lstCitta.prev().html("Tutti <span class='caret'></span>");
            _lstCitta.prop("citta", null);
        } else
            _lstCitta.prev().html(record.citta + " <span class='caret'></span>");
    })

    _lstGeneri.on("click", "li", function() {
        let record = $(this).prop("genere");
        _lstGeneri.prop("genere", record);
        if (record == undefined) {
            _lstGeneri.prev().html("Tutti <span class='caret'></span>");
            _lstGeneri.prop("genere", null);
        } else
            _lstGeneri.prev().html(record.genere + " <span class='caret'></span>");
    })

    _btnFiltro.on("click", caricaTabella);

    /************************************************/
    function caricaComboCitta() {
        let li = $("<li>");
        li.text("Tutti");
        li.appendTo(_lstCitta);
        let request = inviaRichiesta("get", "/citta");
        request.fail(errore);
        request.done(function(citta) {
            for (const item of citta) {
                li = $("<li>");
                li.text(item.citta);
                li.appendTo(_lstCitta);
                li.prop("citta", item);
            }
        })
    }

    function caricaComboGeneri() {
        let li = $("<li>");
        li.text("Tutti");
        li.appendTo(_lstGeneri);
        let request = inviaRichiesta("get", "/generi");
        request.fail(errore);
        request.done(function(generi) {
            for (const genere of generi) {
                li = $("<li>");
                li.text(genere.genere);
                li.prop("genere", genere);
                li.appendTo(_lstGeneri);
            }
        })
    }
    /*******************************************/
    function caricaTabella() {
        let genere = _lstGeneri.prop("genere");
        let citta = _lstCitta.prop("citta");
        let json = {};
        // push funge solo su i vettori enumerativi
        /*json = {
            "codGenere" : _lstGeneri.prop("genere").id, 
            "codCitta" : _lstCitta.prop("citta").id
        }*/
        if (genere != null)
            json.codGenere = genere.id;
        if (citta != null)
            json["codCitta"] = citta.id;

        let request = inviaRichiesta("get", "/concerti", json);
        request.fail(errore);
        // il parametro viene iniettato automaticamente alla funzione puntata
        request.done(visualizzaConcerti);
        _divDettagli.hide();
    }

    function visualizzaConcerti(concerti) {
        _tbody.html("");
        /*          <th>ID</th>
					<th>Cantante</th>
					<th>Data</th>
					<th>Genere</th>
					<th>Città</th>
					<th>Struttura</th>
					<th>nPosti</th>
					<th>dettagli</th>
					<th>prenota</th>*/
        for (const concerto of concerti) {
            let tr = $("<tr>");
            tr.appendTo(_tbody);

            let td = $("<td>");
            td.text(concerto.id);
            td.appendTo(tr);

            td = $("<td>");
            td.text(concerto.cantante);
            td.appendTo(tr);

            td = $("<td>");
            td.text(concerto.data);
            td.appendTo(tr);

            let tdGenere = $("<td>");
            tdGenere.appendTo(tr);
            let requestGeneri = inviaRichiesta("get", "/generi/" + concerto.codGenere);
            requestGeneri.fail(errore);
            requestGeneri.done(function(genere) { // restisuisce sempre un vettore di json ma nel caso in cui gli andiamo richiedere un id, esso restituisce un record solo
                //console.log(genere);
                tdGenere.text(genere.genere);
            })

            let tdCitta = $("<td>");
            tdCitta.appendTo(tr);
            let tdStruttura = $("<td>");
            tdStruttura.appendTo(tr);
            let tdnPosti = $("<td>");
            tdnPosti.appendTo(tr);
            let requestCitta = inviaRichiesta("get", "/citta/" + concerto.codCitta);
            requestCitta.fail(errore);
            let nPostiMax;
            requestCitta.done(function(citta) {
                nPostiMax = citta.nPosti;
                tdCitta.text(citta.citta);
                tdStruttura.text(citta.struttura);
                tdnPosti.text(citta.nPosti);

                let tdButton = $("<td>");
                tdButton.appendTo(tr);
                let button = $("<button>");
                button.text("dettagli");
                button.addClass("btn btn-info btn-xs");
                button.appendTo(tdButton);
                button.on("click", function() {
                    _divDettagli.show();
                    if (concerto.nPostiOccupati != undefined)
                        _divDettagli.children("textarea").val(concerto.dettagli + "\nPosti occupati: " + concerto.nPostiOccupati);
                    else _divDettagli.children("textarea").val(concerto.dettagli + "\n Posti occupati: 0");
                })
                tdButton = $("<td>");
                tdButton.appendTo(tr);
                if (concerto.nPostiOccupati == undefined ||
                    parseInt(concerto.nPostiOccupati) < nPostiMax) {
                    button = $("<button>");
                    button.text("prenota");
                    button.addClass("btn btn-success btn-xs");
                    button.prop("nPosti", concerto.nPostiOccupati);
                    button.appendTo(tdButton);
                }
            })
        }
    }

    /*****************************/
    // vado a prende i button che implementano la classe btn-succes "button.btn-success"
    _tbody.on("click", "button.btn-success", function() {
        let id = $(this).parent().siblings().eq(0).text();
        let nPosti = $(this).prop("nPosti");
        let nPostiMax = parseInt($(this).parent().siblings().eq(6).text());
        if (nPosti == undefined)
            nPosti = 1;
        else {
            nPosti = parseInt(nPosti) + 1;
            if (nPosti == nPostiMax)
                alert("hai preso l'ultimo biglietto");
        }

        let request = inviaRichiesta("patch", "/concerti/" + id, { "nPostiOccupati": nPosti });
        request.fail(errore);
        request.done(function(info) {
            console.log(info);
            alert("prenotazione eseguita correttamente");
            caricaTabella();
        });
    })
})