function archivio_regioni(){
	fetch(percorso+"estrazione_dati_comuni.php")
	.then(risposta => risposta.json())
	.then(dati => {
		let contenitore_tabella = document.getElementById("archivio_regioni");
		let tabella_vecchia = document.getElementsByName("tabella_archivio_regioni");
		if(tabella_vecchia.length > 0){
			tabella_vecchia.forEach(singola_tabella => contenitore_tabella.removeChild(singola_tabella));
		}
		let tabella = document.createElement("table");
		tabella.setAttribute("class","table");
		tabella.setAttribute("name","tabella_archivio_regioni");
		contenitore_tabella.appendChild(tabella);
		let intestazione = document.createElement("thead");
		let riga_intestazione = document.createElement("tr");
		let elenco_celle_intestazione = ["Nome","",""];
		elenco_celle_intestazione.forEach(singola_cella => {
			let cella_intestazione = document.createElement("th");
			cella_intestazione.innerHTML = singola_cella;
			riga_intestazione.appendChild(cella_intestazione);
		});
		intestazione.appendChild(riga_intestazione);
		tabella.appendChild(intestazione);
		let corpo = document.createElement("tbody");
		dati.elenco_regioni.forEach(regione => {
			let riga = document.createElement("tr");
			let elenco_celle = [
				regione.nome,
				"<a href=javascript:modifica_regione('"+regione.id_regione+"')>Modifica</a>",
				"<a href=javascript:elimina_regione('"+regione.id_regione+"')>Elimina</a>"
			];
			elenco_celle.forEach(singola_cella => {
				let cella = document.createElement("td");
				cella.innerHTML = singola_cella;
				riga.appendChild(cella);
			});
			corpo.appendChild(riga);
		});
		tabella.appendChild(corpo);
	})
	.catch(errore => console.error(errore));
}

function aggiungi_regione(){
	fetch(percorso+"genera_token.php")
	.then(risposta => risposta.json())
	.then(dati => {
		let body = document.querySelector("body");
		let modulo_vecchio = document.getElementsByName("modulo_token");
		if(modulo_vecchio.length > 0){
			modulo_vecchio.forEach(singolo_modulo => body.removeChild(singolo_modulo));
		}
		let modulo = document.createElement("form");
		modulo.setAttribute("name","modulo_token");
		modulo.setAttribute("method","POST");
		let token = document.createElement("input");
		token.setAttribute("type","hidden");
		token.setAttribute("name","token");
		token.setAttribute("value",dati.token);
		modulo.appendChild(token);
		body.appendChild(modulo);
	})
	.finally(() => esegui_giunzione_regione())
	.catch(errore => console.error(errore));
}

function esegui_giunzione_regione(){
	let token = modulo_token.token.value;
	let controllo = 0;
	let nome = window.prompt("Inserisci il nome della nuova regione:");
	if(nome == "" || nome == null){
		controllo = 1;
		stampa("messaggio","Non &egrave; stato inserito il nome della nuova regione.");
	}else{
		stampa("messaggio","");
	}
	if(controllo == 0){
		let dati_inviati = new FormData();
		dati_inviati.append("token",token);
		dati_inviati.append("nome",nome);
		fetch(percorso+"aggiungi_regione.php",{
			'method':'POST',
			'header':{'Content-type':'application/json'},
			'body':dati_inviati
		})
		.then(risposta => risposta.json())
		.then(dati => {
			if(dati.controllo == 0){
				archivio_regioni();
			}
			stampa("messaggio",dati.messaggio);
		})
		.catch(errore => console.error(errore));
	}
}

function modifica_regione(id_regione){
	fetch(percorso+"genera_token.php")
	.then(risposta => risposta.json())
	.then(dati => {
		let body = document.querySelector("body");
		let modulo_vecchio = document.getElementsByName("modulo_token");
		if(modulo_vecchio.length > 0){
			modulo_vecchio.forEach(singolo_modulo => body.removeChild(singolo_modulo));
		}
		let modulo = document.createElement("form");
		modulo.setAttribute("name","modulo_token");
		modulo.setAttribute("method","POST");
		let token = document.createElement("input");
		token.setAttribute("type","hidden");
		token.setAttribute("name","token");
		token.setAttribute("value",dati.token);
		modulo.appendChild(token);
		body.appendChild(modulo);
	})
	.finally(() => esegui_modifica_regione(id_regione))
	.catch(errore => console.error(errore));
}

function esegui_modifica_regione(id_regione){
	let token = modulo_token.token.value;
	let controllo = 0;
	let nome = window.prompt("Inserisci il nuovo nome della regione:");
	if(nome == "" || nome == null){
		controllo = 1;
		stampa("messaggio","Scrivere il nuovo nome della regione.");
	}else{
		stampa("messaggio","");
	}
	if(controllo == 0){
		let dati_inviati = new FormData();
		dati_inviati.append("token",token);
		dati_inviati.append("nome",nome);
		dati_inviati.append("id_regione",id_regione);
		fetch(percorso+"modifica_regione.php",{
			'method':'POST',
			'header':{'Content-type':'application/json'},
			'body':dati_inviati
		})
		.then(risposta => risposta.json())
		.then(dati => {
			if(dati.controllo == 0){
				archivio_regioni();
			}
			stampa("messaggio",dati.messaggio);
		})
		.catch(errore => console.error(errore));
	}
}

