<?php
header("content-type:application/json; charset=utf-8");
require("php-mysqli.php");

# step 1
if (isset($_REQUEST["cBanca"])) {
    $cod_banca=$_REQUEST["cBanca"];
}
else {
    http_response_code(400);
    die("Parametro mancante: idBanca");
}

# step 2
$con=_openConnection();

# step 3
$sql="SELECT cFiliale, Nome FROM filiali WHERE cBanca=$cod_banca";
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