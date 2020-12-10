"use strict"

let intestazioni = ["idMeal", "strMeal", "img", "", ""];
let larghezze = ["50px", "310px", "60px", "40px", "40px"];

window.onload = function () {
    // accesso agli elementi
    let _radioWrapper = document.getElementById("radioWrapper");
    let _table = document.getElementById("table");
    let _dettagli = document.getElementById("dettagliWrapper");

    let categoria = "Breakfast";

    // richiamo funzioni
    caricaRadioButtons();
    caricaTabella();

    // ******************************************************************

    // dove c'è un vettore con una graffa / vettore associativo --> for in, solo se devo scorrere le chiavi altrimenti si usa il .
    // dove c'è un vettore con una quadra / vettore enumerativo --> for of

    function caricaRadioButtons() {
        for (const key in categoryList) {
            let radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.name = "category";
            radioButton.value = key
            _radioWrapper.appendChild(radioButton);

            let _span = document.createElement("span");
            _span.innerHTML = key;
            _radioWrapper.appendChild(_span);

            let _br = document.createElement("br");
            _radioWrapper.appendChild(_br);

            if (key == "Breakfast") {
                radioButton.checked = true;
            }

            radioButton.addEventListener("click", function () {  // procedura in forma anonima
                categoria = this.value;   // variabile globale usata per caricare la tabella con gli elementi della categoria selezionata
                caricaTabella();
            })
        }
    }

    function creaIntestazioni() {
        let _tr = document.createElement("tr");
        _table.appendChild(_tr);

        // uso un for normale per accedere anche all'altro vettore
        for (let i = 0; i < intestazioni.length; i++) {
            let _th = document.createElement("th");
            _th.innerHTML = intestazioni[i];
            _th.style.width = larghezze[i];
            _tr.appendChild(_th);
        }
    }

    function caricaTabella() {
        _table.innerHTML = "";
        creaIntestazioni();

        for (const item of categoryList[categoria]) {   // accede al campo categoria
            let _tr = document.createElement("tr");
            _table.appendChild(_tr);

            // id
            let _td = document.createElement("td");
            _td.innerHTML = item.idMeal;
            _tr.appendChild(_td);

            // nome
            _td = document.createElement("td");
            _td.innerHTML = item.strMeal;
            _tr.appendChild(_td);

            // img
            let _img = document.createElement("img");
            _td = document.createElement("td");
            _img.src = item.strMealThumb;
            _img.style.width = "55px";
            _img.idMeal = item.idMeal;
            _img.addEventListener("click", video);
            _td.appendChild(_img);
            _tr.appendChild(_td);

            // lente
            _img = document.createElement("img");
            _td = document.createElement("td");
            _img.idMeal = item.idMeal;
            _img.addEventListener("click", visualizzaDettagli);
            _img.src = "img/lente.jpg";
            _img.style.width = "55px";
            _td.appendChild(_img);
            _tr.appendChild(_td);

            // delete
            _img = document.createElement("img");
            _td = document.createElement("td");
            _img.src = "img/delete.png";
            _img.style.width = "55px";
            _img.idMeal = item.idMeal;    // mi salvo l'id della voce da cancellare per sapere poi cosa andrò a cancellare nella function
            _img.addEventListener("click", cancella);
            _td.appendChild(_img);
            _tr.appendChild(_td);
        }
    }

    function cancella() {
        for (let i = 0; i < categoryList[categoria].length; i++) {
            let item = categoryList[categoria][i];
            if (item.idMeal == this.idMeal) {   // item.idMeal --> accedo all'id della voce corrente    this.idMeal --> id dell'immagine che ho cliccato
                categoryList[categoria].splice(i, 1);
                break;
            }
        }
        caricaTabella();
    }

    function visualizzaDettagli() {
        // details.meals accedo alla chiave meals, vettore enumerativo
        for (const item of details.meals) {
            let meal = item.meals[0];
            if (meal.idMeal == this.idMeal) { // prendo l'id da details
                let s = "<b>" + meal.strMeal + " </b>";
                s += meal.strInstructions;
                _dettagli.innerHTML = s;
                break;
            }
        }
    }

    function video() {
        for (const item of details.meals) { // oggetto esterno
            let meal = item.meals[0]; // oggetto interno
            if (meal.idMeal == this.idMeal) {
                window.open(meal.strYoutube);
                break;
            }
        }
    }
}