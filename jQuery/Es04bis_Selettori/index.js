$(document).ready(function () {
    // _p --> collezione di elementi jQuery (vettore enumerativo di puntatori)
    let _p = $("p");

    // in scrittura, i metodi modificano il valore di tutti gli elementi della collezione
    alert(_p.length);
    _p.css("backgroundColor","#FF0");

    // in lettura, i metodi modificano solo il valore del primo elemento
    $(".primo").css("backgroundColor","#F00");
    alert(_p.css("backgroundColor"));

    _p.hide(800);   // lo utilizzo in scrittura

    for (const obj of _p) {
        obj.style
    }
    // js
    let p1=document.getElementsByClassName("primo")[0];
    p1.innerHTML="sono il primo elemento";

    // jQuery
    let _p1=$(p1);
    _p1.css("backgroundColor","#00F");

    // js
    let aus=_p1[0];
    aus.style.color="#FFF";
})