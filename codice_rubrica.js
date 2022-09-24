function stampa_rubrica(){
	fetch(percorso+"estrazione_dati_rubrica.php")
	.then(risposta => risposta.json())
	.then(dati => {
		if(dati.elenco_contatti.length > 0){
			let stampa_tabella = document.getElementById("stampa_rubrica");
			let tabella_vecchia = document.getElementsByName("rubrica");
			if(tabella_vecchia.length > 0){
				tabella_vecchia.forEach(elemento => stampa_tabella.removeChild(elemento));
			}
			stampa_tabella.innerHTML = "";
			let tabella = document.createElement("table");
			tabella.setAttribute("class","table");
			tabella.setAttribute("id","rubrica");
			tabella.setAttribute("name","rubrica");
			let intestazione = document.createElement("thead");
			let dati_intestazione = ["id_contatto","Nome","Cognome","Indirizzo","Comune","Numeri di telefono","Indirizzi e-mail",""];
			let riga_intestazione = document.createElement("tr");
			dati_intestazione.forEach(dato => {
				let cella_intestazione = document.createElement("th");
				cella_intestazione.innerHTML = dato;
				riga_intestazione.appendChild(cella_intestazione);
			});
			intestazione.appendChild(riga_intestazione);
			tabella.appendChild(intestazione);
			let corpo = document.createElement("tbody");
			let i = 0;
			dati.elenco_contatti.forEach(dato =>{
				let riga = document.createElement("tr");
				let cella1 = document.createElement("td");
				cella1.innerHTML = dato.id_contatto;
				let cella2 = document.createElement("td");
				cella2.innerHTML = dato.nome;
				let cella3 = document.createElement("td");
				cella3.innerHTML = dato.cognome;
				let cella4 = document.createElement("td");
				cella4.innerHTML = dato.indirizzo;
				let cella5 = document.createElement("td");
				let comune_residenza = "";
				let j = 0;
				while(j < comuni.length && comuni[j]["id_comune"] != dato.id_comune){
					j++;
				}
				if(j < comuni.length){
					comune_residenza += comuni[j]["nome"] + "<br>";
					let k = 0;
					while(k < province.length && province[k]["id_provincia"] != comuni[j]["id_provincia"]){
						k++;
					}
					if(k < province.length){
						comune_residenza += province[k]["nome"] + " (" + province[k]["sigla"] + ")<br>";
						let l = 0;
						while(l < regioni.length && regioni[l]["id_regione"] != province[k]["id_regione"]){
							l++;
						}
						if(l < regioni.length){
							comune_residenza += regioni[l]["nome"];
						}
					}
				}
				cella5.innerHTML = comune_residenza;
				let cella_numeri_telefono = document.createElement("td");
				let cella_indirizzi_email = document.createElement("td");
				let cella_primo_inserimento = document.createElement("td");
				cella_primo_inserimento.setAttribute("colspan","2");
				if(dati.numeri_telefono[i].length > 0 || dati.indirizzi_email[i].length > 0){
					dati.numeri_telefono[i].forEach(numero => {
						let numero_telefono = document.createElement("span");
						numero_telefono.innerHTML = numero.numero_telefono + " ";
						let link_elimina_numero = document.createElement("a");
						link_elimina_numero.setAttribute("href","javascript:elimina('"+numero.id_numero+"','"+dato.id_contatto+"','telefono')");
						link_elimina_numero.innerHTML = "Elimina ";
						let link_modifica_numero = document.createElement("a");
						link_modifica_numero.setAttribute("href","javascript:modifica('"+numero.id_numero+"','"+dato.id_contatto+"','telefono')");
						link_modifica_numero.innerHTML = "Modifica";
						let spazio_telefono = document.createElement("br");
						cella_numeri_telefono.appendChild(numero_telefono);
						cella_numeri_telefono.appendChild(link_elimina_numero);
						cella_numeri_telefono.appendChild(link_modifica_numero);
						cella_numeri_telefono.appendChild(spazio_telefono);
					});
					let link_aggiungi_numero = document.createElement("a");
					link_aggiungi_numero.setAttribute("href","javascript:aggiungi('"+dato.id_contatto+"','telefono')");
					link_aggiungi_numero.innerHTML = "Aggiungi numero di telefono";
					cella_numeri_telefono.appendChild(link_aggiungi_numero);
					dati.indirizzi_email[i].forEach(email => {
						let indirizzo_email = document.createElement("span");
						indirizzo_email.innerHTML = email.indirizzo_email + " ";
						let link_elimina_email = document.createElement("a");
						link_elimina_email.setAttribute("href","javascript:elimina('"+email.id_indirizzo+"','"+dato.id_contatto+"','email')");
						link_elimina_email.innerHTML = "Elimina ";
						let link_modifica_email = document.createElement("a");
						link_modifica_email.setAttribute("href","javascript:modifica('"+email.id_indirizzo+"','"+dato.id_contatto+"','email')");
						link_modifica_email.innerHTML = "Modifica";
						let spazio_email = document.createElement("br");
						cella_indirizzi_email.appendChild(indirizzo_email);
						cella_indirizzi_email.appendChild(link_elimina_email);
						cella_indirizzi_email.appendChild(link_modifica_email);
						cella_indirizzi_email.appendChild(spazio_email);
					});
					let link_aggiungi_email = document.createElement("a");
					link_aggiungi_email.setAttribute("href","javascript:aggiungi('"+dato.id_contatto+"','email')");
					link_aggiungi_email.innerHTML = "Aggiungi indirizzo e-mail";
					cella_indirizzi_email.appendChild(link_aggiungi_email);
				}else{
					let link_primo_inserimento = document.createElement("a");
					link_primo_inserimento.setAttribute("href","javascript:primo_inserimento('"+dato.id_contatto+"')");
					link_primo_inserimento.innerHTML = "Effettua il primo inserimento";
					cella_primo_inserimento.appendChild(link_primo_inserimento);
				}
				let cella6 = document.createElement("td");
				let link_modifica_contatto = document.createElement("a");
				link_modifica_contatto.setAttribute("href","javascript:modifica_contatto('"+dato.id_contatto+"')");
				link_modifica_contatto.innerHTML = "Modifica contatto";
				let spazio = document.createElement("br");
				let link_elimina_contatto = document.createElement("a");
				link_elimina_contatto.setAttribute("href","javascript:elimina_contatto('"+dato.id_contatto+"')");
				link_elimina_contatto.innerHTML = "Elimina contatto";
				cella6.appendChild(link_modifica_contatto);
				cella6.appendChild(spazio);
				cella6.appendChild(link_elimina_contatto);
				riga.appendChild(cella1);
				riga.appendChild(cella2);
				riga.appendChild(cella3);
				riga.appendChild(cella4);
				riga.appendChild(cella5);
				if(dati.numeri_telefono[i].length > 0 || dati.indirizzi_email[i].length > 0){
					riga.appendChild(cella_numeri_telefono);
					riga.appendChild(cella_indirizzi_email);
				}else{
					riga.appendChild(cella_primo_inserimento);
				}
				riga.appendChild(cella6);
				corpo.appendChild(riga);
				i++;
			});
			tabella.appendChild(corpo);
			stampa_tabella.appendChild(tabella);
		}else{
			let stampa_tabella = document.getElementById("stampa_rubrica");
			let tabella_vecchia = document.getElementsByName("rubrica");
			if(tabella_vecchia.length > 0){
				tabella_vecchia.forEach(elemento => stampa_tabella.removeChild(elemento));
			}
			stampa_tabella.innerHTML = "Nessun contatto memorizzato in rubrica.";
		}
	})
	.catch(errore => console.error(errore));
}

