<!DOCTYPE html>
<html lang="it">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title> Sondaggio </title>
	<link rel="stylesheet" href="index.css" />
	<style>
		body{
			text-align: center;
		}
	</style>
</head>
<body style="text-align:center;">
	<h1>Sondaggio su: 
		<?php
		
		?>
	</h1>

	<?php
		require("php-mysqli.php");
		# step 1
		if (isset($_REQUEST["lstSondaggi"])) {
			$id=$_REQUEST["lstSondaggi"];
		}
		else {
			die("Parametro mancante: id.");
		}
		# step 2
		$con=_openConnection("4b_sondaggi");
		# step 3
		$sql="SELECT * FROM sondaggi WHERE id=$id";
		# SELECT => seleziona tutte le colonne
		# * => prende tutti i campi
		# WHERE => seleziona le colonne. per prendere solo il campo che segue
		$rs=_execute($con,$sql);	# restituisce SEMPRE un vettore enumerativo
		# step 4
		echo("<h1>domanda $rs[titolo] </h1>");
		echo("<hr><img width='200' margin='15px' src=img/$rs[img]>");
		echo("<h3 style='margin:15px'> Rispondi alla seguente domanda </h3>");
		echo("<p style='margin:15px'>$rs[domanda]</p>")
	?>
	<input type="radio" name="optRisposta" value="nSi">Sì
	<input type="radio" name="optRisposta" value="nNo">No
	<input type="radio" name="optRisposta" value="nNs">Non lo so

</body>

</html>