'use strict'

window.onload = function () {
    let json = localStorage.getItem("bookstore_json");
    console.log(json);
    let jsonVet = JSON.parse(json);  // parsifico il JSON
    let indiceLibroCorrente = 0;
    let _table = document.createElement("table");    // creo una tabella
    let _body = document.getElementsByTagName("body")[0];
    _body.appendChild(_table);  // appendo la tabella al body
    let _divDettagli;

    creaIntestazioni();
    caricaDati();
    creaDettagli();
    visualizza();
    creaPulsanti();

    function creaIntestazioni() {
        let _tr = document.createElement("tr");
        _table.appendChild(_tr); // appendo la riga alla tabella
        let intestazioni = ["title", "authors", "category", "price", ""];
        for (let i = 0; i < intestazioni.length; i++) {
            let _th = document.createElement("th");
            _th.innerHTML = intestazioni[i];
            _tr.appendChild(_th);
        }
    }


    function caricaDati() {
        // Lettura e caricamento dati
        for (let i = 0; i < jsonVet.length; i++) {
            let item = jsonVet[i];
            //for (const item=jsonVet[i] of jsonVet) {   // (for of) item di jsonVet = jsonVet[i] --> book
            let _tr = document.createElement("tr");
            _table.appendChild(_tr);
            let _td;

            _td = document.createElement("td");
            _td.innerHTML = item.title;
            _tr.appendChild(_td);

            _td = document.createElement("td");
            // authors è un vettore enumerativo
            // il metodo join restituisce una stringa contenente tutte le voci del vettore separate da una virgola
            // join si può usare solo con questo tipo di vettore
            // _td.innerHTML=item.authors.join(", ");  // la "," viene messa solo dal console.log()    nel vettore non è presente
            // nel caso dei vettori enumerativi la serializzazione viene fatta in automatico
            _td.innerHTML = item.authors;
            _tr.appendChild(_td);

            _td = document.createElement("td");
            _td.innerHTML = item.category;
            _tr.appendChild(_td);

            _td = document.createElement("td");
            _td.innerHTML = item.price;
            _tr.appendChild(_td);

            // creazione pulsante ELIMINA
            _td = document.createElement("td");
            let _button = document.createElement("button");
            _button.innerHTML = "elimina";
            _td.appendChild(_button);
            _tr.appendChild(_td);
            _button.addEventListener("click", eliminaRecord);
            _button.recordDaEliminare = i;  // crea un nuovo campo accessibile al pulsante
        }
    }

    function eliminaRecord() {
        let pos = this.recordDaEliminare; // indice del record da eliminare
        jsonVet.splice(pos, 1);
        localStorage.setItem("bookstore_json", JSON.stringify(jsonVet)); // salvo i dati aggiornati all'interno del localStorage
        window.location.reload();

    }

    function creaDettagli() {
        // Creazione dei dettagli
        _divDettagli = document.createElement("div");
        _body.appendChild(_divDettagli);
        _divDettagli.setAttribute("class", "dettagli");
    }


    function visualizza() {
        _divDettagli.innerHTML = "";
        let libroCorrente = jsonVet[indiceLibroCorrente];
        for (const key in libroCorrente) {
            let _p1 = document.createElement("p");    // intestazione
            _p1.innerHTML = key;
            _p1.style.textAlign = "right";
            _p1.style.fontWeight = "bold";
            _divDettagli.appendChild(_p1);
            let _p2 = document.createElement("p");    // contenuto
            _p2.innerHTML = libroCorrente[key];
            _divDettagli.appendChild(_p2);
        }
    }

    function creaPulsanti() {
        let _divPulsantiNavigazione = document.createElement("div");
        _divPulsantiNavigazione.setAttribute("class", "contenitorePulsantiNavigazione");
        _body.appendChild(_divPulsantiNavigazione);

        let nomiPulsanti = ["primo", "indietro", "avanti", "ultimo", "aggiungi", "elimina per categoria"];    // vettore enumerativo
        for (const item of nomiPulsanti) {
            let _button = document.createElement("button");
            _button.id = item;    // assegno come id il nome stesso del pulsante in modo da poter accedere al pulsante da altre procedure
            _button.setAttribute("class", "pulsantiNavigazione");
            _button.addEventListener("click", gestionePulsanti);
            _button.innerHTML = item;
            _divPulsantiNavigazione.appendChild(_button);
        }
        document.getElementById("indietro").disabled = true;
    }
    function gestionePulsanti() {
        let _indietro = document.getElementById("indietro");
        let _avanti = document.getElementById("avanti");
        switch (this.innerHTML) {
            case "primo":
                indiceLibroCorrente = 0;
                _indietro.disabled = true;
                _avanti.disabled = false;
                break;
            case "avanti":
                indiceLibroCorrente++;
                if (indiceLibroCorrente == jsonVet.length - 1) {
                    _avanti.disabled = true;
                }
                _indietro.disabled = false;
                break;
            case "indietro":
                indiceLibroCorrente--;
                if (indiceLibroCorrente == 0) {
                    _indietro.disabled = true;
                }
                _avanti.disabled = false;
                break;
            case "ultimo":
                indiceLibroCorrente = jsonVet.length - 1;
                _avanti.disabled = true;
                _indietro.disabled = false;
                break;
            case 'aggiungi':
                // window.location.href="pagina2.html"; apre nella stessa scheda
                window.open("pagina2.html");    // apre in un'altra scheda
                break;
            case 'elimina per categoria':
                // come una mbox
                let categoria = prompt("Inserisci una categoria: ");
                let qta = 0;
                for (let i = jsonVet.length - 1; i >= 0; i--) {
                    if (jsonVet[i].category == categoria) {
                        jsonVet.splice(i, 1);   // cancello parametri
                        qta++;
                    }
                }
                if (qta > 0) {
                    alert("Cancellati: " + qta + " record");
                    localStorage.setItem("bookstore_json", JSON.stringify(jsonVet)); // salvo i dati aggiornati all'interno del localStorage
                    window.location.reload();
                }
                else {
                    alert("Nessun record trovato");
                }
                break;

            default:
                break;
        }
        visualizza();
    }
}