"use strict"

let ul = []
let wrapper;

$(document).ready(function () {
    wrapper = $("#wrapper")
    ul.push(wrapper.children("ul").first()) // punta al 1 menù
    ul.push(wrapper.children("ul").last())  // punta al 2 menù
    // posso usare anche .eq()
})

function aggiungi(index) {
    index--;    // per allinearlo col vettore che è a base 0

    // let li = $("<li> menu 1 voce 4 </li>")   // crea un nuovo elemento <li>
    let li = $("<li>")
    let n = ul[index].children(li).length + 1;
    li.html("menu " + (index + 1) + " voce <b>" + n + "</b>")
    ul[index].append(li);
    // li.appendTo(ul[index])   stessa cosa di quello sopra
}

function sposta(index) {
    index--;

    let li = ul[index].children("li").last()  // puntatore all'ultima voce del menu
    if (index == 0) {
        li.appendTo(ul[1])
    }
    else if (index == 1) {
        li.appendTo(ul[0])
    }
}

function aggiungiPrima(index) {
    index--
    let li = $("<li>")
    li.text("voce iniziale")
    // ul[index].children("li").first().before(li)
    li.insertBefore(ul[index].children("li").first())
}

function aggiungiDopo(index) {
    index--
    let li = $("<li>")
    li.text("voce dopo il primo elemento")
    // ul[index].children("li").first().after(li)
    li.insertAfter(ul[index].children("li").first())
}

function replica(index) {
    index--
    let li = $("<li>")
    li.text("-----------------------------------")
    // ul[index].children("li").before(li)
    li.insertBefore(ul[index].children("li"))
}

function creazioneConCostruttore() {
    $("<div>", {
        "css": {
            "background-color": "#ddd",
            "color": "blue"
        },
        "text": "hello world!",
        "appendTo":wrapper,
        "append": [
            $("<br>"),
            $("<label>", { "text": "hobbies" }),
            $("<input>", { "type": "radio", "name": "hobbies" }),
            $("<span>", { "text": "sports" }),
            $("<input>", { "type": "radio", "name": "hobbies" }),
            $("<span>", { "text": "musica" })
        ]
    })
}