"use strict";

window.onload = function () {
    let list = JSON.parse(localStorage.getItem("orologi.json"))

    let _btnSalva = document.getElementById("btnSalva");
    let _btnAnnulla = document.getElementById("btnAnnulla");

    let _txtCode = document.getElementById("txtCode");
    let _txtPrice = document.getElementById("txtPrice");
    let _lstColor = document.getElementById("lblColor");
    let _optsGender = document.getElementsByName("optGender"); // in questo case restituisce un vettore lungo 2 di puntatori

    _btnAnnulla.addEventListener("click", function () {
        window.location.href = "inserisci.html";
    })
    _btnSalva.addEventListener("click", function () {

        // leggo i valori che ho inserito
        let code = _txtCode.value;
        let price = _txtPrice.value;
        let color = _lstColor.value.toLowerCase();
        let gender;
        for (const item of _optsGender) {
            if (item.checked) {
                gender = item.value;
                break;
            }
        }

        // salvo i valori nella struttra dati

        // leggo il gender
        let models;
        if (gender == "male") {
            models = list[0].models;
        }
        else {
            models = list[1].models;
        }

        // creao un nuovo swatch
        let newSwatch = {
            "code": code
        }
        newSwatch.price = price;

        // sbagliato
        /*
        newSwatch.swatches = [{ "color": color }]
        newSwatch.swatches.push({ "image": color + "_cardigan.jpg" })
        */

        // corretto
        newSwatch.swatches = [{ "color": color, "image": color + "_cardigan.jpg" }];

        // aggiungo lo swatch a list nel gender selezionato
        models.push(newSwatch);

        // salvo e chiudo
        localStorage.setItem("orologi.json", JSON.stringify(list));
        window.location.href = "index.html";
    })
}