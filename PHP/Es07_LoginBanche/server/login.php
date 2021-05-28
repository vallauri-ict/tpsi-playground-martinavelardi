<?php
header("content-type:application/json; charset=utf-8");
require("php-mysqli.php");

# step 1
if (isset($_REQUEST["username"])) {
    $username = $_REQUEST["username"];
} else {
    http_response_code(400);
    die("Parametro mancante: user");
}
if (isset($_REQUEST["password"])) {
    $password = $_REQUEST["password"];
} else {
    http_response_code(400);
    die("Parametro mancante: password");
}
# step 2
$con = _openConnection();

# step 3
$sql = "SELECT * FROM correntisti WHERE Nome='$username'";
$rs = _execute($con, $sql);

# step 4
if (count($rs) == 0) {
    http_response_code(401);
    $con->close();
    die("Credenziali non valide");
} else {
    if ($rs[0]["Pwd"] != $password) {
        http_response_code(401);
        $con->close();
        die("Credenziali non valide");
    } else {
        # creo una sessione relativo all'utente corrente
        session_start(); # accedo all'oggetto di sistema "session"

        # dentro la sessione relativa all'utente corrente creo un campo cCorrentista in cui mi salvo l'id
        $_SESSION["cCorrentista"] = $rs[0]["cCorrentista"];
        # imposto una scadanza alla sessione
        $_SESSION["scadenza"] = time() + SCADENZA;

        setcookie(session_name(), session_id(), time() + SCADENZA, "/");

        # se voglio restituire un json diretto DEVO scriverlo sottoforma di stringa
        echo ('{"ris":"ok"}');
    }
}

# step 5
$con->close();