function aggiungi_contatto(){
	fetch(percorso+"genera_token.php")
	.then(risposta => risposta.json())
	.then(dati => {
		let body = document.querySelector("body");
		let container_vecchio = document.getElementsByName("form_inserimento_contatto");
		if(container_vecchio.length > 0){
			container_vecchio.forEach(elemento => body.removeChild(elemento));
		}
		let container = document.createElement("div");
		container.setAttribute("class","modal");
		container.setAttribute("id","form_inserimento_contatto");
		container.setAttribute("name","form_inserimento_contatto");
		container.style.display = "block";
		let sfondo = document.createElement("div");
		sfondo.setAttribute("class","modal-background");
		let contenuto = document.createElement("div");
		contenuto.setAttribute("class","modal-content");
		let form = document.createElement("form");
		form.setAttribute("name","modulo");
		form.setAttribute("method","POST");
		form.setAttribute("class","box");
		let bottone_uscita = document.createElement("button");
		bottone_uscita.setAttribute("id","chiusura_inserimento_contatto");
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
		let token = document.createElement("input");
		token.setAttribute("type","hidden");
		token.setAttribute("name","token");
		token.setAttribute("value",dati.token);
		let etichetta_nome = document.createElement("label");
		etichetta_nome.setAttribute("for","nome");
		etichetta_nome.setAttribute("class","label");
		etichetta_nome.innerHTML = "Inserire il nome:";
		let campo_nome = document.createElement("input");
		campo_nome.setAttribute("type","text");
		campo_nome.setAttribute("name","nome");
		campo_nome.setAttribute("id","nome");
		campo_nome.setAttribute("class","input is-primary is-rounded");
		let spazio1 = document.createElement("br");
		let spazio2 = document.createElement("br");
		let etichetta_cognome = document.createElement("label");
		etichetta_cognome.setAttribute("for","cognome");
		etichetta_cognome.innerHTML = "Inserire il cognome:";
		etichetta_cognome.setAttribute("class","label");
		let campo_cognome = document.createElement("input");
		campo_cognome.setAttribute("type","text");
		campo_cognome.setAttribute("name","cognome");
		campo_cognome.setAttribute("id","cognome");
		campo_cognome.setAttribute("class","input is-primary is-rounded");
		let spazio3 = document.createElement("br");
		let spazio4 = document.createElement("br");
		let etichetta_indirizzo = document.createElement("label");
		etichetta_indirizzo.setAttribute("for","indirizzo");
		etichetta_indirizzo.innerHTML = "Inserire l'indirizzo:";
		etichetta_indirizzo.setAttribute("class","label");
		let campo_indirizzo = document.createElement("input");
		campo_indirizzo.setAttribute("type","text");
		campo_indirizzo.setAttribute("name","indirizzo");
		campo_indirizzo.setAttribute("id","indirizzo");
		campo_indirizzo.setAttribute("class","input is-primary is-rounded");
		let spazio5 = document.createElement("br");
		let spazio6 = document.createElement("br");
		let etichetta_id_comune = document.createElement("label");
		etichetta_id_comune.setAttribute("for","id_comune");
		etichetta_id_comune.innerHTML = "Selezionare il comune di residenza:";
		etichetta_id_comune.setAttribute("class","label");
		let colonne = document.createElement("div");
		colonne.setAttribute("class","columns");
		let colonna1 = document.createElement("div");
		colonna1.setAttribute("class","column");
		let contenitore_regioni = document.createElement("div");
		contenitore_regioni.setAttribute("class","select is-primary is-rounded is-fullwidth");
		let campo_regioni = document.createElement("select");
		campo_regioni.setAttribute("name","id_regione");
		campo_regioni.setAttribute("id","id_regione");
		campo_regioni.setAttribute("onchange","javascript:seleziona_regione('id_comune')");
		let opzione_vuota1 = document.createElement("option");
		opzione_vuota1.setAttribute("value","");
		campo_regioni.appendChild(opzione_vuota1);
		regioni.forEach(regione => {
			let opzione = document.createElement("option");
			opzione.setAttribute("value",regione.id_regione);
			opzione.innerHTML = regione.nome;
			campo_regioni.appendChild(opzione);
		});
		contenitore_regioni.appendChild(campo_regioni);
		colonna1.appendChild(contenitore_regioni);
		colonne.appendChild(colonna1);
		let colonna2 = document.createElement("div");
		colonna2.setAttribute("class","column");
		let contenitore_province = document.createElement("div");
		contenitore_province.setAttribute("class","select is-primary is-rounded is-fullwidth");
		let campo_province = document.createElement("select");
		campo_province.setAttribute("name","id_provincia");
		campo_province.setAttribute("id","id_provincia");
		campo_province.setAttribute("onchange","javascript:seleziona_provincia('id_comune')");
		contenitore_province.appendChild(campo_province);
		colonna2.appendChild(contenitore_province);
		colonne.appendChild(colonna2);
		let colonna3 = document.createElement("div");
		colonna3.setAttribute("class","column");
		let contenitore_comuni = document.createElement("div");
		contenitore_comuni.setAttribute("class","select is-primary is-rounded is-fullwidth");
		let campo_comuni = document.createElement("select");
		campo_comuni.setAttribute("name","id_comune");
		campo_comuni.setAttribute("id","id_comune");
		contenitore_comuni.appendChild(campo_comuni);
		colonna3.appendChild(contenitore_comuni);
		colonne.appendChild(colonna3);
		let bottone = document.createElement("input");
		bottone.setAttribute("type","button");
		bottone.setAttribute("name","invia");
		bottone.setAttribute("value","Inserisci adesso il contatto");
		bottone.setAttribute("onclick","javascript:valida1()");
		bottone.setAttribute("class","button is-rounded is-fullwidth is-success");
		let spazio7 = document.createElement("br");
		let messaggio = document.createElement("span");
		messaggio.setAttribute("id","messaggio_interno");
		form.appendChild(token);
		form.appendChild(etichetta_nome);
		form.appendChild(campo_nome);
		form.appendChild(spazio1);
		form.appendChild(spazio2);
		form.appendChild(etichetta_cognome);
		form.appendChild(campo_cognome);
		form.appendChild(spazio3);
		form.appendChild(spazio4);
		form.appendChild(etichetta_indirizzo);
		form.appendChild(campo_indirizzo);
		form.appendChild(spazio5);
		form.appendChild(spazio6);
		form.appendChild(etichetta_id_comune);
		form.appendChild(colonne);
		form.appendChild(bottone);
		form.appendChild(spazio7);
		form.appendChild(messaggio);
	})
	.catch(errore => console.error(errore));
}

