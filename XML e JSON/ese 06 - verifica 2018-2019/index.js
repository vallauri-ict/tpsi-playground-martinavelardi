"use strict"
window.onload = function () {
    // importo il file nel localStorage
    localStorage.setItem("fileJson_json", JSON.stringify(json));
    let vetJson = json.results;

    // accedo agli elementi
    let _lstNazioni = document.getElementById("lstNazioni");
    let _table = document.getElementById("table");
    let _thead = document.getElementById("thead");
    let _tbody = document.getElementById("tbody");
    _tbody.style.overflowY = "auto";
    _table.appendChild(_tbody);
    let _divDettagli = document.getElementById("dettagli");

    // richiami procedure
    caricaListBox();
    ripulisciDettagli();
    caricaTabella();
    _lstNazioni.addEventListener("change", caricaTabella);

    // procedure
    function caricaListBox() {
        let vetAus = [];
        for (const item of vetJson) {
            if (!vetAus.includes(item['nat'])) {
                vetAus.push(item['nat']);
            }
        }
        for (const item of vetAus) {    // campi con nomi
            let _option = document.createElement("option");
            _option.innerHTML = item;
            _lstNazioni.appendChild(_option);
        }
    }

    function ripulisciDettagli() {
        _divDettagli.innerHTML = "";
    }

    function creaIntestazioni() {
        let _tr = document.createElement("tr");
        _thead.appendChild(_tr)
        let intestazioni = ["name", "username", "state", "nat", "img"];
        for (let i = 0; i < intestazioni.length; i++) {
            let _th = document.createElement("th");
            _th.innerHTML = intestazioni[i];
            _tr.appendChild(_th);
        }
    }

    function caricaTabella() {
        _thead.innerHTML = "";
        _tbody.innerHTML = "";
        creaIntestazioni();
        ripulisciDettagli();

        for (const item of vetJson) {
            if (_lstNazioni.value == "tutti" || item['nat'] == _lstNazioni.value) {
                let _tr = document.createElement("tr");
                _tbody.appendChild(_tr);

                let _td;
                let _img;

                // name
                _td = document.createElement("td");
                _td.innerHTML = item['name']['first'] + " " + item['name']['last'];
                _tr.appendChild(_td);

                // username
                _td = document.createElement("td");
                _td.innerHTML = item['login']['username'];
                _tr.appendChild(_td);

                // state
                _td = document.createElement("td");
                _td.innerHTML = item['location']['state'];
                _tr.appendChild(_td);

                // nat
                _td = document.createElement("td");
                _td.innerHTML = item['nat'];
                _tr.appendChild(_td);

                // image
                _td = document.createElement("td");
                _img = document.createElement("img");
                _img.style.width = "50px";
                _td.appendChild(_img);
                _img.src = item['picture']['thumbnail'];
                _img['nomeUtente'] = item['login']['username'];
                _img.addEventListener("click", visualizzaDettagli);
                _tr.appendChild(_td);
            }
        }
    }

    function visualizzaDettagli() {
        _divDettagli = document.getElementById("dettagli");
        let _a = document.createElement("a");
        _divDettagli.innerHTML = "";  // ripulisco il campo
        for (const item of vetJson) {
            if (item['login']['username'] == this['nomeUtente']) {

                // img
                let _img1 = document.createElement("img");
                _img1.src = item['picture']['large'];
                _divDettagli.appendChild(_img1);

                // name
                _a = document.createElement("h3");
                _a.innerHTML = item['name']['first'] + " " + item['name']['last'];
                _divDettagli.appendChild(_a);

                // mail
                _a = document.createElement("h3");
                _a.innerHTML = item['email'];
                _divDettagli.appendChild(_a);

                // phone
                _a = document.createElement("h3");
                _a.innerHTML = item['phone'];
                _divDettagli.appendChild(_a);

                // cell
                _a = document.createElement("h3");
                _a.innerHTML = item['cell'];
                _divDettagli.appendChild(_a);

                break;
            }
        }
    }

}