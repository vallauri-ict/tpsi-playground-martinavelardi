'use strict'

const DIM = 4

$(document).ready(function() {
    let _wrapper = $("#wrapper");
    // creazione matrice elementi
    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
            let div = $("<div>")
            div.addClass("pedina")
            div.appendTo(_wrapper)
        }
    }
})