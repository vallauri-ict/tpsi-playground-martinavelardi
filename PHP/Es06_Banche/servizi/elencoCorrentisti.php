<?php
header("content-type:application/json; charset=utf-8");
require("php-mysqli.php");

# step 1
if (isset($_REQUEST["cFiliale"])) {
    $cod_banca=$_REQUEST["cFiliale"];
}
else {
    http_response_code(400);
    die("Parametro mancante: idFiliale");
}

# step 2
$con=_openConnection();

# step 3
# fa la join tra la tabella conti e quella correntisti. ho una tabella unica.
# devo mettere la condizione di join (campo comune)
$sql="SELECT * FROM conti,correntisti WHERE correntisti.cCorrentista=conti.cCorrentista AND conti.cFiliale=$cFiliale";
$rs=_execute($con,$sql);

# step 4
if ($rs) {
    echo(json_encode($rs));
}
else {
    http_response_code(500);
    die("Errore esecuzione query");
}

# step 5
$con->close();
?>