function elimina_regione(id_regione){
	fetch(percorso+"genera_token.php")
	.then(risposta => risposta.json())
	.then(dati => {
		let body = document.querySelector("body");
		let modulo_vecchio = document.getElementsByName("modulo_token");
		if(modulo_vecchio.length > 0){
			modulo_vecchio.forEach(singolo_modulo => body.removeChild(singolo_modulo));
		}
		let modulo = document.createElement("form");
		modulo.setAttribute("name","modulo_token");
		modulo.setAttribute("method","POST");
		let token = document.createElement("input");
		token.setAttribute("type","hidden");
		token.setAttribute("name","token");
		token.setAttribute("value",dati.token);
		modulo.appendChild(token);
		body.appendChild(modulo);
	})
	.finally(() => esegui_eliminazione_regione(id_regione))
	.catch(errore => console.error(errore));
}

function esegui_eliminazione_regione(id_regione){
	let token = modulo_token.token.value;
	let controllo = 0;
	if(controllo == 0){
		let dati_inviati = new FormData();
		dati_inviati.append("token",token);
		dati_inviati.append("id_regione",id_regione);
		fetch(percorso+"elimina_regione.php",{
			'method':'POST',
			'header':{'Content-type':'application/json'},
			'body':dati_inviati
		})
		.then(risposta => risposta.json())
		.then(dati => {
			if(dati.controllo == 0){
				archivio_regioni();
			}
			stampa("messaggio",dati.messaggio);
		})
		.catch(errore => console.error(errore));
	}
}

function archivio_province(){
	let id_regione = modulo.selezione_regione.value;
	if(id_regione == ""){
		let contenitore_tabella = document.getElementById("archivio_province");
		let tabella_vecchia = document.getElementsByName("tabella_archivio_province");
		if(tabella_vecchia.length > 0){
			tabella_vecchia.forEach(singola_tabella => contenitore_tabella.removeChild(singola_tabella));
		}
	}else{
		fetch(percorso+"estrazione_dati_comuni.php")
		.then(risposta => risposta.json())
		.then(dati => {
			let contenitore_tabella = document.getElementById("archivio_province");
			let tabella_vecchia = document.getElementsByName("tabella_archivio_province");
			if(tabella_vecchia.length > 0){
				tabella_vecchia.forEach(singola_tabella => contenitore_tabella.removeChild(singola_tabella));
			}
			let tabella = document.createElement("table");
			tabella.setAttribute("class","table");
			tabella.setAttribute("name","tabella_archivio_province");
			contenitore_tabella.appendChild(tabella);
			let intestazione = document.createElement("thead");
			let riga_intestazione = document.createElement("tr");
			let elenco_celle_intestazione = ["Nome","Sigla","Regione","",""];
			elenco_celle_intestazione.forEach(singola_cella => {
				let cella_intestazione = document.createElement("th");
				cella_intestazione.innerHTML = singola_cella;
				riga_intestazione.appendChild(cella_intestazione);
			});
			intestazione.appendChild(riga_intestazione);
			tabella.appendChild(intestazione);
			let corpo = document.createElement("tbody");
			dati.elenco_province.forEach(provincia => {
				if(provincia.id_regione == id_regione){
					let riga = document.createElement("tr");
					let i = 0;
					while(i < dati.elenco_regioni.length && dati.elenco_regioni[i].id_regione != provincia.id_regione){
						i++;
					}
					if(i >= dati.elenco_regioni.length){
						i = -1;
					}
					let elenco_celle = [
						provincia.nome,
						provincia.sigla,
						(i != -1) ? dati.elenco_regioni[i].nome : "",
						"<a href=javascript:modifica_provincia('"+provincia.id_provincia+"')>Modifica</a>",
						"<a href=javascript:elimina_provincia('"+provincia.id_provincia+"')>Elimina</a>"
					];
					elenco_celle.forEach(singola_cella => {
						let cella = document.createElement("td");
						cella.innerHTML = singola_cella;
						riga.appendChild(cella);
					});
					corpo.appendChild(riga);
				}
			});
			tabella.appendChild(corpo);
		})
		.catch(errore => console.error(errore));
	}
}

