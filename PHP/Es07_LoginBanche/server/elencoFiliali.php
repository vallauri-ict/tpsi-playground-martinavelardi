<?php
header("content-type:application/json; charset=utf-8");
require("php-mysqli.php");

# step 0 controllo session
_checkSession("cCorrentista");

# step 1
$cCorrentista=$_SESSION["cCorrentista"];

# step 2
$con=_openConnection();

# step 3
$sql="SELECT filiali.Nome, filiali.cFiliale FROM filiali, conti WHERE conti.cFiliale=filiali.cFiliale";
$rs=_execute($con,$sql);

# step 4
if ($rs) {
    echo(json_encode($rs)); # serializza
}
else {
    http_response_code(500);
    $con->close();
    die("Errore esecuzione query");
}

# step 5
$con->close();
