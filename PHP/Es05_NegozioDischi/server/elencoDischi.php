<?php
# prima di aperto e chiuso script non ci deve essere nulla, nemmeno uno spazio
# eventuali caratteri scriti al di fuori dello script verrebbero inviati al client assieme alla risposta
# e potrebbero causare errori

# il json inviato come risposta deve essere serializzato come stringa
# le chiavi devono essere scritte con le ""
# echo('{"ris":"ok"}');

# da aggiungere nel caso dei servizi
header('Content-type: text/html; charset: UTF-8');
require("php-mysqli.php");

# step 1: lettura scrittura parametri => non ci sono parametri

# step 2: apertura connessione
$con = _openConnection("es05_dischi");

# step 3: esecuzione query
$sql = "SELECT * FROM 'dischi";
$rs = _execute($con,$sql);

# step 4: invio dati al client
echo(json_encode($rs));

# step 5: chiusura della connessione
$con->close();
?>