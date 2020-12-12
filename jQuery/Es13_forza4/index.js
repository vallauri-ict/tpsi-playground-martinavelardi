'use strict'

const RIGHE = 6
const COLONNE = 7

const GIALLO = "rgb(255, 255, 0)"
const ROSSO = "rgb(255, 0, 0)"
const GRIGIO = "rgb(187, 187, 187)"

let turno = GIALLO

$(document).ready(function() {
    let _wrapper = $("#wrapper")
    let _header = $("#header")

    // creazione pedine intestazione
    for (let i = 0; i < COLONNE; i++) {
        let pedina = $("<div>")
        pedina.addClass("pedina")
        pedina.appendTo(_header)
            /* pedina.hover(
                function() {
                    // dentro le funzioni si usa this
                    $(this).css("backgroundColor", turno) // una sola prop
                    $(this).css({ "backgroundColor": turno }) // più prop
                },
                function() {
                    $(this).css("backgroundColor", GRIGIO)
                }
            ) */
    }

    // creazione pedine wrapper
    for (let i = 0; i < RIGHE; i++) {
        for (let j = 0; j < COLONNE; j++) {
            let pedina = $("<div>")
            pedina.addClass("pedina")
            pedina.appendTo(_wrapper)
            pedina.prop("id", `btn-${i}-${j}`)
        }
    }

    // da usare i delegate events se ci passo più volte nella creazione dinamica
    _header.on("mouseenter", "div", function() { $(this).css("backgroundColor", turno) })
    _header.on("mouseleave", "div", function() { $(this).css("backgroundColor", GRIGIO) })
    _header.on("click", "div", down)

    function down() {
        // restituisce l'indice di $(this) all'interno del contenitore
        let colonna = _header.children("div").index($(this))
        let riga = RIGHE - 1 // riga=posizione della 1^ cella libera
        for (let i = 0; i < RIGHE; i++) {
            let p = $(`#btn-${i}-${colonna}`)
            if (p.css("backgroundColor") != GRIGIO) {
                riga = i - 1 // ho il riferimento su dove inserire la pedina
                break
            }
        }
        // se c'è una cella libera entra nella if
        if (riga != -1) {
            let pedina = $("<div>")
            pedina.appendTo(_wrapper)
            pedina.addClass("pedina")
            pedina.css({
                "backgroundColor": turno,
                "position": "absolute",
                "top": -60, // "top":"-60px"
                "left": colonna * 60 + 5
            })
            _header.off("click")
            let _turno = turno // variabile ausiliaria
            $(this).trigger("mouseenter")
            turno == GIALLO ? turno = ROSSO : turno = GIALLO;
            pedina.animate({ "top": riga * 60 + 5 }, 200 * riga + 1,
                    function() {
                        $(`#btn-${riga}-${colonna}`).css({ "backgroundColor": _turno })
                        _header.on("click", "div", down)
                    }
                ) // +1 perché se la riga==0 non farebbe l'animazione

        } else alert("Mossa non valida")
    }
})