function aggiungi_provincia(){
	fetch(percorso+"genera_token.php")
	.then(risposta => risposta.json())
	.then(dati => {
		modulo.token.value = dati.token;
		let body = document.querySelector("body");
		let container_vecchio = document.getElementsByName("finestra_inserimento");
		if(container_vecchio.length > 0){
			container_vecchio.forEach(elemento => body.removeChild(elemento));
		}
		let container = document.createElement("div");
		container.setAttribute("class","modal");
		container.setAttribute("id","finestra_inserimento");
		container.setAttribute("name","finestra_inserimento");
		container.style.display = "block";
		let sfondo = document.createElement("div");
		sfondo.setAttribute("class","modal-background");
		let contenuto = document.createElement("div");
		contenuto.setAttribute("class","modal-content");
		let form = document.createElement("form");
		form.setAttribute("name","modulo_inserimento");
		form.setAttribute("method","POST");
		form.setAttribute("class","box");
		let bottone_uscita = document.createElement("button");
		bottone_uscita.setAttribute("id","chiusura_inserimento");
		bottone_uscita.setAttribute("class","modal-close is-large");
		bottone_uscita.setAttribute("aria-label","close");
		bottone_uscita.onclick = function() {
			container.style.display = "none";
			body.removeChild(container);
		}
		contenuto.appendChild(form);
		container.appendChild(sfondo);
		container.appendChild(contenuto);
		container.appendChild(bottone_uscita);
		body.appendChild(container);
		let etichetta_nome = document.createElement("label");
		etichetta_nome.setAttribute("for","nome");
		etichetta_nome.setAttribute("class","label");
		etichetta_nome.innerHTML = "Inserisci il nome della nuova provincia:";
		let nome = document.createElement("input");
		nome.setAttribute("type","text");
		nome.setAttribute("id","nome");
		nome.setAttribute("name","nome");
		nome.setAttribute("class","input is-primary is-rounded");
		let spazio1 = document.createElement("br");
		let spazio2 = document.createElement("br");
		let etichetta_sigla = document.createElement("label");
		etichetta_sigla.setAttribute("for","sigla");
		etichetta_sigla.setAttribute("class","label");
		etichetta_sigla.innerHTML = "Inserire la sigla automobilistica:";
		let sigla = document.createElement("input");
		sigla.setAttribute("type","text");
		sigla.setAttribute("id","sigla");
		sigla.setAttribute("name","sigla");
		sigla.setAttribute("class","input is-primary is-rounded");
		let spazio3 = document.createElement("br");
		let spazio4 = document.createElement("br");
		let messaggio = document.createElement("span");
		messaggio.setAttribute("id","messaggio_interno");
		let spazio5 = document.createElement("br");
		let bottone = document.createElement("input");
		bottone.setAttribute("type","button");
		bottone.setAttribute("name","invia");
		bottone.setAttribute("value","Inserisci adesso la provincia");
		bottone.setAttribute("onclick","javascript:valida4()");
		bottone.setAttribute("class","button is-rounded is-fullwidth is-success");
		form.appendChild(etichetta_nome);
		form.appendChild(nome);
		form.appendChild(spazio1);
		form.appendChild(spazio2);
		form.appendChild(etichetta_sigla);
		form.appendChild(sigla);
		form.appendChild(spazio3);
		form.appendChild(spazio4);
		form.appendChild(bottone);
		form.appendChild(spazio5);
		form.appendChild(messaggio);
	})
	.catch(errore => console.error(errore));
}

function valida4(){
	let token = modulo.token.value;
	let id_regione = modulo.selezione_regione.value;
	let nome = modulo_inserimento.nome.value;
	let sigla = modulo_inserimento.sigla.value;
	let controllo = 0;
	let messaggio = "";
	if(nome == ""){
		controllo = 1;
		messaggio += "Non &egrave; stato inserito il nome della nuova provincia.<br>";
	}
	if(sigla == ""){
		controllo = 1;
		messaggio += "Inserire la sigla automobilistica della provincia.<br>";
	}else{
		if(sigla.length > 3){
			controllo = 1;
			messaggio += "La sigla non pu&ograve; contenere pi&ugrave; di 3 caratteri.<br>";
		}
	}
	stampa("messaggio_interno",messaggio);
	if(controllo == 0){
		let dati_inviati = new FormData();
		dati_inviati.append("token",token);
		dati_inviati.append("id_regione",id_regione);
		dati_inviati.append("nome",nome);
		dati_inviati.append("sigla",sigla);
		fetch(percorso+"aggiungi_provincia.php",{
			'method':'POST',
			'header':{'Content-type':'application/json'},
			'body':dati_inviati
		})
		.then(risposta => risposta.json())
		.then(dati => {
			if(dati.controllo == 0){
				let body = document.querySelector("body");
				let modulo_inserimento = document.getElementsByName("finestra_inserimento");
				if(modulo_inserimento.length > 0){
					modulo_inserimento.forEach(singolo_modulo => {
						singolo_modulo.style.display = "none";
						body.removeChild(singolo_modulo);
					});
				}
				stampa("messaggio",dati.messaggio);
				archivio_province();
			}else{
				stampa("messaggio_interno",dati.messaggio);
			}
		})
		.catch(errore => console.error(errore));
	}
}

