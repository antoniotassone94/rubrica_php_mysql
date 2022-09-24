<?php
session_start();
if($_SERVER['REQUEST_METHOD'] == "POST"){
	if(isset($_POST['token']) && isset($_POST['dato']) && isset($_POST['valore']) && isset($_POST['id_contatto'])){
		require("funzioni.php");
		$token = sanitizza($_POST['token'],false);
		$dato = sanitizza($_POST['dato']);
		$valore = sanitizza($_POST['valore']);
		$id_contatto = intval(sanitizza($_POST['id_contatto']));
		$controllo = 0;
		$messaggio = "";

		//controllo effettuato solo sul server
		if($token != $_SESSION['token']){
			$controllo = 1;
			$messaggio .= "Utente non autorizzato a procedere nell'operazione.<br>";
		}

		if($dato == ""){
			$controllo = 1;
			$messaggio .= "Selezionare il dato da modificare.<br>";
		}
		if($valore == ""){
			$controllo = 1;
			$messaggio .= "Scrivere il nuovo valore del dato selezionato.<br>";
		}

		//controllo effettuato solo sul server
		if($id_contatto == 0){
			$controllo = 1;
			$messaggio .= "Il contatto selezionato non &egrave; valido.<br>";
		}else{

			//controllo effettuato solo sul server
			$dettaglio_contatto = estrai("contatti",["id_contatto"],[$id_contatto]);
			if($dato == "nome"){
				$numero_utenti = estrai("contatti",["nome","cognome","indirizzo"],[$valore,$dettaglio_contatto[0]['cognome'],$dettaglio_contatto[0]['indirizzo']]);
				if(count($numero_utenti) > 0){
					$controllo = 1;
					$messaggio .= "Dopo la modifica il contatto risulter&agrave; uguale ad uno gi&agrave; presente in rubrica.<br>";
				}
			}

			//controllo effettuato solo sul server
			if($dato == "cognome"){
				$numero_utenti = estrai("contatti",["nome","cognome","indirizzo"],[$dettaglio_contatto[0]['nome'],$valore,$dettaglio_contatto[0]['indirizzo']]);
				if(count($numero_utenti) > 0){
					$controllo = 1;
					$messaggio .= "Dopo la modifica il contatto risulter&agrave; uguale ad uno gi&agrave; presente in rubrica.<br>";
				}
			}

			//controllo effettuato solo sul server
			if($dato == "indirizzo"){
				$numero_utenti = estrai("contatti",["nome","cognome","indirizzo"],[$dettaglio_contatto[0]['nome'],$dettaglio_contatto[0]['cognome'],$valore]);
				if(count($numero_utenti) > 0){
					$controllo = 1;
					$messaggio .= "Dopo la modifica il contatto risulter&agrave; uguale ad uno gi&agrave; presente in rubrica.<br>";
				}
			}

			//controllo effettuato solo sul server
			$modifica_non_necessaria = estrai("contatti",["id_contatto",$dato],[$id_contatto,$valore]);
			if(count($modifica_non_necessaria) > 0){
				$controllo = 1;
				$messaggio .= "Impossibile modificare ";
				if($dato == "nome" || $dato == "cognome"){
					$messaggio .= "il ";
				}else{
					$messaggio .= "l'";
				}
				$messaggio .= $dato . ", dopo la modifica il suo valore non cambierebbe.<br>";
			}
		}

		if($controllo == 0){
			$risultato = modifica("contatti",$dato,$valore,"id_contatto",$id_contatto,"Contatto modificato correttamente.<br>");
			if($risultato != null){
				$messaggio .= $risultato;
			}else{
				$controllo = 1;
				$messaggio .= "Errore di esecuzione della query.<br>";
			}
			unset($_SESSION['token']);
		}
		echo json_encode(["messaggio" => $messaggio,"controllo" => $controllo]);
	}else{
		echo json_encode(["messaggio" => "Errore interno del server.","controllo" => 1]);
	}
}else{
	echo "Pagina non disponibile.";
}
?>