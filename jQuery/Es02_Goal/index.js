"use strict"

$(document).ready(function () {
	let _calciatore = $("#calciatore");
	let _palla = $("#palla");

	let btnEntra = $("#btnEntra")
	let btnEsci = $("#btnEsci")
	let btnVisualizzaPalla = $("#btnVisualizzaPalla")
	let btnNascondiPalla = $("#btnNascondiPalla")
	let btnTira = $("#btnTira")

	_calciatore.hide();
	_palla.hide();
	_palla.prop("goal", false);	// in scrittura ha 2 parametri, in lettura ne ha 1

	// btnEsci.hide();	mi sposta tutti i pulsanti
	// posso usare o una o l'altra
	btnEsci.css("visibility", "hidden");
	btnNascondiPalla.css({ "visibility": "hidden" });	// passo un json
	btnTira.css("visibility", "hidden");

	btnEntra.on("click", function () {
		// this è sempre un puntatore javascript
		$(this).css({ "visibility": "hidden" });
		// $(this) restituisce un this jquery
		_calciatore.show(2000, function () {
			btnEsci.css("visibility", "visible");	// per fare in modo che appaia quando è finita l'animazione
			checkTira();
		});	// il tempo di default di .show() è 0
	})
	btnEsci.on("click", function () {
		$(this).css({ "visibility": "hidden" });
		_calciatore.hide(2000, function () {
			btnEntra.css("visibility", "visible");
			btnTira.css("visibility", "hidden");
		});
	})
	btnVisualizzaPalla.on("click", function () {
		$(this).css({ "visibility": "hidden" });
		_palla.fadeIn(2000, function () {	// default 400 ms
			btnNascondiPalla.css("visibility", "visible");
			checkTira();
		});
	})
	btnNascondiPalla.on("click", function () {
		$(this).css({ "visibility": "hidden" });
		_palla.fadeOut(2000, function () {	// default 400 ms
			btnVisualizzaPalla.css("visibility", "visible");
			btnTira.css("visibility", "hidden");
			if ($(this).prop("goal")) {
				// se l'impostazione dinamica è "", si prendono i valori nell'impostazione statica (nell'html)
				let pos = {
					"left": "",
					"top": "",
					"width": "",
					"height": ""
				}
				$(this).css(pos);
				$(this).prop("goal", false);
			}
		});
	})

	function checkTira() {
		if (_calciatore.is(":visible") && _palla.is(":visible")) {
			btnTira.css("visibility", "visible");
		}
	}

	btnTira.on("click", function () {
		$(this).css("visibility", "hidden");
		// json di property
		let pos = {
			"left": "1025px",
			"top": "300px",
			"width": "50px",
			"height": "50px"
		}
		_palla.animate(pos, 1500, function () {
			$(this).prop("goal", true);
		})
	})

	$("#btnRosso").on("click",function () {
		_palla.prop("src","img/pallaRossa.jpg")
	})
	$("#btnBianco").on("click",function () {
		_palla.prop("src","img/palla.jpg")
	})

});