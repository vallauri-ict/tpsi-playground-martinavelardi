$(document).ready(function () {

	let _ris = $("#txtRis");

	/* prendo i div e i p dentro wrapper */
	$("#wrapper div, #wrapper p").click(function () {
		_ris.empty();
		// Per ogni click richiamo 7 volte elabara() 
		for (let i = 1; i <= 7; i++)
			elabora($(this), i);
		visualizza("-----------------------")

		// verifico se l'elemento corrente è di tipo package
		if ($(this).is("p")) {
			visualizza("Sono un tag p");
		}
		if ($(this).is("#blu, #rosso")) {
			visualizza("Sono l'elemento " + $(this).html());	// .html() in lettura (senza parametri) restituisce il testo che c'è nel tag
		}
		// se l'elemento corrente soddisfa lo pseudoselettore "contains" --> verifica il testo contenuto
		if ($(this).is(":contains('my Div')")) {
			visualizza("Il testo è my Div");
		}
		// se contiene il tag span --> has verifica il tag
		if ($(this).html().includes("<span")) {
		// if ($(this).is(":has('span')")) {
			visualizza("All'interno c'è un tag span")
		}
		// se è l'ultimo figlio di wrapper
		if ($(this).is(":last-child")) {
			visualizza("Sono l'ultimo figlio di wrapper")
		}
		if ($(this).is(":last-of-type")) {
			visualizza("Sono l'ultimo del mio tipo")
		}
	});

	/* alt + 96 --> ` */
	// usa una variabile all'interno di una stringa

	// box --> puntatore jquery all'elemento che ho cliccato
	function elabora(box, i) {
		// 1 - i-esimo elemento generico 	
		if (box.is(`:nth-child(${i})`))
			visualizza(`nth-child(${i})`);
		// 2 - i-esimo elemento generico, ma solo se di tipo DIV		
		if (box.is(`div:nth-child(${i})`))
			visualizza(`div:nth-child(${i})`);
		// 3 - i-esimo elemento generico, ma solo se di tipo P			
		if (box.is(`p:nth-child(${i})`))
			visualizza(`p:nth-child(${i})`);

		// 4 - i-esimo elemento del suo tipo			
		if (box.is(`:nth-of-type(${i})`))
			visualizza(`nth-of-type(${i})`);
		// 5 - i-esimo elemento del suo tipo, ma solo se di tipo DIV
		if (box.is(`div:nth-of-type(${i})`))
			visualizza(`div:nth-of-type(${i})`);
		// 6 - i-esimo elemento del suo tipo, ma solo se di tipo P 
		if (box.is(`p:nth-of-type(${i})`))
			visualizza(`p:nth-of-type(${i})"`);
	}

	function visualizza(msg) {
		_ris.html(_ris.html() + msg + "<br>");
	}
});