function modifica_provincia(id_provincia){
	fetch(percorso+"genera_token.php")
	.then(risposta => risposta.json())
	.then(dati => {
		modulo.token.value = dati.token;
		let body = document.querySelector("body");
		let container_vecchio = document.getElementsByName("finestra_modifica");
		if(container_vecchio.length > 0){
			container_vecchio.forEach(elemento => body.removeChild(elemento));
		}
		let container = document.createElement("div");
		container.setAttribute("class","modal");
		container.setAttribute("id","finestra_modifica");
		container.setAttribute("name","finestra_modifica");
		container.style.display = "block";
		let sfondo = document.createElement("div");
		sfondo.setAttribute("class","modal-background");
		let contenuto = document.createElement("div");
		contenuto.setAttribute("class","modal-content");
		let form = document.createElement("form");
		form.setAttribute("name","modulo_modifica");
		form.setAttribute("method","POST");
		form.setAttribute("class","box");
		let bottone_uscita = document.createElement("button");
		bottone_uscita.setAttribute("id","chiusura_modifica");
		bottone_uscita.setAttribute("class","modal-close is-large");
		bottone_uscita.setAttribute("aria-label","close");
		bottone_uscita.onclick = function() {
			container.style.display = "none";
			body.removeChild(container);
		}
		contenuto.appendChild(form);
		container.appendChild(sfondo);
		container.appendChild(contenuto);
		container.appendChild(bottone_uscita);
		body.appendChild(container);
		let etichetta_dato = document.createElement("label");
		etichetta_dato.setAttribute("for","dato");
		etichetta_dato.setAttribute("class","label");
		etichetta_dato.innerHTML = "Seleziona il dato da modificare:";
		let contenitore_dato = document.createElement("div");
		contenitore_dato.setAttribute("class","select is-primary is-rounded is-fullwidth");
		let dato = document.createElement("select");
		dato.setAttribute("name","dato");
		dato.setAttribute("id","dato");
		dato.setAttribute("onchange","javascript:inserisci_valore_provincia()");
		let opzione1 = document.createElement("option");
		opzione1.setAttribute("value","");
		let opzione2 = document.createElement("option");
		opzione2.setAttribute("value","nome");
		opzione2.innerHTML = "Nome della provincia";
		let opzione3 = document.createElement("option");
		opzione3.setAttribute("value","sigla");
		opzione3.innerHTML = "Sigla automobilistica della provincia";
		let opzione4 = document.createElement("option");
		opzione4.setAttribute("value","id_regione");
		opzione4.innerHTML = "Regione di riferimento";
		dato.appendChild(opzione1);
		dato.appendChild(opzione2);
		dato.appendChild(opzione3);
		dato.appendChild(opzione4);
		contenitore_dato.appendChild(dato);
		let spazio1 = document.createElement("br");
		let valore = document.createElement("span");
		valore.setAttribute("id","contenitore_valore");
		let spazio2 = document.createElement("br");
		let bottone = document.createElement("input");
		bottone.setAttribute("type","button");
		bottone.setAttribute("name","invia");
		bottone.setAttribute("value","Modifica adesso la provincia");
		bottone.setAttribute("onclick","javascript:valida5('"+id_provincia+"')");
		bottone.setAttribute("class","button is-rounded is-fullwidth is-success");
		let spazio3 = document.createElement("br");
		let messaggio = document.createElement("span");
		messaggio.setAttribute("id","messaggio_interno");
		form.appendChild(etichetta_dato);
		form.appendChild(contenitore_dato);
		form.appendChild(spazio1);
		form.appendChild(valore);
		form.appendChild(spazio2);
		form.appendChild(bottone);
		form.appendChild(spazio3);
		form.appendChild(messaggio);
	})
	.catch(errore => console.error(errore));
}

