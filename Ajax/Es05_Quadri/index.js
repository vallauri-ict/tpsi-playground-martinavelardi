"use strict"

const URL = "http://localhost:3000"

$(function() {
    let _head = $('.head');
    let _info = $('.info');
    let _img = $('.img');
    let _btnPrev = $('button').eq(0);
    let _btnNext = $('button').eq(1);
    _btnPrev.prop("disabled", true)

    let _wrapperAdd = $('.wrapper').eq(1);

    let reqest = inviaRichiesta("get", URL + "/artisti")
    reqest.fail(errore)
    reqest.done(function(artisti) {
        for (const artista of artisti) {
            let label = $("<label>")
            label.appendTo(_head)
            let radio = $("<input type='radio'>") // radio.prop("type","radio")
            radio.prop("name", "artisti")
            radio.prop("artista", artista)
            radio.appendTo(label);
            //label.text(artista.name)    non funziona perché si sovrascrive
            label.append(artista.name); // appendo un testo, si concatena OK
        }
        let n = generaNumero(0, artisti.lenght - 1)
        let chk = $("<input[type='radio']>").eq(n) // senza spazi intermedi
        chk.prop("checked", true)
        let idArtista = chk.prop("artista").id

        let reqest2 = inviaRichiesta("get", URL + "/quadri?artist" + idArtista)
        reqest2.fail(errore)
        reqest2.done(function(quadri) {
            visualizzaQuadro(quadri[0], chk.prop("artista").gender)
        })
    })

    function visualizzaQuadro(quadro, genere) {
        _info.html = ""
        $("<p>").text("ID = " + quadro.id).appendTo(_info)
        $("<p>").text("titolo = " + quadro.title).appendTo(_info)
        $("<p>").text("genere = " + genere).appendTo(_info)
        $("<p>").text("like = " + quadro.nLike).appendTo(_info).append($("<img>").prop("src", "like.jpg").appendTo(_img))

        $("<img>").prop("src", "img/" + quadro.img).appendTo(_img)
    }
})