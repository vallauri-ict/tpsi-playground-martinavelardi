"use strict"

window.onload = function () {
    // cocktails
    localStorage.setItem("cocktails_json", JSON.stringify(cocktails));  // metto il file nel localStorage
    let vetCocktail = cocktails.drinks;

    //ingredienti
    localStorage.setItem("ingredienti_json", JSON.stringify(ingredients));
    let vetIngredienti = ingredients.ingredients;

    // accedo ai vari elementi
    let _table = document.getElementById("table");
    let _listbox = document.getElementById("lstIngredienti");

    // gestisco i radio button
    let _optTutti = document.getElementById("optTutti");
    let _optAlcolici = document.getElementById("optAlcoholic");
    let _optNonAlcolici = document.getElementById("optNonAlcoholic");
    // aggiungo gli eventi
    _optTutti.addEventListener("click", caricaTabellaCocktails);
    _optAlcolici.addEventListener("click", caricaTabellaCocktails);
    _optNonAlcolici.addEventListener("click", caricaTabellaCocktails);

    // richiami alle procedure
    caricaListaIngredienti();
    caricaTabellaCocktails();
    _listbox.addEventListener("change", caricaTabellaCocktails);


    // *************************** FUNZIONI ***************************
    function creaIntestazioni() {
        let _tr = document.createElement("tr");
        _table.appendChild(_tr);
        let intestazioni = ["", "id", "name", "alcohlic", "main ingredient", ""];
        for (let i = 0; i < intestazioni.length; i++) {
            let _th = document.createElement("th");
            _th.innerHTML = intestazioni[i];
            switch (intestazioni[i]) {
                case 'name':
                    _th.style.width = "60px";
                    break;
                case 'alcohlic':
                    _th.style.width = "70px";
                    break;
                case 'main ingredient':
                    _th.style.width = "70px";
                    break;
                default:
                    _th.style.width = "40px";
                    break;
            }
            _tr.appendChild(_th);
        }
    }

    function caricaListaIngredienti() {
        // ordinamento il vettore
        vetIngredienti.sort(function (record1, record2) {
            let str1 = record1.strIngredient1.toUpperCase();
            let str2 = record2.strIngredient1.toUpperCase();
            if (str1 < str2)
                return -1;
            else if (str1 > str2)
                return 1;
            else return 0;
        });

        // caricamento listbox
        let _option = document.createElement("option");
        _option.innerHTML = ""; // campo vuoto
        _listbox.appendChild(_option);

        for (const item of vetIngredienti) {    // campi con nomi
            let _option = document.createElement("option");
            _option.innerHTML = item['strIngredient1'];
            // _option.text=item;
            _listbox.appendChild(_option);
        }
    }

    function caricaTabellaCocktails() {
        _table.innerHTML = "";    // pulisco il contenuto della tabella
        creaIntestazioni(); // la richiamo qua perché così non le metto per poi cancellarle per poi rimetterle
        for (const item of vetCocktail) {
            // controllo quale radio button è selezionato
            if (((_optTutti.checked) || (_optAlcolici.checked && item['strAlcoholic'] == "Alcoholic") ||
                (_optNonAlcolici.checked && item['strAlcoholic'] == "Non alcoholic")) && ((_listbox.value == "") || (_listbox.value == item.strIngredient1))) {  //se soddisfa entrambe devo visualizzarlo altrimenti no
                let _tr = document.createElement("tr");
                _table.appendChild(_tr);

                let _td;
                let _img;

                // image
                _td = document.createElement("td");
                _img = document.createElement("img");
                _img.style.width = "40px";
                _td.appendChild(_img);
                _img.src = item['strDrinkThumb'];
                _tr.appendChild(_td);

                // id
                _td = document.createElement("td");
                _td.innerHTML = item['idDrink'];
                _tr.appendChild(_td);

                // name
                _td = document.createElement("td");
                _td.innerHTML = item['strDrink'];
                _tr.appendChild(_td);

                // alcoholic
                _td = document.createElement("td");
                _td.innerHTML = item['strAlcoholic'];
                _tr.appendChild(_td);

                // main ingredient
                _td = document.createElement("td");
                _td.innerHTML = item['strIngredient1'];
                _tr.appendChild(_td);

                // dettagli
                _td = document.createElement("td");
                let _a = document.createElement("a");
                _td.appendChild(_a);
                _a.innerHTML = "dettagli";
                _a.href = "#";    // rendo fittizio il collegamento
                _a['idDrink'] = item['idDrink'];  // creo un campo da usare nella procedura visualizzaDettagli per capire di quale drink voglio visualizzare i dettagli
                _a.addEventListener("click", visualizzaDettagli);
                _tr.appendChild(_td);
            }
        }
    }

    function visualizzaDettagli() {
        let _divDettagli = document.getElementById("dettagli");
        _divDettagli.innerHTML = "";  // ripulisco il campo
        for (const item of cocktails.drinks) {
            // controllo a quale drink appartiene l'id che ho salvato prima. 
            // this.idDrink si riferisce al "dettagli" che ho premuto
            if (item.idDrink == this.idDrink) {

                // h3
                let _h3 = document.createElement("h3");
                _h3.innerHTML = item.strDrink;
                _divDettagli.appendChild(_h3);

                // ingredients
                let ingredients = "";
                for (let i = 1; i <= 5; i++) {
                    if (item['strIngredient' + i] != null) {    // controllo se non è null perché molti non hanno 5 ingredienti
                        ingredients += item['strIngredient' + i] + " - ";
                    }
                }
                let _p = document.createElement("p");
                _divDettagli.appendChild(_p);
                _p.innerHTML = "Ingredients: " + ingredients;

                // img
                let _img = document.createElement("img");
                _divDettagli.appendChild(_img);
                _img.src = item['strDrinkThumb'];
                _img.style.width = "140px";
                break;
            }
        }
    }
}