async function inserisci_valore_provincia(){
	let dato = modulo_modifica.dato.value;
	let contenitore_valore = document.getElementById("contenitore_valore");
	if(dato == "id_regione"){
		let etichetta_vecchia = document.getElementsByName("etichetta_valore");
		let valore_vecchio = document.getElementsByName("valore");
		let spazio1_vecchio = document.getElementsByName("spazio1");
		let spazio2_vecchio = document.getElementsByName("spazio2");
		if(etichetta_vecchia.length > 0){
			etichetta_vecchia.forEach(etichetta => contenitore_valore.removeChild(etichetta));
		}
		if(valore_vecchio.length > 0){
			valore_vecchio.forEach(valore => contenitore_valore.removeChild(valore));
		}
		if(spazio1_vecchio.length > 0){
			spazio1_vecchio.forEach(spazio_1 => contenitore_valore.removeChild(spazio_1));
		}
		if(spazio2_vecchio.length > 0){
			spazio2_vecchio.forEach(spazio_2 => contenitore_valore.removeChild(spazio_2));
		}
	}else{
		let contenitore_menu_regioni_vecchio = document.getElementsByName("contenitore_menu_regioni");
		let etichetta_vecchia = document.getElementsByName("etichetta_valore");
		let valore_vecchio = document.getElementsByName("valore");
		let spazio1_vecchio = document.getElementsByName("spazio1");
		let spazio2_vecchio = document.getElementsByName("spazio2");
		if(contenitore_menu_regioni_vecchio.length > 0){
			contenitore_menu_regioni_vecchio.forEach(menu => contenitore_valore.removeChild(menu));
		}
		if(etichetta_vecchia.length > 0){
			etichetta_vecchia.forEach(etichetta => contenitore_valore.removeChild(etichetta));
		}
		if(valore_vecchio.length > 0){
			valore_vecchio.forEach(valore => contenitore_valore.removeChild(valore));
		}
		if(spazio1_vecchio.length > 0){
			spazio1_vecchio.forEach(spazio_1 => contenitore_valore.removeChild(spazio_1));
		}
		if(spazio2_vecchio.length > 0){
			spazio2_vecchio.forEach(spazio_2 => contenitore_valore.removeChild(spazio_2));
		}
	}
	let spazio1 = document.createElement("br");
	spazio1.setAttribute("name","spazio1");
	let spazio2 = document.createElement("br");
	spazio2.setAttribute("name","spazio2");
	switch(dato){
		case "nome":
			let etichetta1 = document.createElement("label");
			etichetta1.setAttribute("name","etichetta_valore");
			etichetta1.setAttribute("for","valore");
			etichetta1.setAttribute("class","label");
			etichetta1.innerHTML = "Scrivi il nuovo nome:";
			let valore1 = document.createElement("input");
			valore1.setAttribute("type","text");
			valore1.setAttribute("name","valore");
			valore1.setAttribute("id","valore");
			valore1.setAttribute("class","input is-primary is-rounded");
			contenitore_valore.appendChild(spazio1);
			contenitore_valore.appendChild(etichetta1);
			contenitore_valore.appendChild(valore1);
			contenitore_valore.appendChild(spazio2);
			break;
		case "sigla":
			let etichetta2 = document.createElement("label");
			etichetta2.setAttribute("name","etichetta_valore");
			etichetta2.setAttribute("for","valore");
			etichetta2.setAttribute("class","label");
			etichetta2.innerHTML = "Scrivi la nuova sigla automobilistica:";
			let valore2 = document.createElement("input");
			valore2.setAttribute("type","text");
			valore2.setAttribute("name","valore");
			valore2.setAttribute("id","valore");
			valore2.setAttribute("class","input is-primary is-rounded");
			contenitore_valore.appendChild(spazio1);
			contenitore_valore.appendChild(etichetta2);
			contenitore_valore.appendChild(valore2);
			contenitore_valore.appendChild(spazio2);
			break;
		case "id_regione":
			let etichetta3 = document.createElement("label");
			etichetta3.setAttribute("name","etichetta_valore");
			etichetta3.setAttribute("for","valore");
			etichetta3.setAttribute("class","label");
			etichetta3.innerHTML = "Selezionare la nuova regione di riferimento:";
			let contenitore_regioni = document.createElement("div");
			contenitore_regioni.setAttribute("name","contenitore_menu_regioni");
			contenitore_regioni.setAttribute("class","select is-primary is-rounded is-fullwidth");
			let campo_regioni = document.createElement("select");
			campo_regioni.setAttribute("name","valore");
			campo_regioni.setAttribute("id","valore");
			let opzione_vuota1 = document.createElement("option");
			opzione_vuota1.setAttribute("value","");
			campo_regioni.appendChild(opzione_vuota1);
			let risposta = await fetch("estrazione_dati_comuni.php");
			let dati = await risposta.json();
			dati.elenco_regioni.forEach(regione => {
				let opzione = document.createElement("option");
				opzione.setAttribute("value",regione.id_regione);
				opzione.innerHTML = regione.nome;
				campo_regioni.appendChild(opzione);
			});
			contenitore_regioni.appendChild(campo_regioni);
			contenitore_valore.appendChild(spazio1);
			contenitore_valore.appendChild(etichetta3);
			contenitore_valore.appendChild(contenitore_regioni);
			contenitore_valore.appendChild(spazio2);
			break;
		default:
			break;
	}
}

function valida5(id_provincia){
	let dato = modulo_modifica.dato.value;
	if(dato == ""){
		controllo = 1;
		stampa("messaggio_interno","Selezionare il dato da modificare.");
	}else{
		stampa("messaggio_interno","");
		let token = modulo.token.value;
		let valore = modulo_modifica.valore.value;
		let controllo = 0;
		if(valore == ""){
			controllo = 1;
			stampa("messaggio_interno","Scrivere il nuovo valore del dato selezionato.");
		}else{
			stampa("messaggio_interno","");
		}
		if(controllo == 0){
			let dati_inviati = new FormData();
			dati_inviati.append("token",token);
			dati_inviati.append("dato",dato);
			dati_inviati.append("valore",valore);
			dati_inviati.append("id_provincia",id_provincia);
			fetch(percorso+"modifica_provincia.php",{
				'method':'POST',
				'header':{'Content-type':'application/json'},
				'body':dati_inviati
			})
			.then(risposta => risposta.json())
			.then(dati => {
				if(dati.controllo == 0){
					let body = document.querySelector("body");
					let modulo_modifica = document.getElementsByName("finestra_modifica");
					if(modulo_modifica.length > 0){
						modulo_modifica.forEach(singolo_modulo => {
							singolo_modulo.style.display = "none";
							body.removeChild(singolo_modulo);
						});
					}
					stampa("messaggio",dati.messaggio);
					archivio_province();
				}else{
					stampa("messaggio_interno",dati.messaggio);
				}
			})
			.catch(errore => console.error(errore));
		}
	}
}

function elimina_provincia(id_provincia){
	fetch(percorso+"genera_token.php")
	.then(risposta => risposta.json())
	.then(dati => {
		modulo.token.value = dati.token;
	})
	.finally(() => esegui_eliminazione_provincia(id_provincia))
	.catch(errore => console.error(errore));
}

