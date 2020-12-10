'use strict'

// funzione inizializzazione jQuery --> è uguale a window.onload=function
$(document).ready(function () {
    let _lampadina = $(".lampadina");   // diverso da document.getElementById
    let _btnSpegni = $("#btnSpegni");   // $ restituisce sempre una collezione jQuery, è un vettore
    let _btnAccendi = $("#btnAccendi");
    let _descrizione=$("#descrizione");
    let _contenuto=$("#contenuto");

    // alle collezioni jQuery si possono applicare solo metodi jQuery

    // ********** PARTE 1 **********
    _btnSpegni.hide();  // se contiene più metodi, applicato a tutti quelli appartenenti a quella collezione
    _lampadina.hide();  // nascondo l'oggetto

    _btnAccendi.on("click", function () {   // funzione in forma anonima
        // il selettore assoluto (#) è prioritario rispetto alla classe (.) --> prevale sempre indipendentemente dall'ordine in cui ho scritto le istruzioni
        _lampadina.addClass("accesa");
        // per far comparire gradualmente la lampadina. tempo in millisecondi, funzione di callback
        // fadeIn default 400ms
        _lampadina.fadeIn(2000, function () {
            _btnSpegni.show();
            _btnAccendi.hide();
        });
    })

    _btnSpegni.on("click", function () {
        _lampadina.fadeOut(2000, function () {
            _btnAccendi.show();
            // _btnAccendi.show(2000); // dissolvenza dallo spigolo in alto a sinistra
            _btnSpegni.hide();
            _lampadina.removeClass("accesa");   // rimuovo la classe che da il colore giallo alla lampadina al termine dell'animazione
        })
        // _lampadina.removeClass("accesa");   // rimuovo la classe senza aspettare la fine dell'animazione
    })

    // ********** PARTE 2 *********
    let descrizione = {
        "width": "160px",
        "height": "40px",
        "text-align": "center",
        "lineHeight": "40px",
        "backgroundColor": "#aaa",
        "textDecoration": "underline",
        "fontSize": "14pt",
        "cursor": "pointer",
        "borderRadius": "10px",
        "marginLeft": "10px"
    }

    _descrizione.css(descrizione);  // per applicare le property
    _contenuto.hide();
    _descrizione.on("mouseover",function() {
        _contenuto.slideDown(1000); // fa comparire un oggetto dall'alto verso il basso
    })
    _descrizione.on("mouseout",function() {
        _contenuto.slideUp(1000);
    })
    // non posso mischiare javascript e jQuery
})