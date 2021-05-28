<!doctype html>
<html>

<head>
	<meta charset="UTF-8">
	<title>Registrazione</title>
	<link rel="stylesheet" href="index.css">
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"
		integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
</head>

<body>

	<?php
		# includo la libreria carina
		require("php-mysqli.php");
	?>

	<h1>Seleziona il sondaggio a cui vuoi partecipare</h1>
	<hr>
	<h3>Sondaggi disponibili:</h3>
	<!-- Posso anche lavorare sulla stessa pagina, ma, al momento del submit, viene richiamato php che ricostruisce la pagina. Dovrei rimettere a posto tutte le scelte. -->
	<form id="form1" action="pagina2.php" method="get">
		<select name="lstSondaggi">
			<?php
				# step 1: non si usa perché non ci sono parametri
				# step 2: CONNESSIONE	
				$con=_openConnection("4b_sondaggi");
				# step 3: esecuzione query
				$sql="SELECT id, titolo FROM sondaggi";
				$rs=_execute($con,$sql);
				# step 4: visualizzazione dati
				foreach ($rs as $item) {
					# dentro al tag select. non posso fare echo di testo
					$id=$item["id"];
					$titolo=$item["titolo"];
					echo("<option value=$id>$nome</option>");
					# se voglio usare una variabile composta all'interno di una echo è possibile
					# ma occorre omettere gli apici attorno al nome del campo	
				}
			?>
		</select>

		<input type="submit" value="invia">
	</form>
	
	<?php
		# step 5: chiusura connessione
		$con->close();
	?>
</body>

</html>