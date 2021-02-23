"use strict"

const URL = "http://localhost:3000"

$(function() {
    let _head = $('.head');
    let _info = $('.info');
    let _img = $('.img');
    let _btnPrev = $('button').eq(0);
    let _btnNext = $('button').eq(1);
    _btnPrev.prop("disabled", true);
    let quadri;
    let genereQuadri;
    let posizioneQuadro = 0;
    let _wrapperAdd = $('.wrapper').eq(1);
    // <label> <input type='radio'> artistname </label> -->
    let request = inviaRichiesta("get", URL + "/artisti");
    request.fail(errore);
    request.done(function(artisti) {
            for (const artista of artisti) {
                let lbl = $("<label>");
                lbl.appendTo(_head);
                let radio = $("<input type='radio'>");
                radio.prop("type", "radio");
                radio.appendTo(lbl);
                radio.prop("artista", artista);
                //console.log(radio.prop("artista"));
                radio.prop("name", "artisti");
                // lbl.text(artista.nome);// se lo metto qui cancella il testo quando aggiungo il tag
                lbl.append(artista.name); //OK
                // lbl.html(lbl.html() + artista.name);//fa perdere il riferimento DA EVITARE
                // radio.prop("name", "artisti");NO perchè con l'istruzione sovrastante perdo il riferimento
                // radio.prop("artista",artista);
            }
            let n = generaNumero(0, artisti.length - 1);
            let chk = $("input[type='radio']").eq(n) // senza spazi intermedi
            chk.prop("checked", true);
            let idArtista = chk.prop("artista").id;
            genereQuadri = chk.prop("artista").gender;
            _wrapperAdd.children("h1").text("Inserisci un nuovo quadro di " + chk.prop("artista").name);
            InviaRichiestaQuadri(idArtista);

        })
        /***************************************/
    function InviaRichiestaQuadri(idArtista) {
        let request = inviaRichiesta("get", URL + "/quadri?artist=" + idArtista);
        request.fail(errore);
        request.done(function(data) {
            visualizzaQuadro(data[0]);
            quadri = data;
        })

    }
    /***********************************/
    _head.on("click", "input", function() {
            posizioneQuadro = 0;
            _btnNext.prop("disabled", false);
            _btnPrev.prop("disabled", true);
            let idArtista = $(this).prop("artista").id;
            let genere = $(this).prop("artista").gender;
            _wrapperAdd.children("h1").text("Inserisci un nuovo quadro di " + $(this).prop("artista").name);
            // console.log(id);
            genereQuadri = genere;
            InviaRichiestaQuadri(idArtista);
        })
        /*******************************/
    _btnPrev.on("click", function() {
        _btnNext.prop("disabled", false);
        posizioneQuadro--;
        if (posizioneQuadro == 0)
            $(this).prop("disabled", true);
        // $("input[type='radio']:checked").prop("artista").gender
        visualizzaQuadro(quadri[posizioneQuadro])
    })
    _btnNext.on("click", function() {
        _btnPrev.prop("disabled", false);
        posizioneQuadro++;
        if (posizioneQuadro == quadri.length - 1)
            $(this).prop("disabled", true);
        visualizzaQuadro(quadri[posizioneQuadro])
    })

    function visualizzaQuadro(quadro) {
        _info.empty();
        _img.empty();
        $("<p>").text("ID = " + quadro.id).appendTo(_info);
        $("<p>").text("titolo = " + quadro.title).appendTo(_info);
        $("<p>").text("genere = " + genereQuadri).appendTo(_info);
        let img = $("<img>").prop("src", "like.jpg").addClass("like");
        img.on("click", function() {
            let request = inviaRichiesta("patch", URL + "/quadri/" + quadro.id, {
                "nLike": quadro.nLike + 1
            })
            request.fail(errore);
            request.done(function(quadro) {
                // console.log(quadro);
                visualizzaQuadro(quadro);
            })
        })
        $("<p>").text("Like = " + quadro.nLike).appendTo(_info).append(img);
        if (!quadro.img.includes("base64,"))
            $("<img>").prop("src", "img/" + quadro.img).appendTo(_img);
        else
            $("<img>").prop("src", quadro.img).appendTo(_img);
    }

    /***************************************************/

    let _btnSalva = $("#btnSalva");
    let _txtImg = $("#immagine");
    let _txtTitle = $("#titolo");
    let _btnAnnulla = $("#btnAnnulla");

    _btnSalva.on("click", function() {
        if (_txtTitle.val() == "" || _txtImg.prop("files") == "")
            alert("Inserire titole e immagine");
        else {
            let filename = _txtImg.prop("files")[0];
            let reader = new FileReader();
            reader.readAsDataURL(filename);
            reader.onloadend = function() {
                //console.log('RESULT', reader.result);
                let idArtista = $("input[type='radio']:checked").prop("artista").id;
                let jsonAus = {
                    "artist": idArtista,
                    "title": _txtTitle.val(),
                    "img": reader.result,
                    "nLike": 0
                }
                let request = inviaRichiesta("post", URL + "/quadri", jsonAus);
                request.fail(errore);
                request.done(function(data) {
                    console.log(data);
                    alert("immagine iserita corretamente");
                    InviaRichiestaQuadri(idArtista);
                })


            }

        }

    })



})