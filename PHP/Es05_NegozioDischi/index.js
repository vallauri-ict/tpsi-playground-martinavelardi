"use strict";

$(document).ready(function () {
    let table = $("#table>div")
    let request = inviaRichiesta("GET", "servizi/elencoDischi.php");
    // la risorsa NON deve cominciare con "/"

    request.fail(errore);
    request.done(function (data) {
        console.log(data);
        for (const item of data) {
            let txt = $("<input type='text'>");
            txt.val(item.id);
            txt.appendTo(table);

            txt = $("<input type='text'>");
            txt.val(item.autore);
            txt.appendTo(table);

            txt = $("<input type='text'>");
            txt.val(item.titolo);
            txt.appendTo(table);

            txt = $("<input type='text'>");
            txt.val(item.anno);
            txt.appendTo(table);

            // Salva
            let button = $("<button class='btn btn-outline-dark>");
            button.html("Salva");
            button.appendTo(table);
            button.prop("disabled", true);
            button.prop("id", item.id);
            button.on("click", salva);

            // Annulla
            button = $("<button class='btn btn-outline-dark>");
            button.html("Annulla");
            button.appendTo(table);
            button.prop("disabled", true);
            button.prop("disco", item);
            button.on("click", annulla);

            // Elimina
            button = $("<button class='btn btn-outline-dark>");
            button.html("Elimina");
            button.prop("id", item.id);
            button.appendTo(table);
            button.on("click", elimina);
        }
        
        // input => sui textbox si genera ogni volta che si preme un tasto
        table.on("input", "input", function () {
            let salva = $(this).nextAll("button").eq(0);
            salva.prop("disabled", false);

            let annulla = $(this).nextAll("button").eq(1);
            annulla.prop("disable", false);
        })
    });

    function salva() {
        let param = {
            "id": $(this).prop("id"),
            "anno":$(this).prevAll().eq(0).val(),
            "titolo":$(this).prevAll().eq(1).val(),
            "autore":$(this).prevAll().eq(2).val()
        }
        let request = inviaRichiesta("post", "servizi/salva.php", param);
        request.fail(errore);
        request.done(function (data) {
            console.log(data);
            alert("Dati inseriti correttamente.");
            window.location.reload();
        })
    }

    function annulla() {
        window.location.reload();
    }

    function elimina() {
        let param = {
            "id": $(this).prop("id")
        }
        let request = inviaRichiesta("post", "servizi/elimina.php", param);
        request.fail(errore);
        request.done(function (data) {
            console.log(data);
            alert("Dati inseriti correttamente.");
            window.location.reload();
        })
    }
})