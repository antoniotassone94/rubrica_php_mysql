function imposta_tema1(){
	scrivi_cookie("tema","tema1",60);
	window.location.reload();
}

function imposta_tema2(){
	scrivi_cookie("tema","tema2",60);
	window.location.reload();
}

function vedi_tema_impostato(){
	return leggi_cookie("tema");
}

function cambia_tema(){
	let tema = vedi_tema_impostato();
	switch(tema){
		case "tema1":
			imposta_tema2();
			break;
		case "tema2":
			imposta_tema1();
			break;
		default:
			imposta_tema1();
			break;
	}
}