'use strict'

// ajax prende un json da una server
$(document).ready(function() {
    const finalUrl = "https://randomuser.me/api"
    let _table = $("#wrapper table")

    // invia una richiesta ajax al servizio
    // si aspetta un json con un elenco di chiavi
    $.ajax({
        "url": finalUrl + "?results=50", // dove deve prendere i campi
        // data --> json già parsificato restituito dal server
        "success": function(data) {
            // codice di gestione
            console.log(data)

            for (let person of data.results) {
                let tr = $("<tr>")
                tr.appendTo(_table.children("tbody"))
                let name = person.name.first + " " + person.name.last
                $("<td>").appendTo(tr).text(name)
                $("<td>").appendTo(tr).text(person.nat)
                $("<td>").appendTo(tr).text(person.location.country)
                $("<td>").appendTo(tr).text(person.location.state)
                $("<td>").appendTo(tr).text(person.cell)
                let td = $("<td>").appendTo(tr)
                $("<img>").appendTo(td).prop("src", person.picture["medium"])
            }

            // se lancio .DataTable prima che la tabella sia stata popolata,
            // l'applicazione funziona ugualmente ma visualizza un fastidioso messaggio iniziale
            _table.DataTable({
                "bPaginate": true, // paginazione record da visualizzare
                "bLengthChange": true, // n° record per pagina
                "bFilter": true, // ricerca voce impostata
                "bSort": true // ordinamento dei record sul click on the header
            })
        },
        "error": errore
    });
})

function errore(jqXHR, text_status, string_error) {
    if (jqXHR.status == 0)
        alert("Connection Refused or Server timeout");
    else if (jqXHR.status == 200)
        alert("Formato dei dati non corretto : " + jqXHR.responseText);
    else
        alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}