function esegui_eliminazione_provincia(id_provincia){
	let token = modulo.token.value;
	let dati_inviati = new FormData();
	dati_inviati.append("token",token);
	dati_inviati.append("id_provincia",id_provincia);
	fetch(percorso+"elimina_provincia.php",{
		'method':'POST',
		'header':{'Content-type':'application/json'},
		'body':dati_inviati
	})
	.then(risposta => risposta.json())
	.then(dati => {
		if(dati.controllo == 0){
			archivio_province();
		}
		stampa("messaggio",dati.messaggio);
	})
	.catch(errore => console.error(errore));
}

function archivio_comuni(){
	let id_provincia = modulo.selezione_provincia.value;
	if(id_provincia == ""){
		let contenitore_tabella = document.getElementById("archivio_comuni");
		let tabella_vecchia = document.getElementsByName("tabella_archivio_comuni");
		if(tabella_vecchia.length > 0){
			tabella_vecchia.forEach(singola_tabella => contenitore_tabella.removeChild(singola_tabella));
		}
	}else{
		fetch(percorso+"estrazione_dati_comuni.php")
		.then(risposta => risposta.json())
		.then(dati => {
			let contenitore_tabella = document.getElementById("archivio_comuni");
			let tabella_vecchia = document.getElementsByName("tabella_archivio_comuni");
			if(tabella_vecchia.length > 0){
				tabella_vecchia.forEach(singola_tabella => contenitore_tabella.removeChild(singola_tabella));
			}
			let tabella = document.createElement("table");
			tabella.setAttribute("class","table");
			tabella.setAttribute("name","tabella_archivio_comuni");
			contenitore_tabella.appendChild(tabella);
			let intestazione = document.createElement("thead");
			let riga_intestazione = document.createElement("tr");
			let elenco_celle_intestazione = ["Nome comune","Nome provincia","Sigla provincia","Regione","",""];
			elenco_celle_intestazione.forEach(singola_cella => {
				let cella_intestazione = document.createElement("th");
				cella_intestazione.innerHTML = singola_cella;
				riga_intestazione.appendChild(cella_intestazione);
			});
			intestazione.appendChild(riga_intestazione);
			tabella.appendChild(intestazione);
			let corpo = document.createElement("tbody");
			dati.elenco_comuni.forEach(comune => {
				if(comune.id_provincia == id_provincia){
					let riga = document.createElement("tr");
					let i = 0;
					while(i < dati.elenco_province.length && dati.elenco_province[i].id_provincia != comune.id_provincia){
						i++;
					}
					if(i >= dati.elenco_province.length){
						i = -1;
					}
					let j = 0;
					if(i != -1){
						while(j < dati.elenco_regioni.length && dati.elenco_regioni[j].id_regione != dati.elenco_province[i].id_regione){
							j++;
						}
						if(j >= dati.elenco_regioni.length){
							j = -1;
						}
					}
					let elenco_celle = [
						comune.nome,
						(i != -1) ? dati.elenco_province[i].nome : "",
						(i != -1) ? dati.elenco_province[i].sigla : "",
						(j != -1) ? dati.elenco_regioni[j].nome : "",
						"<a href=javascript:modifica_comune('"+comune.id_comune+"')>Modifica</a>",
						"<a href=javascript:elimina_comune('"+comune.id_comune+"')>Elimina</a>"
					];
					elenco_celle.forEach(singola_cella => {
						let cella = document.createElement("td");
						cella.innerHTML = singola_cella;
						riga.appendChild(cella);
					});
					corpo.appendChild(riga);
				}
			});
			tabella.appendChild(corpo);
		})
		.catch(errore => console.error(errore));
	}
}

function aggiungi_comune(){
	fetch(percorso+"genera_token.php")
	.then(risposta => risposta.json())
	.then(dati => {
		modulo.token.value = dati.token;
	})
	.finally(() => esegui_giunzione_comune())
	.catch(errore => console.error(errore));
}

function esegui_giunzione_comune(){
	let token = modulo.token.value;
	let id_provincia = modulo.selezione_provincia.value;
	let controllo = 0;
	let nome = window.prompt("Inserisci il nome del nuovo comune:");
	if(nome == "" || nome == null){
		controllo = 1;
		stampa("messaggio","Non &egrave; stato inserito il nome del nuovo comune.");
	}else{
		stampa("messaggio","");
	}
	if(controllo == 0){
		let dati_inviati = new FormData();
		dati_inviati.append("token",token);
		dati_inviati.append("nome",nome);
		dati_inviati.append("id_provincia",id_provincia);
		fetch(percorso+"aggiungi_comune.php",{
			'method':'POST',
			'header':{'Content-type':'application/json'},
			'body':dati_inviati
		})
		.then(risposta => risposta.json())
		.then(dati => {
			if(dati.controllo == 0){
				archivio_comuni();
			}
			stampa("messaggio",dati.messaggio);
		})
		.catch(errore => console.error(errore));
	}
}