function seleziona_regione(nome_campo_comuni){
	let opzioni_province_vecchie = document.getElementsByClassName("elenco_province");
	let opzioni_comuni_vecchi = document.getElementsByClassName("elenco_comuni");
	let campo_province = document.getElementById("id_provincia");
	let campo_comuni = document.getElementById(nome_campo_comuni);
	if(opzioni_province_vecchie.length > 0){
		for(let i = 0;i < opzioni_province_vecchie.length;i++){
			campo_province.removeChild(opzioni_province_vecchie[i]);
		}
	}
	if(opzioni_comuni_vecchi.length > 0){
		for(let i = 0;i < opzioni_comuni_vecchi.length;i++){
			campo_comuni.removeChild(opzioni_comuni_vecchi[i]);
		}
	}
	let id_regione = parseInt(modulo.id_regione.value);
	if(id_regione > 0){
		modulo.id_regione.disabled = true;
		let opzione_vuota = document.createElement("option");
		opzione_vuota.setAttribute("value","");
		opzione_vuota.setAttribute("class","elenco_province");
		campo_province.appendChild(opzione_vuota);
		for(let i = 0;i < province.length;i++){
			if(parseInt(province[i].id_regione) == id_regione){
				let opzione = document.createElement("option");
				opzione.setAttribute("value",province[i].id_provincia);
				opzione.setAttribute("class","elenco_province");
				opzione.innerHTML = province[i].nome;
				campo_province.appendChild(opzione);
			}
		}
	}
}

