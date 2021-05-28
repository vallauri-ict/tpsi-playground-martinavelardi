"use strict";

$(document).ready(function () {
    $("#btnInvia").on("click", function () {
        let titolo = $("#txtTitolo");
        let autore = $("#txtInterprete");
        let anno = $("#txtAnno");
        if (titolo.val() != "" && autore.val() != "") {
            let param = {
                "titolo": titolo.val(),
                "autore": autore.val(),
                "anno": anno.val()
            }
            let request = inviaRichiesta("post", "servizi/inserisci.php", param);
            request.fail(errore);
            request.done(function (data) {
                alert("Record inserito correttamente");
                window.location.href = "index.html";
            })
        }
    })
})