function modifica_comune(id_comune){
	fetch(percorso+"genera_token.php")
	.then(risposta => risposta.json())
	.then(dati => {
		modulo.token.value = dati.token;
		let body = document.querySelector("body");
		let container_vecchio = document.getElementsByName("finestra_modifica");
		if(container_vecchio.length > 0){
			container_vecchio.forEach(elemento => body.removeChild(elemento));
		}
		let container = document.createElement("div");
		container.setAttribute("class","modal");
		container.setAttribute("id","finestra_modifica");
		container.setAttribute("name","finestra_modifica");
		container.style.display = "block";
		let sfondo = document.createElement("div");
		sfondo.setAttribute("class","modal-background");
		let contenuto = document.createElement("div");
		contenuto.setAttribute("class","modal-content");
		let form = document.createElement("form");
		form.setAttribute("name","modulo_modifica");
		form.setAttribute("method","POST");
		form.setAttribute("class","box");
		let bottone_uscita = document.createElement("button");
		bottone_uscita.setAttribute("id","chiusura_modifica");
		bottone_uscita.setAttribute("class","modal-close is-large");
		bottone_uscita.setAttribute("aria-label","close");
		bottone_uscita.onclick = function() {
			container.style.display = "none";
			body.removeChild(container);
		}
		contenuto.appendChild(form);
		container.appendChild(sfondo);
		container.appendChild(contenuto);
		container.appendChild(bottone_uscita);
		body.appendChild(container);
		let etichetta_dato = document.createElement("label");
		etichetta_dato.setAttribute("for","dato");
		etichetta_dato.setAttribute("class","label");
		etichetta_dato.innerHTML = "Seleziona il dato da modificare:";
		let contenitore_dato = document.createElement("div");
		contenitore_dato.setAttribute("class","select is-primary is-rounded is-fullwidth");
		let dato = document.createElement("select");
		dato.setAttribute("name","dato");
		dato.setAttribute("id","dato");
		dato.setAttribute("onchange","javascript:inserisci_valore_comune()");
		let opzione1 = document.createElement("option");
		opzione1.setAttribute("value","");
		let opzione2 = document.createElement("option");
		opzione2.setAttribute("value","nome");
		opzione2.innerHTML = "Nome del comune";
		let opzione3 = document.createElement("option");
		opzione3.setAttribute("value","id_provincia");
		opzione3.innerHTML = "Provincia di riferimento";
		dato.appendChild(opzione1);
		dato.appendChild(opzione2);
		dato.appendChild(opzione3);
		contenitore_dato.appendChild(dato);
		let spazio1 = document.createElement("br");
		let valore = document.createElement("span");
		valore.setAttribute("id","contenitore_valore");
		let spazio2 = document.createElement("br");
		let bottone = document.createElement("input");
		bottone.setAttribute("type","button");
		bottone.setAttribute("name","invia");
		bottone.setAttribute("value","Modifica adesso il comune");
		bottone.setAttribute("onclick","javascript:valida6('"+id_comune+"')");
		bottone.setAttribute("class","button is-rounded is-fullwidth is-success");
		let spazio3 = document.createElement("br");
		let messaggio = document.createElement("span");
		messaggio.setAttribute("id","messaggio_interno");
		form.appendChild(etichetta_dato);
		form.appendChild(contenitore_dato);
		form.appendChild(spazio1);
		form.appendChild(valore);
		form.appendChild(spazio2);
		form.appendChild(bottone);
		form.appendChild(spazio3);
		form.appendChild(messaggio);
	})
	.catch(errore => console.error(errore));
}

