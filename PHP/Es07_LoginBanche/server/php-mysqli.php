<?php
# procedure di interfacciamento PHP - MySQL
define('DBNAME', 'es06_banche');
define('SCADENZA', 60);  # scadenza della sessione

function _openConnection()
{
    define('DBHOST', 'localhost');
    define('DBUSER', 'root'); # admin del database, privo di password
    define('DBPASS', '');

    # fa in modo che, in caso di errore, venga generata un'eccezione
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    try {
        $con = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);
        $con->set_charset("utf8");  # gestione degli apici
        return $con;
    } catch (mysqli_sql_exception $ex) {
        # errore di connessione al server
        http_response_code(503);
        die("Errore connessione db: <br>" . $ex->getMessage());
    }
}
function _execute($con, $sql)
{
    try {
        # per eseguire la query
        $rs = $con->query($sql);
    } catch (mysqli_sql_exception $ex) {
        $con->close();  # chiudo la connessione
        # errore nella query
        http_response_code(500);
        die("Errore nella query sql: <br>" . $ex->getMessage());
    }

    # se il comando era una query di tipo SELECT, convertiamo il record set in un vettore di json.
    # i comandi non di tipo SELECT restituiscono semplicemente un booleano che lasciamo così com'è.
    if (!is_bool($rs)) {
        $data = $rs->fetch_all(MYSQLI_ASSOC); # converto
    } else
        $data = $rs;
    return $data;
}

function _checkSession($key)
{
    session_start();
    if (!isset($_SESSION[$key])) {
        http_response_code(403);
        die("Sessione inesistente o scaduta");
    } else if (!isset($_SESSION["scadenza"]) || $_SESSION["scadenza"] < time() + SCADENZA) {
        http_response_code(403);
        die("Sessione scaduta");
    } else {
        $_SESSION["scadenza"] = time() + SCADENZA;
        setcookie(session_name(), session_id(), time() + SCADENZA, "/");
    }
}