function seleziona_provincia(nome_campo_comuni){
	let opzioni_comuni_vecchi = document.getElementsByClassName("elenco_comuni");
	let campo_comuni = document.getElementById(nome_campo_comuni);
	if(opzioni_comuni_vecchi.length > 0){
		for(let i = 0;i < opzioni_comuni_vecchi.length;i++){
			campo_comuni.removeChild(opzioni_comuni_vecchi[i]);
		}
	}
	let id_provincia = parseInt(modulo.id_provincia.value);
	if(id_provincia > 0){
		modulo.id_provincia.disabled = true;
		let opzione_vuota = document.createElement("option");
		opzione_vuota.setAttribute("value","");
		opzione_vuota.setAttribute("class","elenco_comuni");
		campo_comuni.appendChild(opzione_vuota);
		for(let i = 0;i < comuni.length;i++){
			if(parseInt(comuni[i].id_provincia) == id_provincia){
				let opzione = document.createElement("option");
				opzione.setAttribute("value",comuni[i].id_comune);
				opzione.setAttribute("class","elenco_comuni");
				opzione.innerHTML = comuni[i].nome;
				campo_comuni.appendChild(opzione);
			}
		}
	}
}

function valida1(){
	let nome = modulo.nome.value;
	let cognome = modulo.cognome.value;
	let indirizzo = modulo.indirizzo.value;
	let id_comune = modulo.id_comune.value;
	let token = modulo.token.value;
	let controllo = 0;
	let messaggio = "";
	if(nome == ""){
		controllo = 1;
		messaggio += "Inserire il nome del nuovo contatto.<br>";
	}
	if(cognome == ""){
		controllo = 1;
		messaggio += "Inserire il cognome del nuovo contatto.<br>";
	}
	if(indirizzo == ""){
		controllo = 1;
		messaggio += "Inserire l'indirizzo del nuovo contatto.<br>";
	}
	if(id_comune == ""){
		controllo = 1;
		messaggio += "Selezionare il comune di residenza del nuovo contatto.<br>";
	}
	stampa("messaggio_interno",messaggio);
	if(controllo == 0){
		let dati_inviati = new FormData();
		dati_inviati.append("nome",nome);
		dati_inviati.append("cognome",cognome);
		dati_inviati.append("indirizzo",indirizzo);
		dati_inviati.append("id_comune",id_comune);
		dati_inviati.append("token",token);
		fetch(percorso+"aggiungi_contatto.php",{
			'method':'POST',
			'header':{'Content-type':'application/json'},
			'body':dati_inviati
		})
		.then(risposta => risposta.json())
		.then(dati => {
			if(dati.controllo == 0){
				const body = document.querySelector("body");
				const container_vecchio = document.getElementsByName("form_inserimento_contatto");
				if(container_vecchio.length > 0){
					container_vecchio.forEach(container => {
						container.style.display = "none";
						body.removeChild(container);
					});
				}
				stampa("messaggio",dati.messaggio);
				stampa_rubrica();
			}else{
				stampa("messaggio_interno",dati.messaggio);
			}
		})
		.catch(errore => console.error(errore));
	}
}

