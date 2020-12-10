$(document).ready(function () {

	// $ = jQuery
	// restituisce sempre una collezione di oggetti del DOM --> tipo vettore enumerativo di puntatori javascript
	// i metodi jQuery in scrittura modificano il valore a tutti gli elementi della collezione
	var _btnAvvia = $("#btnAvvia");
	_btnAvvia.on("click", eseguiAnimazione);

	_btnAvvia.css("opacity", 0);	// 1 = solido (default)
	// lo faccio partire da 0 così quando lo blocco è trasparente
	let lampeggio = true;
	lamp();	// lancia il metodo animate

	function eseguiAnimazione() {
		// rimuovo l'evento
		_btnAvvia.off("click");
		lampeggio = false;	// faccio partire l'animazione --> nascondo graficamente il pulsante
		_btnAvvia.css("cursor", "default");	// cambio l'aspetto del cursore del mpuse
		$("#pedina")
			.css({ "left": "10px", "top": "260px", "width": "15px", "height": "15px" })
			.animate({ "left": '+=60px', "width": "8px", "height": "8px" }, '1300')
			.animate({ "top": '+=38px', "width": "15px", "height": "15px" }, '1300')
			.animate({ "left": '+=116px', "width": "8px", "height": "8px" }, '1300')
			.animate({ "top": '+=77px', "width": "15px", "height": "15px" }, '1300')
			.animate({ "left": '+=250px', "width": "8px", "height": "8px" }, '1300',
				function () {
					_btnAvvia.on("click", eseguiAnimazione);
					lampeggio = true;
					_btnAvvia.css("cursor", "pointer");
					lamp();
				});
	}

	function lamp() {
		// le animazioni vengono accodate
		_btnAvvia.animate({ "opacity": 1 }, 450, function () {
			_btnAvvia.animate({ "opacity": 0 }, 450, function () {
				if (lampeggio) {
					lamp();	// uso la ricorsione
				}
			})
		})
	}
});
