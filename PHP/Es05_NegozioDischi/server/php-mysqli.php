<!-- procedure di interfacciamento PHP - MySQL -->
<?php
function _openConnection($dbName)
{
    define('DBHOST', 'localhost');
    define('DBUSER', 'root'); # admin del database, privo di password
    define('DBPASS', '');

    # fa in modo che, in caso di errore, venga generata un'eccezione
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    try {
        $con = new mysqli(DBHOST, DBUSER, DBPASS, $dbName);
        $con->set_charset("utf8");  #gestione degli apici
        return $con;
    } catch (mysqli_sql_exception $ex) {
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
        die("Errore nella query sql: <br>" . $ex->getMessage());
    }

    # se il comando era una query di tipo SELECT, convertiamo il record set in un vettore di json.
    # i comandi non di tipo SELECT restituiscono semplicemente un booleano che lasciamo così com'è.
    if (!is_bool($rs)) {
        $data = $rs->fetch_all(MYSQLI_ASSOC); # converto
    } else
        $data=$rs;
    return $data;
}
?>