function elimina_contatto(id_contatto){
	fetch(percorso+"genera_token.php")
	.then(risposta => risposta.json())
	.then(dati => {
		let body = document.querySelector("body");
		let modulo_vecchio = document.getElementsByName("modulo_token");
		if(modulo_vecchio.length > 0){
			modulo_vecchio.forEach(elemento => body.removeChild(elemento));
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
	.finally(() => esegui_eliminazione_contatto(id_contatto))
	.catch(errore => console.error(errore));
}

function esegui_eliminazione_contatto(id_contatto){
	let token = modulo_token.token.value;
	let dati_inviati = new FormData();
	dati_inviati.append("id_contatto",id_contatto);
	dati_inviati.append("token",token);
	fetch(percorso+"elimina_contatto.php",{
		'method':'POST',
		'header':{'Content-type':'application/json'},
		'body':dati_inviati
	})
	.then(risposta => risposta.json())
	.then(dati => {
		if(dati.controllo == 0){
			stampa_rubrica();
		}
		stampa("messaggio",dati.messaggio);
	})
	.catch(errore => console.error(errore));
}

function modifica_contatto(id_contatto){
	fetch(percorso+"genera_token.php")
	.then(risposta => risposta.json())
	.then(dati => {
		let body = document.querySelector("body");
		let container_vecchio = document.getElementsByName("form_modifica_contatto");
		if(container_vecchio.length > 0){
			container_vecchio.forEach(elemento => body.removeChild(elemento));
		}
		let container = document.createElement("div");
		container.setAttribute("class","modal");
		container.setAttribute("id","form_modifica_contatto");
		container.setAttribute("name","form_modifica_contatto");
		container.style.display = "block";
		let sfondo = document.createElement("div");
		sfondo.setAttribute("class","modal-background");
		let contenuto = document.createElement("div");
		contenuto.setAttribute("class","modal-content");
		let form = document.createElement("form");
		form.setAttribute("name","modulo");
		form.setAttribute("method","POST");
		form.setAttribute("class","box");
		let bottone_uscita = document.createElement("button");
		bottone_uscita.setAttribute("id","chiusura_modifica_contatto");
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
		let token = document.createElement("input");
		token.setAttribute("type","hidden");
		token.setAttribute("name","token");
		token.setAttribute("value",dati.token);
		let etichetta_dato = document.createElement("label");
		etichetta_dato.setAttribute("for","dato");
		etichetta_dato.setAttribute("class","label");
		etichetta_dato.innerHTML = "Seleziona il dato da modificare:";
		let contenitore_dato = document.createElement("div");
		contenitore_dato.setAttribute("class","select is-primary is-rounded is-fullwidth");
		let dato = document.createElement("select");
		dato.setAttribute("name","dato");
		dato.setAttribute("id","dato");
		dato.setAttribute("onchange","javascript:inserisci_valore()");
		let opzione1 = document.createElement("option");
		opzione1.setAttribute("value","");
		let opzione2 = document.createElement("option");
		opzione2.setAttribute("value","nome");
		opzione2.innerHTML = "Nome del contatto";
		let opzione3 = document.createElement("option");
		opzione3.setAttribute("value","cognome");
		opzione3.innerHTML = "Cognome del contatto";
		let opzione4 = document.createElement("option");
		opzione4.setAttribute("value","indirizzo");
		opzione4.innerHTML = "Indirizzo del contatto";
		let opzione5 = document.createElement("option");
		opzione5.setAttribute("value","id_comune");
		opzione5.innerHTML = "Comune di residenza del contatto";
		dato.appendChild(opzione1);
		dato.appendChild(opzione2);
		dato.appendChild(opzione3);
		dato.appendChild(opzione4);
		dato.appendChild(opzione5);
		contenitore_dato.appendChild(dato);
		let spazio1 = document.createElement("br");
		let valore = document.createElement("span");
		valore.setAttribute("id","contenitore_valore");
		let spazio2 = document.createElement("br");
		let bottone = document.createElement("input");
		bottone.setAttribute("type","button");
		bottone.setAttribute("name","invia");
		bottone.setAttribute("value","Modifica adesso il contatto");
		bottone.setAttribute("onclick","javascript:valida2('"+id_contatto+"')");
		bottone.setAttribute("class","button is-rounded is-fullwidth is-success");
		let spazio3 = document.createElement("br");
		let messaggio = document.createElement("span");
		messaggio.setAttribute("id","messaggio_interno");
		form.appendChild(token);
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

function inserisci_valore(){
	let dato = modulo.dato.value;
	let contenitore_valore = document.getElementById("contenitore_valore");
	if(dato == "id_comune"){
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
		let colonne_vecchio = document.getElementsByName("colonne");
		let etichetta_vecchia = document.getElementsByName("etichetta_valore");
		let valore_vecchio = document.getElementsByName("valore");
		let spazio1_vecchio = document.getElementsByName("spazio1");
		let spazio2_vecchio = document.getElementsByName("spazio2");
		if(colonne_vecchio.length > 0){
			colonne_vecchio.forEach(colonne => contenitore_valore.removeChild(colonne));
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
		case "cognome":
			let etichetta2 = document.createElement("label");
			etichetta2.setAttribute("name","etichetta_valore");
			etichetta2.setAttribute("for","valore");
			etichetta2.setAttribute("class","label");
			etichetta2.innerHTML = "Scrivi il nuovo cognome:";
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
		case "indirizzo":
			let etichetta3 = document.createElement("label");
			etichetta3.setAttribute("name","etichetta_valore");
			etichetta3.setAttribute("for","valore");
			etichetta3.setAttribute("class","label");
			etichetta3.innerHTML = "Scrivi il nuovo indirizzo:";
			let valore3 = document.createElement("input");
			valore3.setAttribute("type","text");
			valore3.setAttribute("name","valore");
			valore3.setAttribute("id","valore");
			valore3.setAttribute("class","input is-primary is-rounded");
			contenitore_valore.appendChild(spazio1);
			contenitore_valore.appendChild(etichetta3);
			contenitore_valore.appendChild(valore3);
			contenitore_valore.appendChild(spazio2);
			break;
		case "id_comune":
			let etichetta4 = document.createElement("label");
			etichetta4.setAttribute("name","etichetta_valore");
			etichetta4.setAttribute("for","valore");
			etichetta4.setAttribute("class","label");
			etichetta4.innerHTML = "Selezionare il nuovo comune di residenza:";
			let colonne = document.createElement("div");
			colonne.setAttribute("class","columns");
			colonne.setAttribute("name","colonne");
			let colonna1 = document.createElement("div");
			colonna1.setAttribute("class","column");
			let contenitore_regioni = document.createElement("div");
			contenitore_regioni.setAttribute("class","select is-primary is-rounded is-fullwidth");
			let campo_regioni = document.createElement("select");
			campo_regioni.setAttribute("name","id_regione");
			campo_regioni.setAttribute("id","id_regione");
			campo_regioni.setAttribute("onchange","javascript:seleziona_regione('valore')");
			let opzione_vuota1 = document.createElement("option");
			opzione_vuota1.setAttribute("value","");
			campo_regioni.appendChild(opzione_vuota1);
			regioni.forEach(regione => {
				let opzione = document.createElement("option");
				opzione.setAttribute("value",regione.id_regione);
				opzione.innerHTML = regione.nome;
				campo_regioni.appendChild(opzione);
			});
			contenitore_regioni.appendChild(campo_regioni);
			colonna1.appendChild(contenitore_regioni);
			colonne.appendChild(colonna1);
			let colonna2 = document.createElement("div");
			colonna2.setAttribute("class","column");
			let contenitore_province = document.createElement("div");
			contenitore_province.setAttribute("class","select is-primary is-rounded is-fullwidth");
			let campo_province = document.createElement("select");
			campo_province.setAttribute("name","id_provincia");
			campo_province.setAttribute("id","id_provincia");
			campo_province.setAttribute("onchange","javascript:seleziona_provincia('valore')");
			contenitore_province.appendChild(campo_province);
			colonna2.appendChild(contenitore_province);
			colonne.appendChild(colonna2);
			let colonna3 = document.createElement("div");
			colonna3.setAttribute("class","column");
			let contenitore_comuni = document.createElement("div");
			contenitore_comuni.setAttribute("class","select is-primary is-rounded is-fullwidth");
			let campo_comuni = document.createElement("select");
			campo_comuni.setAttribute("name","valore");
			campo_comuni.setAttribute("id","valore");
			contenitore_comuni.appendChild(campo_comuni);
			colonna3.appendChild(contenitore_comuni);
			colonne.appendChild(colonna3);
			contenitore_valore.appendChild(spazio1);
			contenitore_valore.appendChild(etichetta4);
			contenitore_valore.appendChild(colonne);
			break;
		default:
			break;
	}
}

function valida2(id_contatto){
	let dato = modulo.dato.value;
	if(dato == ""){
		stampa("messaggio_interno","Selezionare il dato da modificare.");
	}else{
		stampa("messaggio_interno","");
		let valore = modulo.valore.value;
		let token = modulo.token.value;
		let controllo = 0;
		if(valore == ""){
			controllo = 1;
			stampa("messaggio_interno","Scrivere il nuovo valore del dato selezionato.");
		}
		if(controllo == 0){
			let dati_inviati = new FormData();
			dati_inviati.append("dato",dato);
			dati_inviati.append("valore",valore);
			dati_inviati.append("id_contatto",id_contatto);
			dati_inviati.append("token",token);
			fetch(percorso+"modifica_contatto.php",{
				'method':'POST',
				'header':{'Content-type':'application/json'},
				'body':dati_inviati
			})
			.then(risposta => risposta.json())
			.then(dati => {
				if(dati.controllo == 0){
					let body = document.querySelector("body");
					let container_vecchio = document.getElementsByName("form_modifica_contatto");
					if(container_vecchio.length > 0){
						container_vecchio.forEach(container => {
							container.style.display = "none";
							body.removeChild(container)
						});
					}
					stampa("messaggio",dati.messaggio);
					stampa_rubrica();
				}else{
					stampa("messaggio_interno",dati.messaggio);
				}
			})
			.catch(errore => console.error(errore));
		}
	}
}

function primo_inserimento(id_contatto){
	fetch(percorso+"genera_token.php")
	.then(risposta => risposta.json())
	.then(dati => {
		let body = document.querySelector("body");
		let container_vecchio = document.getElementsByName("form_primo_inserimento");
		if(container_vecchio.length > 0){
			container_vecchio.forEach(elemento => body.removeChild(elemento));
		}
		let container = document.createElement("div");
		container.setAttribute("class","modal");
		container.setAttribute("id","form_primo_inserimento");
		container.setAttribute("name","form_primo_inserimento");
		container.style.display = "block";
		let sfondo = document.createElement("div");
		sfondo.setAttribute("class","modal-background");
		let contenuto = document.createElement("div");
		contenuto.setAttribute("class","modal-content");
		let form = document.createElement("form");
		form.setAttribute("name","modulo");
		form.setAttribute("method","POST");
		form.setAttribute("class","box");
		let bottone_uscita = document.createElement("button");
		bottone_uscita.setAttribute("id","chiusura_primo_inserimento");
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
		let token = document.createElement("input");
		token.setAttribute("type","hidden");
		token.setAttribute("name","token");
		token.setAttribute("value",dati.token);
		let etichetta_telefono = document.createElement("label");
		etichetta_telefono.setAttribute("for","telefono");
		etichetta_telefono.setAttribute("class","label");
		etichetta_telefono.innerHTML = "Inserire il numero di telefono:";
		let campo_telefono = document.createElement("input");
		campo_telefono.setAttribute("type","text");
		campo_telefono.setAttribute("name","telefono");
		campo_telefono.setAttribute("id","telefono");
		campo_telefono.setAttribute("class","input is-primary is-rounded");
		let spazio1 = document.createElement("br");
		let spazio2 = document.createElement("br");
		let etichetta_email = document.createElement("label");
		etichetta_email.setAttribute("for","email");
		etichetta_email.setAttribute("class","label");
		etichetta_email.innerHTML = "Inserire l'indirizzo e-mail:";
		let campo_email = document.createElement("input");
		campo_email.setAttribute("type","text");
		campo_email.setAttribute("name","email");
		campo_email.setAttribute("id","email");
		campo_email.setAttribute("class","input is-primary is-rounded");
		let spazio3 = document.createElement("br");
		let spazio4 = document.createElement("br");
		let bottone = document.createElement("input");
		bottone.setAttribute("type","button");
		bottone.setAttribute("name","invia");
		bottone.setAttribute("value","Effettua adesso l'inserimento");
		bottone.setAttribute("onclick","javascript:valida3('"+id_contatto+"')");
		bottone.setAttribute("class","button is-rounded is-fullwidth is-success");
		let spazio5 = document.createElement("br");
		let messaggio = document.createElement("span");
		messaggio.setAttribute("id","messaggio_interno");
		form.appendChild(token);
		form.appendChild(etichetta_telefono);
		form.appendChild(campo_telefono);
		form.appendChild(spazio1);
		form.appendChild(spazio2);
		form.appendChild(etichetta_email);
		form.appendChild(campo_email);
		form.appendChild(spazio3);
		form.appendChild(spazio4)
		form.appendChild(bottone);
		form.appendChild(spazio5);
		form.appendChild(messaggio);
	})
	.catch(errore => console.error(errore));
}

function valida3(id_contatto){
	let telefono = modulo.telefono.value;
	let email = modulo.email.value;
	let token = modulo.token.value;
	let controllo = 0;
	if(telefono == "" && email == ""){
		controllo = 1;
		stampa("messaggio_interno","Compilare almeno uno dei due campi a disposizione.");
	}
	if(controllo == 0){
		let dati_inviati = new FormData();
		dati_inviati.append("telefono",telefono);
		dati_inviati.append("email",email);
		dati_inviati.append("id_contatto",id_contatto);
		dati_inviati.append("token",token);
		fetch(percorso+"primo_inserimento.php",{
			'method':'POST',
			'header':{'Content-type':'application/json'},
			'body':dati_inviati
		})
		.then(risposta => risposta.json())
		.then(dati => {
			if(dati.controllo == 0){
				let body = document.querySelector("body");
				let container_vecchio = document.getElementsByName("form_primo_inserimento");
				if(container_vecchio.length > 0){
					container_vecchio.forEach(container => {
						container.style.display = "none";
						body.removeChild(container)
					});
				}
				stampa("messaggio",dati.messaggio);
				stampa_rubrica();
			}else{
				stampa("messaggio_interno",dati.messaggio);
			}
		})
		.catch(errore => console.error(errore));
	}
}

function elimina(id_specifico,id_contatto,tipo){
	fetch(percorso+"genera_token.php")
	.then(risposta => risposta.json())
	.then(dati => {
		let body = document.querySelector("body");
		let modulo_vecchio = document.getElementsByName("modulo_token");
		if(modulo_vecchio.length > 0){
			modulo_vecchio.forEach(elemento => body.removeChild(elemento));
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
	.finally(() => esegui_eliminazione(id_specifico,id_contatto,tipo))
	.catch(errore => console.error(errore));
}

function esegui_eliminazione(id_specifico,id_contatto,tipo){
	let token = modulo_token.token.value;
	let dati_inviati = new FormData();
	(tipo == "telefono") ? dati_inviati.append("id_numero",id_specifico) : dati_inviati.append("id_indirizzo",id_specifico);
	dati_inviati.append("id_contatto",id_contatto);
	dati_inviati.append("token",token);
	let pagina = (tipo == "telefono") ? "elimina_numero.php" : "elimina_email.php";
	fetch(percorso+pagina,{
		'method':'POST',
		'header':{'Content-type':'application/json'},
		'body':dati_inviati
	})
	.then(risposta => risposta.json())
	.then(dati => {
		if(dati.controllo == 0){
			stampa_rubrica();
		}
		stampa("messaggio",dati.messaggio);
	})
	.catch(errore => console.error(errore));
}

function modifica(id_specifico,id_contatto,tipo){
	fetch(percorso+"genera_token.php")
	.then(risposta => risposta.json())
	.then(dati => {
		let body = document.querySelector("body");
		let modulo_vecchio = document.getElementsByName("modulo_token");
		if(modulo_vecchio.length > 0){
			modulo_vecchio.forEach(elemento => body.removeChild(elemento));
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
	.finally(() => esegui_modifica(id_specifico,id_contatto,tipo))
	.catch(errore => console.error(errore));
}

function esegui_modifica(id_specifico,id_contatto,tipo){
	let token = modulo_token.token.value;
	let messaggio = (tipo == "telefono") ? "Inserire il nuovo numero di telefono:" : "Inserire il nuovo indirizzo e-mail:";
	let valore = window.prompt(messaggio);
	let controllo = 0;
	if(valore == "" || valore == null){
		controllo = 1;
		let errore = (tipo == "telefono") ? "Nessun numero di telefono inserito." : "Nessun indirizzo e-mail inserito.";
		stampa("messaggio",errore);
	}
	if(controllo == 0){
		let dati_inviati = new FormData();
		(tipo == "telefono") ? dati_inviati.append("telefono",valore) : dati_inviati.append("email",valore);
		(tipo == "telefono") ? dati_inviati.append("id_numero",id_specifico) : dati_inviati.append("id_indirizzo",id_specifico);
		dati_inviati.append("id_contatto",id_contatto);
		dati_inviati.append("token",token);
		let pagina = (tipo == "telefono") ? "modifica_numero.php" : "modifica_email.php";
		fetch(percorso+pagina,{
			'method':'POST',
			'header':{'Content-type':'application/json'},
			'body':dati_inviati
		})
		.then(risposta => risposta.json())
		.then(dati => {
			if(dati.controllo == 0){
				stampa_rubrica();
			}
			stampa("messaggio",dati.messaggio);
		})
		.catch(errore => console.error(errore));
	}
}

function aggiungi(id_contatto,tipo){
	fetch(percorso+"genera_token.php")
	.then(risposta => risposta.json())
	.then(dati => {
		let body = document.querySelector("body");
		let modulo_vecchio = document.getElementsByName("modulo_token");
		if(modulo_vecchio.length > 0){
			modulo_vecchio.forEach(elemento => body.removeChild(elemento));
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
	.finally(() => esegui_giunzione(id_contatto,tipo))
	.catch(errore => console.error(errore));
}

function esegui_giunzione(id_contatto,tipo){
	let token = modulo_token.token.value;
	let messaggio = (tipo == "telefono") ? "Inserire il nuovo numero di telefono:" : "Inserire il nuovo indirizzo e-mail:";
	let valore = window.prompt(messaggio);
	let controllo = 0;
	if(valore == "" || valore == null){
		controllo = 1;
		let errore = (tipo == "telefono") ? "Nessun numero di telefono inserito." : "Nessun indirizzo e-mail inserito.";
		stampa("messaggio",errore);
	}
	if(controllo == 0){
		let dati_inviati = new FormData();
		(tipo == "telefono") ? dati_inviati.append("telefono",valore) : dati_inviati.append("email",valore);
		dati_inviati.append("id_contatto",id_contatto);
		dati_inviati.append("token",token);
		let pagina = (tipo == "telefono") ? "aggiungi_numero.php" : "aggiungi_email.php";
		fetch(percorso+pagina,{
			'method':'POST',
			'header':{'Content-type':'application/json'},
			'body':dati_inviati
		})
		.then(risposta => risposta.json())
		.then(dati => {
			if(dati.controllo == 0){
				stampa_rubrica();
			}
			stampa("messaggio",dati.messaggio);
		})
		.catch(errore => console.error(errore));
	}
}