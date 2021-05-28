"use strict";

$(function () {
	let _wrapper=$("#wrapper");
	let _divTitolo = $("#divTitolo");
    let _divFiliali = $("#divFiliali");
    let _divMovimenti = $("#divMovimenti");
	_wrapper.hide();
	
	let _richiestaFiliali = inviaRichiesta("get", "server/elencoFiliali.php");
	
	_richiestaFiliali.fail(function(jqXHR, test_status, str_error) {
		if (jqXHR.status == 403) {  
			window.location.href="login.html";
		} 
		else
			errore(jqXHR, test_status, str_error)
	});
	
	_richiestaFiliali.done(function (data) {
		console.log(data)
		_wrapper.show();
		_divMovimenti.hide();
		
    });
	
		
	
});
