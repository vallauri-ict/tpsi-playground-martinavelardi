"use strict"

let _wrapper;

// se una funzione viene richiamata dall'html deve e ssere scritta fuori da ready
function evidenzia(selector) {
    _wrapper.children().css("backgroundColor", "")   // toglie il colore impostato da javascript

    // prendo i figli identificati dal selettore (wrapper)
    _wrapper.children(selector).css({ "backgroundColor": "#FF0" })
}

$(document).ready(function () {
    _wrapper = $("#wrapper")

    // conta il numero di elementi
    $("#btn1").on("click", function () {
        alert($("#wrapper li").length)  // css
        alert($("#wrapper").children().length)  // jquery accedo a wrapper e vado a prendere i figli
    })

    // visualizza i testi
    $("#btn2").on("click", function () {
        let list = $("#wrapper").children();
        let msg = ""; // per fare una sola alert con tutte le voci

        // soluzione 1
        for (let i = 0; i < list.length; i++) {
            // msg+=list[i].innerHTML // js
            // msg+= $(list[i]).html();
            // msg+=list.eq(i).html()  // .eq(i) --> restituisce l'elemento i-esimo
        }

        // soluzione 2
        for (const item of list) {
            // msg += $(item).html()
        }

        // soluzione 3
        // i --> indice elemento
        // ref --> puntatore js
        // i = ref
        list.each(function (i, ref) {
            msg += $(ref).html();
            // restituisce i puntatori agli elementi della collezione
            // msg+=list.eq(i).html();
            // msg+=$(this).html();    // se non voglio usare i o ref
        })

        alert(msg)
    })

    // i selettori css sono a base 1

    // colora di giallo gli elementi pari
    $("#btn3").on("click", function () {
        // $("#wrapper li:nth-of-type(even)").css({"backgroundColor":"#FF0"})
        // $("#wrapper").children(":nth-of-type(even)").css({"backgroundColor":"#FF0"})

        // $("#wrapper").children().filter(":nth-of-type(even)").css({"backgroundColor":"#FF0"})
        let aus = $("#wrapper").children(":nth-of-type(even)")
        // aus.filter(":last").css({ "backgroundColor": "#FF0" })
        aus.css({ "backgroundColor": "#FF0" })

        // ha senso fare un each quando devo colorare un elemento specifico(?)
        aus.each(function (i, ref) {
            $(ref).css({ "backgroundColor": "#FF0" })
        })
    })

    // coloro di verde gli elementi dispari
    $("#btn4").on("click", function () {
        let _dispari = _wrapper.children(":nth-of-type(odd)")
        _dispari.each(function (i, ref) {
            let colore = 50 * (i + 1)
            $(ref).css({ "backgroundColor": `rgb(0,${colore},0)` })
        })
    })

})