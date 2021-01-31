"use strict";

function inviaRichiesta(url) {
    return $.ajax({
        "url": url,
        "type": "GET", // default
        "data": "", // contiene i parametri da passare al server
        "contentType": "application/x-www-form-urlencoded;charset=utf-8", // default
        "dataType": "json", // default - formato in cui restituire i dati al chiamante     
        "timeout": 5000, // default - tempo di attesa di risposta dal server
    });
}


function errore(jqXHR, text_status, string_error) {
    if (jqXHR.status == 0)
        alert("Connection Refused or Server timeout");
    else if (jqXHR.status == 200)
        alert("Formato dei dati non corretto : " + jqXHR.responseText);
    else
        alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}


function generaNumero(a, b) {
    return Math.floor((b - a + 1) * Math.random()) + a;
}