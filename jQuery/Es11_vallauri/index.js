'use strict'

$(document).ready(function() {
    let _wrapper = $("#wrapper")

    for (let i = 0; i < 36; i++) {
        /*
        let box = $("<div>");
        box.addClass("box");
        $("#wrapper").appendTo(box);
        */
        /* stessa cosa ma su una sola riga: */
        $("<div>").addClass("box").appendTo($("#wrapper"))
    }

    setInterval(aggiorna, 33)


    function aggiorna() {
        let n = generaNumero(0, 36)
            // let box = _wrapper.children().eq(n)
        let box = _wrapper.children(".box").eq(n)
        box.animate({ "opacity": 0.3 }, 400)
            .animate({ "opacity": 0.6 }, 400)
            .animate({ "opacity": 0.1 }, 400);
        /* le animazioni vengono eseguite in sequenza */
    }

    function generaNumero(min, max) {
        let n = Math.floor((max - min + 1) * Math.random() + min);
        return n;
    }
})