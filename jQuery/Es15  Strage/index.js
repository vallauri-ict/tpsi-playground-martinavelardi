"use strict"

let button = $("<button>")
let tempoTrascorso = 0
let _mainSection

$(document).ready(function() {
    let _header = $("#header");
    _mainSection = $("#mainSection");

    // timer
    let _timer = $("#timer");
    _timer.addClass("timer");
    // minuti
    let _spanMin = $("<span>")
    _spanMin.html(pad(0) + ":")
    _spanMin.appendTo(_timer);
    // secondi
    let _spanSec = $("<span>")
    _spanSec.html(pad(0))
    _spanSec.appendTo(_timer)

    // animazione
    _header.animate({
            "width": parseInt(_header.css("width")) * 15,
            "height": parseInt(_header.css("height")) * 15,
            "font-size": parseInt(_header.css("font-size")) * 15,
            "line-height": parseInt(_header.css("line-height")) * 15
        },
        1500,
        function() {
            for (const item of elencoDomande) {
                // creo il fieldset
                let fieldset = $("<fieldset>");
                fieldset.appendTo(_mainSection);

                // creo il legend
                let argomento = item.argomento;
                let legend = $("<legend>");
                legend.appendTo(fieldset);
                legend.html(argomento);
                legend.css({ "color": "#00F", "font-size": "12pt" });

                // domande
                let domanda = item.domande;
                for (const item1 of domanda) {
                    //console.log(item1);

                    // creo una label in cui ho una domanda
                    let label = $("<label>")
                    label.appendTo(fieldset)
                    label.html(item1.domanda)
                    let br = $("<br/>")
                    br.appendTo(fieldset)

                    // creo i radio button
                    let radioT = $("<input>")
                    radioT.prop("name", "r")
                    let radioF = $("<input>")
                    radioF.prop("name", "r")
                    let labelT = $("<label>")
                    let labelF = $("<label>");
                    // true
                    radioT.prop("type", "radio")
                    radioT.prop("value", "T")
                    labelT.html("T")
                    radioT.appendTo(label)
                    labelT.appendTo(label);
                    // false
                    radioF.prop("type", "radio")
                    radioF.prop("value", "F")
                    labelF.html("F")
                    radioF.appendTo(label)
                    labelF.appendTo(label)
                }
            }

            // timer
            let secondi = 0
            let minuti = 0
            let divisore = ":"
            tempoTrascorso = setInterval(() => {
                if (minuti == 2) {
                    clearInterval(tempoTrascorso)
                    invia()
                } else {
                    if (secondi < 60) {
                        _spanSec.html(pad(secondi))
                        secondi++
                    } else {
                        secondi = 0
                        minuti++
                        _spanSec.html(pad(0))
                        _spanMin.html(pad(minuti) + divisore)
                    }
                }
            }, 1000);

            // invia
            button.addClass("invia")
            button.html("INVIA")
            button.appendTo(_mainSection)
            button.on("click", invia)
        })

});


function invia() {
    button.off()
    clearInterval(tempoTrascorso)
    button.css({ "backgroundColor": "#CCC", "color": "#999" })
    let punti = 0
    _mainSection.find("label").filter(".domanda").each(function(i, ref) {
        let radio1 = _mainSection.find("input").eq(i * 2)
        let radio2 = _mainSection.find("input").eq((i * 2) + 1)
        if (radio1.is(":checked")) {
            if (radio1.attr("corretta") == "T") {
                punti++
            } else {
                punti--
                _mainSection.find("label").not(".domanda").eq(i * 2).css("color", "#F00")
            }
        } else if (radio2.is(":checked")) {
            if (radio2.attr("corretta") == "T") {
                punti++
            } else {
                punti -= 0.25
                _mainSection.find("label").not(".domanda").eq((i * 2) + 1).css("color", "#F00")
            }
        }
    })
    alert(punti)
}

// Una semplice funzione per aggiungere uno 0 davanti ad un numero < 10
function pad(number) {
    return (number < 10 ? '0' : '') + number;
}