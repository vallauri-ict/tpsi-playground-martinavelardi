<?php
header('Content-type: application/json; charset=utf-8');
require("php-mysqli.php");


# step 1: lettura scrittura parametri
if (isset($_REQUEST["id"])) {
    $id = $_REQUEST["id"];
} else {
    # errore parametro mancante
    http_response_code(400);
    die("Paramentro mancante: id");
}

if (isset($_REQUEST["titolo"])) {
    $id = $_REQUEST["titolo"];
} else {
    # errore parametro mancante
    http_response_code(400);
    die("Paramentro mancante: titolo");
}

if (isset($_REQUEST["autore"])) {
    $id = $_REQUEST["autore"];
} else {
    # errore parametro mancante
    http_response_code(400);
    die("Paramentro mancante: autore");
}

if (isset($_REQUEST["anno"])) {
    $id = $_REQUEST["anno"];
} else {
    # errore parametro mancante
    http_response_code(400);
    die("Paramentro mancante: anno");
}


# step 2: apertura connessione
$con = _openConnection();

# step 3: esecuzione query
$sql = "UPDATE 'dischi' SET titolo='$titolo', autore='$autore', anno=$anno WHERE id=$id";
$rs = _execute($con, $sql);

# step 4: invio dati al client
if ($rs) {
    echo ('{"ris":"ok"}');   # devo per forza restituire un json
} else {
    # step 5: chiusura della connessione
    $con->close();
    http_response_code(500);
    die("Errore esecuzione query");
}

# step 5: chiusura della connessione
$con->close();
