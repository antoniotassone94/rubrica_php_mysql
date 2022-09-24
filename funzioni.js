let percorso = "http://localhost/rubrica/build1.0.1/";
let comuni;
let province;
let regioni;

function stampa(id,messaggio){
	document.getElementById(id).innerHTML = messaggio;
}

async function caricamento_applicazione(){
	try{
		const body = document.querySelector("body");
		const finestra_caricamento = document.getElementById("finestra_caricamento");
		finestra_caricamento.style.display = "block";
		let caricamento = await fetch(percorso+"estrazione_dati_comuni.php");
		let risposta = await caricamento.json();
		comuni = risposta.elenco_comuni;
		province = risposta.elenco_province;
		regioni = risposta.elenco_regioni;
		finestra_caricamento.style.display = "none";
		body.removeChild(finestra_caricamento);
		stampa_rubrica();
	}catch(errore){
		console.error(errore);
	}
}