async function inserisci_valore_comune(){
	let dato = modulo_modifica.dato.value;
	let contenitore_valore = document.getElementById("contenitore_valore");
	if(dato == "id_provincia"){
		let etichetta_vecchia = document.getElementsByName("etichetta_valore");
		let valore_vecchio = document.getElementsByName("valore");
		let spazio1_vecchio = document.getElementsByName("spazio1");
		let spazio2_vecchio = document.getElementsByName("spazio2");
		if(etichetta_vecchia.length > 0){
			etichetta_vecchia.forEach(etichetta => contenitore_valore.removeChild(etichetta));
		}
		if(valore_vecchio.length > 0){
			valore_vecchio.forEach(valore => contenitore_valore.removeChild(valore));
		}
		if(spazio1_vecchio.length > 0){
			spazio1_vecchio.forEach(spazio_1 => contenitore_valore.removeChild(spazio_1));
		}
		if(spazio2_vecchio.length > 0){
			spazio2_vecchio.forEach(spazio_2 => contenitore_valore.removeChild(spazio_2));
		}
	}else{
		let contenitore_menu_province_vecchio = document.getElementsByName("contenitore_menu_province");
		let etichetta_vecchia = document.getElementsByName("etichetta_valore");
		let valore_vecchio = document.getElementsByName("valore");
		let spazio1_vecchio = document.getElementsByName("spazio1");
		let spazio2_vecchio = document.getElementsByName("spazio2");
		if(contenitore_menu_province_vecchio.length > 0){
			contenitore_menu_province_vecchio.forEach(menu => contenitore_valore.removeChild(menu));
		}
		if(etichetta_vecchia.length > 0){
			etichetta_vecchia.forEach(etichetta => contenitore_valore.removeChild(etichetta));
		}
		if(valore_vecchio.length > 0){
			valore_vecchio.forEach(valore => contenitore_valore.removeChild(valore));
		}
		if(spazio1_vecchio.length > 0){
			spazio1_vecchio.forEach(spazio_1 => contenitore_valore.removeChild(spazio_1));
		}
		if(spazio2_vecchio.length > 0){
			spazio2_vecchio.forEach(spazio_2 => contenitore_valore.removeChild(spazio_2));
		}
	}
	let spazio1 = document.createElement("br");
	spazio1.setAttribute("name","spazio1");
	let spazio2 = document.createElement("br");
	spazio2.setAttribute("name","spazio2");
	switch(dato){
		case "nome":
			let etichetta1 = document.createElement("label");
			etichetta1.setAttribute("name","etichetta_valore");
			etichetta1.setAttribute("for","valore");
			etichetta1.setAttribute("class","label");
			etichetta1.innerHTML = "Scrivi il nuovo nome:";
			let valore1 = document.createElement("input");
			valore1.setAttribute("type","text");
			valore1.setAttribute("name","valore");
			valore1.setAttribute("id","valore");
			valore1.setAttribute("class","input is-primary is-rounded");
			contenitore_valore.appendChild(spazio1);
			contenitore_valore.appendChild(etichetta1);
			contenitore_valore.appendChild(valore1);
			contenitore_valore.appendChild(spazio2);
			break;
		case "id_provincia":
			let etichetta3 = document.createElement("label");
			etichetta3.setAttribute("name","etichetta_valore");
			etichetta3.setAttribute("for","valore");
			etichetta3.setAttribute("class","label");
			etichetta3.innerHTML = "Selezionare la nuova provincia di riferimento:";
			let contenitore_province = document.createElement("div");
			contenitore_province.setAttribute("name","contenitore_menu_province");
			contenitore_province.setAttribute("class","select is-primary is-rounded is-fullwidth");
			let campo_province = document.createElement("select");
			campo_province.setAttribute("name","valore");
			campo_province.setAttribute("id","valore");
			let opzione_vuota1 = document.createElement("option");
			opzione_vuota1.setAttribute("value","");
			campo_province.appendChild(opzione_vuota1);
			let risposta = await fetch("estrazione_dati_comuni.php");
			let dati = await risposta.json();
			dati.elenco_province.forEach(provincia => {
				let opzione = document.createElement("option");
				opzione.setAttribute("value",provincia.id_provincia);
				opzione.innerHTML = provincia.nome + " (" + provincia.sigla + ")";
				campo_province.appendChild(opzione);
			});
			contenitore_province.appendChild(campo_province);
			contenitore_valore.appendChild(spazio1);
			contenitore_valore.appendChild(etichetta3);
			contenitore_valore.appendChild(contenitore_province);
			contenitore_valore.appendChild(spazio2);
			break;
		default:
			break;
	}
}

function valida6(id_comune){
	let dato = modulo_modifica.dato.value;
	if(dato == ""){
		controllo = 1;
		stampa("messaggio_interno","Selezionare il dato da modificare.");
	}else{
		stampa("messaggio_interno","");
		let token = modulo.token.value;
		let valore = modulo_modifica.valore.value;
		let controllo = 0;
		if(valore == ""){
			controllo = 1;
			stampa("messaggio_interno","Scrivere il nuovo valore del dato selezionato.");
		}else{
			stampa("messaggio_interno","");
		}
		if(controllo == 0){
			let dati_inviati = new FormData();
			dati_inviati.append("token",token);
			dati_inviati.append("dato",dato);
			dati_inviati.append("valore",valore);
			dati_inviati.append("id_comune",id_comune);
			fetch(percorso+"modifica_comune.php",{
				'method':'POST',
				'header':{'Content-type':'application/json'},
				'body':dati_inviati
			})
			.then(risposta => risposta.json())
			.then(dati => {
				if(dati.controllo == 0){
					let body = document.querySelector("body");
					let modulo_modifica = document.getElementsByName("finestra_modifica");
					if(modulo_modifica.length > 0){
						modulo_modifica.forEach(singolo_modulo => {
							singolo_modulo.style.display = "none";
							body.removeChild(singolo_modulo);
						});
					}
					stampa("messaggio",dati.messaggio);
					archivio_comuni();
				}else{
					stampa("messaggio_interno",dati.messaggio);
				}
			})
			.catch(errore => console.error(errore));
		}
	}
}

function elimina_comune(id_comune){
	fetch(percorso+"genera_token.php")
	.then(risposta => risposta.json())
	.then(dati => {
		modulo.token.value = dati.token;
	})
	.finally(() => esegui_eliminazione_comune(id_comune))
	.catch(errore => console.error(errore));
}

function esegui_eliminazione_comune(id_comune){
	let token = modulo.token.value;
	let dati_inviati = new FormData();
	dati_inviati.append("token",token);
	dati_inviati.append("id_comune",id_comune);
	fetch(percorso+"elimina_comune.php",{
		'method':'POST',
		'header':{'Content-type':'application/json'},
		'body':dati_inviati
	})
	.then(risposta => risposta.json())
	.then(dati => {
		if(dati.controllo == 0){
			archivio_comuni();
		}
		stampa("messaggio",dati.messaggio);
	})
	.catch(errore => console.error(errore));
}