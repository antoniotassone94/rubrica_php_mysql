function scrivi_cookie(nome,valore,durata){
	let scadenza = new Date();
	let adesso = new Date();
	scadenza.setTime(adesso.getTime() + (parseInt(durata) * 60000));
	document.cookie = nome + '=' + escape(valore) + '; expires=' + scadenza.toGMTString() + '; path=/';
}

function leggi_cookie(nome){
	if (document.cookie.length > 0){
		let inizio = document.cookie.indexOf(nome + "=");
		if (inizio != -1){
			inizio = inizio + nome.length + 1;
			let fine = document.cookie.indexOf(";",inizio);
			if(fine == -1) fine = document.cookie.length;
			return unescape(document.cookie.substring(inizio,fine));
		}else{
			return "";
		}
	}
	return "";
}

function cancella_cookie(nome){
	scrivi_cookie(nome,"",-1);
}

function verifica_cookie(){
	document.cookie = 'verificacookie';
	let test_cookie = (document.cookie.indexOf('verificacookie') != -1) ? true : false;
	return test_cookie;
}